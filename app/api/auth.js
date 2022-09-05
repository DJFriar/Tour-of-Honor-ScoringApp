import client from './client';

const login = (flag, zipcode) => client.post('/auth', { flag, zipcode });

export default {
  login,
}