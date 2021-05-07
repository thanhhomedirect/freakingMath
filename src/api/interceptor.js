import axios from 'axios';
import _ from 'lodash';

let gateway = 'https://owlbot.info/';
const setGateway = newGateway => (gateway = newGateway);

const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-client-locale': 'vi',
};

function callApi(
  _method,
  {endpoint: url, body, headers: _headers, params, options},
) {
  const endpoint = gateway + url;
  const method = (_method || '').toUpperCase();
  const headers = {
    Authorization: 'Token 95441ddb70aa7f0dd8ab4add5ede1837ef5f8959',
    ...HEADERS,
    ...(_headers || {}),
  };
  const optionsAxios = {
    url: endpoint,
    method,
    data: body,
    params,
    headers,
    ...(options || {}),
  };
  return axios(optionsAxios)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      }
      return Promise.reject(response.data);
    })
    .catch(err => {
      console.log('err 1', JSON.stringify(err));
      console.log('err 2', JSON.stringify(_.get(err, 'response.data')));

      return Promise.reject(err);
    });
}

const postMethod = (endpoint, body, headers, options) =>
  callApi('POST', {endpoint, body, headers, options});

const putMethod = (endpoint, body, headers, options) =>
  callApi('PUT', {endpoint, body, headers, options});

const deleteMethod = (endpoint, body, headers, options) =>
  callApi('DELETE', {endpoint, body, headers, options});

const patchMethod = (endpoint, body, headers, options) =>
  callApi('PATCH', {endpoint, body, headers, options});

const getMethod = (endpoint, params, headers, options) =>
  callApi('GET', {
    endpoint,
    headers,
    params,
    options,
  });

export default {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
  patch: patchMethod,
  gateway,
  setGateway,
};
