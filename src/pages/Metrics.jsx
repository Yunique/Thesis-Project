import React, { useRef, useState } from 'react';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../hooks';
import routes from '../routes.js';
import toast from '../toast';

// eslint-disable-next-line functional/no-let
let lol = 0;

const Metrics = () => {
  const auth = useAuth();

  const headers = auth.getAuthHeader();
  // // Testing requests
  // const params = {
  //   employeeId: 1,
  // };
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const id = '123';
  const input = useRef(null);
  const [usersMetrics, setUsersMetrics] = useState('Nothing here');

  const filterMessages = (e) => {
    e.preventDefault();
    const words = input.current.value.split(',');
    const keywords = words.map((word) => word.trim());

    const config = {
      method: 'get',
      url: routes.metrics(),
      headers,
      params: { keywords },
    };
    const fetchData = async () => {
      const { data } = await axios(config);
      if (data) {
        console.log(data);
        setUsersMetrics(data);
        console.log(data.split(','));
      }
    };

    fetchData()
      .catch((err) => {
        rollbar.error(err);
        toast(t('toasts.connectionError'), 'error');
      });
  };

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <form onSubmit={filterMessages}>
        <label htmlFor={id}>
          Введите ключевые слова:
          <br />
          <input id={id} ref={input} />
          <button type="submit">Поиск</button>
        </label>
      </form>
      <div className="row h-100 bg-white flex-md-row">
        <ul>
          {usersMetrics.split('\n').map((elem) => {
            lol += 1;
            return <li key={lol}>{elem}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Metrics;
