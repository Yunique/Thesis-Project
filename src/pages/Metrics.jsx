import React, { useEffect, useState } from 'react';
import { useRollbar } from '@rollbar/react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../hooks';
import routes from '../routes.js';
import toast from '../toast';

const Metrics = () => {
  const auth = useAuth();

  const headers = auth.getAuthHeader();
  // // Testing requests
  // const params = {
  //   employeeId: 1,
  // };
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const [usersMetrics, setUsersMetrics] = useState('Nothing here');

  useEffect(() => {
    // eslint-disable-next-line functional/no-let
    const fetchData = async () => {
      const { data } = await axios.get(routes.metrics(), { headers });
      if (data) {
        setUsersMetrics(data);
      }
    };

    fetchData()
      .catch((err) => {
        rollbar.error(err);
        toast(t('toasts.connectionError'), 'error');
      });
  }, [auth, headers, t]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {usersMetrics}
      </div>
    </div>
  );
};

export default Metrics;
