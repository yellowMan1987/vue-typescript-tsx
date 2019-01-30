import request, { uploadApi } from '../apiBase/apiRequest';

// const host = window.location.host;
const host = '127.0.0.1';


export const getUserList = () => {
  return request.get(`/api/user/list`);
};
export const addUser = (data: any) => {
  return request.post(`/api/user/add`,data);
};
export const login = (data: any) => {
  return request.post(`/api/user/login`,data);
};
export const loginout = (data: any) => {
  return request.post(`/api/user/loginout`,data);
};