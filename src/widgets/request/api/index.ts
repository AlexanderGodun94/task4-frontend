import axios from 'axios';
import { GetRequestsApiParams, IRequest } from 'entities/request';
import { API_URL } from 'shared/config';

const getInvestorRequests = (params?: GetRequestsApiParams) => {
  return axios.get<IRequest[]>(`${API_URL}/api/v1/user/users`, { params: { ...params, reverse: true } });
};

export const getAdminRequests = (params?: GetRequestsApiParams) => (
  axios.get<IRequest[]>(`${API_URL}/api/v1/admin/requests`, { params: { ...params, reverse: true } })
);


export const investorApi = {
  getRequests: getInvestorRequests
};

export const adminApi = {
  getRequests: getAdminRequests
};
