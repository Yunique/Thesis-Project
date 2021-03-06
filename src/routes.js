// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signUpPath: () => [host, prefix, 'signup'].join('/'),
  usersPath: () => [host, prefix, 'data'].join('/'),
  metrics: () => [host, prefix, 'metrics'].join('/'),

};
