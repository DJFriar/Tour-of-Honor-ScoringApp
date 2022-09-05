import apiClient from "./client";

const endpoint = '/scoring';

const getPendingSubmissionDetails = (id) => apiClient.get(endpoint + '/data/' + id);
const getPendingSubmissionList = () => apiClient.get(endpoint);
const getSubmissionStatus = (id) => apiClient.get(endpoint + '/status/' + id);

export default {
  getPendingSubmissionDetails,
  getPendingSubmissionList,
  getSubmissionStatus,
};