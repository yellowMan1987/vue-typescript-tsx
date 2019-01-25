import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Message } from "element-ui";
import Router from "vue-router";
import merge  from 'lodash.merge';
import { language, i18n } from '@/locale';

const has = require("lodash/has");
const CancelToken = axios.CancelToken;
const instance: AxiosInstance = axios.create({
  timeout: 500000,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "-1",
    language
  },
  withCredentials: true
});

export let uploadApi: AxiosInstance = axios.create({
  timeout: 500000,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "-1",
    language
  }
});

function success(resp:any) {
  if (resp.status === 200) {
    if (resp.data.errorCode) {
      Message({
        message: '成功',
        type: "error"
      });
      return Promise.reject(new Error());
    } else {
      return resp.data;
    }
  }
}

function error(error:any) {
  if (error.response && error.response.status === 401) {
    Message({
      message: '请求失败',
      type: "error"
    });
    // setTimeout(() => {
    //   history.go(0);
    // }, 2000);
  } else if (error.response && error.response.status === 403) {
    Message({
      message: '木有访问权限',
      type: "error"
    });
  } else {
    Message({
      message: '未发送请求',
      type: "error"
    });
  }

  return Promise.reject(error);
}

instance.interceptors.response.use(success, error);

export function initHeaders(user:any) {
  if (has(user, "access_token")) {
    instance.defaults.headers.accessToken = '';
  } else if (has(user, "accessToken")) {
    instance.defaults.headers.accessToken = '';
  } else {
    // console.log('没有token 准备登出');
    // history.go(0);
  }
}

export function resetHeaders() {
  delete instance.defaults.headers.userId;
  delete instance.defaults.headers.accessToken;
}

// 因为使用interceptors去掉axios response的status, headers等属性，所以需要重新改对应方法的返回值
export default instance as {
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
};