import axios from 'axios';
import { API_URL } from 'shared/config';

export const setRequestStatus = (data: { requestId: string, status: string }) => (
  axios.put(`${API_URL}/api/v1/admin/request/status`, data)
);

export const addRequestReport = (data: { requestId: string, file: File }) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return axios.put(`${API_URL}/api/v1/admin/request/report`, formData);
};
