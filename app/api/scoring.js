import apiClient from "./client";

const endpoint = '/scoring';

const getPendingSubmissionDetails = (id) => apiClient.get(endpoint + '/data/' + id);
const getPendingSubmissionList = () => apiClient.get(endpoint);
const getSubmissionStatus = (id) => apiClient.get(endpoint + '/status/' + id);

const postScoringResponse = (submission) => {
  if (submission) { 
    console.log("Submission Data Receivd: " + submission)
  } else { 
    console.log("postScoringResponse failed to get data.")
  }
  
  const data= new FormData();

  data.append('FlagNumber', submission.FlagNumber);
  data.append('id', submission.SubmissionID);
  data.append('MemorialID', submission.MemorialID);
  data.append('OtherRiders', submission.OtherRiders);
  data.append('ScorerNotes', submission.ScorerNotes);
  data.append('Status', submission.Status);
  data.append('UserID', submission.UserID);

  console.log("==== data object ====");
  console.log(data);

  return apiClient.post(endpoint, data)
}

export default {
  getPendingSubmissionDetails,
  getPendingSubmissionList,
  getSubmissionStatus,
  postScoringResponse
};