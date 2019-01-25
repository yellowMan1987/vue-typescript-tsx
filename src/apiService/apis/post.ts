import request, { uploadApi } from '../apiBase/apiRequest';

// const host = window.location.host;
const host = '127.0.0.1';


export const getUserList = () => {
  return request.get(`/api/user/list`);
};