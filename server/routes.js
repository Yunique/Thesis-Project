// @ts-check

import _ from 'lodash';
import HttpErrors from 'http-errors';
import { spawn } from 'child_process';

const { Unauthorized, Conflict } = HttpErrors;

const getNextId = () => Number(_.uniqueId());

const buildState = (defaultState) => {
  const generalChannelId = getNextId();
  const randomChannelId = getNextId();
  const state = {
    channels: [
      { id: generalChannelId, name: 'general', removable: false },
      { id: randomChannelId, name: 'random', removable: false },
    ],
    messages: [],
    currentChannelId: generalChannelId,
    users: [
      { id: 1, username: 'admin', password: 'admin' },
      { id: 2, username: 'user', password: 'user' },
    ],
  };

  if (defaultState.messages) {
    state.messages.push(...defaultState.messages);
  }
  if (defaultState.channels) {
    state.channels.push(...defaultState.channels);
  }
  if (defaultState.currentChannelId) {
    state.currentChannelId = defaultState.currentChannelId;
  }
  if (defaultState.users) {
    state.users.push(...defaultState.users);
  }

  return state;
};

export default (app, defaultState = {}) => {
  const state = buildState(defaultState);

  app.io.on('connect', (socket) => {
    console.log({ 'socket.id': socket.id });

    socket.on('newMessage', (message, acknowledge = _.noop) => {
      const messageWithId = {
        ...message,
        id: getNextId(),
      };
      state.messages.push(messageWithId);
      acknowledge({ status: 'ok' });
      app.io.emit('newMessage', messageWithId);
    });

    socket.on('newChannel', (channel, acknowledge = _.noop) => {
      const channelWithId = {
        ...channel,
        removable: true,
        id: getNextId(),
      };

      state.channels.push(channelWithId);
      acknowledge({ status: 'ok', data: channelWithId });
      app.io.emit('newChannel', channelWithId);
    });

    socket.on('removeChannel', ({ id }, acknowledge = _.noop) => {
      const channelId = Number(id);
      state.channels = state.channels.filter((c) => c.id !== channelId);
      state.messages = state.messages.filter((m) => m.channelId !== channelId);
      const data = { id: channelId };

      acknowledge({ status: 'ok' });
      app.io.emit('removeChannel', data);
    });

    socket.on('renameChannel', ({ id, name }, acknowledge = _.noop) => {
      const channelId = Number(id);
      const channel = state.channels.find((c) => c.id === channelId);
      if (!channel) return;
      channel.name = name;

      acknowledge({ status: 'ok' });
      app.io.emit('renameChannel', channel);
    });
  });

  app.post('/api/v1/login', async (req, reply) => {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = state.users.find((u) => u.username === username);

    if (!user || user.password !== password) {
      reply.send(new Unauthorized());
      return;
    }

    const token = app.jwt.sign({ userId: user.id });
    reply.send({ token, username });
  });

  app.post('/api/v1/signup', async (req, reply) => {
    const username = _.get(req, 'body.username');
    const password = _.get(req, 'body.password');
    const user = state.users.find((u) => u.username === username);

    if (user) {
      reply.send(new Conflict());
      return;
    }

    const newUser = { id: getNextId(), username, password };
    const token = app.jwt.sign({ userId: newUser.id });
    state.users.push(newUser);
    reply
      .code(201)
      .header('Content-Type', 'application/json; charset=utf-8')
      .send({ token, username });
  });

  app.get('/api/v1/metrics', { preValidation: [app.authenticate] }, (req, reply) => {
    const info = {
      metrics: [],
    };
    const users = state.users.map((user) => user.username);
    const process = spawn('python3', ['server/ai.py', JSON.stringify(state.messages), req.query['keywords[]'], users]);
    // 1 arg - employee name
    // 2 arg - options
    process.stdout.on('data', (data) => {
      console.log('Pipe data from python script ...');
      info.metrics = data.toString();
    });

    process.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      console.log(info.metrics.length);
      reply
        .send(info.metrics); // { info: info.metrics }
    });
  });

  app.get('/api/v1/data', { preValidation: [app.authenticate] }, (req, reply) => {
    const user = state.users.find(({ id }) => id === req.user.userId);

    if (!user) {
      reply.send(new Unauthorized());
      return;
    }

    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(_.omit(state, 'users'));
  });

  app
    .get('*', (_req, reply) => {
      reply.view('index.pug');
    });
};
