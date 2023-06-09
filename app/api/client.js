import { create } from 'apisauce';

import settings from '../config/settings';

const apiClient = create({
  baseURL: settings.apiUrl,
  headers: {
    Authorization: 'randomTOKENgoesHERE',
  },
});

export default apiClient;
