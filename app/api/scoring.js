import apiClient from "./client";

const endpoint = '/scoring';

const getPendingSubmissionDetails = (id) => apiClient.get(endpoint + '/data/' + id);
const getPendingSubmissionList = () => apiClient.get(endpoint);
const getSubmissionStatus = (id) => apiClient.get(endpoint + '/status/' + id);

const postScoringResponse = async (submission) => {

  const dataToPost = {
    FlagNumber: submission.FlagNumber,
    id: submission.SubmissionID,
    MemorialID: submission.MemorialID,
    OtherRiders: submission.OtherRiders,
    ScorerNotes: submission.ScorerNotes,
    Status: submission.Status,
    UserID: submission.UserID,
  }

  const data= new FormData();

  data.append('FlagNumber', submission.FlagNumber);
  data.append('id', submission.SubmissionID);
  data.append('MemorialID', submission.MemorialID);
  data.append('OtherRiders', submission.OtherRiders);
  data.append('ScorerNotes', submission.ScorerNotes);
  data.append('Status', submission.Status);
  data.append('UserID', submission.UserID);

  const response = await apiClient.post(endpoint, dataToPost);

  console.log("==== response in scoring.js ====");
  console.log(response);

  return response;
}

export default {
  getPendingSubmissionDetails,
  getPendingSubmissionList,
  getSubmissionStatus,
  postScoringResponse
};