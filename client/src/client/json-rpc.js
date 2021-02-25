import axios from 'axios';

export function executeRequest(method, params) {
  return axios.post('/rpc', {
    id: 1,
    jsonrpc: '2.0',
    method,
    params,
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ data }) => {
    if (data.error) {
      throw data.error;
    }
    return data.result;
  });
}

export function setAxiosHeaders(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
