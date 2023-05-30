import axios from 'axios';
import { API_URL } from 'shared/config';
import { CreateRequestApiParams, IRequestDetails, IRequestType } from '../model/types';


export const getRequestTypes = () => {
  return axios.get<IRequestType[]>(`${API_URL}/api/v1/investor/typesChecks`);
};

const generateRequestTypes = () => {
  return axios.post(`${API_URL}/api/v1/investor/typesChecks`);
};

const createRequest = (data: any) => (
  axios.post(`${API_URL}/api/v1/investor/request`, data)
);

type attachFileParams = {
  file: File,
  countryId: string,
  requestId: string,
  idDocType: string
};
const attachFile = (data: attachFileParams) => {
  const formData = new FormData();
  for (const key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  return axios.post(`${API_URL}/api/v1/investor/request/document`, formData);
};

const initCheck = (requestId: string) => (
  axios.get(`${API_URL}/api/v1/investor/request/check`, { params: { requestId } })
);

const getRequestDetails = (id: string) => (
  axios.get<IRequestDetails>(`${API_URL}/api/v1/investor/request`, { params: { requestId: id } })
);

const getRequestDetailsAdmin = (id: string) => (
  axios.get<IRequestDetails>(`${API_URL}/api/v1/admin/request`, { params: { requestId: id } })
);

export const requestApi = {
  generateRequestTypes,
  getRequestTypes,
  createRequest,
  initCheck,
  attachFile,
  getRequestDetails
};

export const adminRequestApi = {
  getRequestDetails: getRequestDetailsAdmin
};
