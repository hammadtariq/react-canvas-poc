/* eslint-disable no-restricted-globals */
import axios from "axios";
import { BASE_URL } from "./constants";
import { toastMessage } from "./utils.service";

export function SetApiRequestHeader(customHeader = {}) {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...customHeader,
  };
  return defaultHeaders;
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: SetApiRequestHeader(),
});

// Add a response interceptor
instance.interceptors.response.use(
  (response: any) => response.data.data,
  (error: any) => {
    if (error.response) {
      if (error.response && error.response.status >= 400) {
        const errorObj = error.response.errors || "Something Went Wrong";
        const errMessage = decodeURI(errorObj);
        toastMessage("error", errMessage);
        return Promise.reject(errMessage);
      }
    }
    const err = error.msg ? error.msg : JSON.stringify(error);
    console.log("error===> ", error);
    return Promise.reject(err);
  },
);
type ApiVersion = { apiVersion: String };
const _getApiVersion = (params: ApiVersion = { apiVersion: "" }) => params.apiVersion || "";
const _retryParams = (params = {}) => ({
  ...params,
  validateStatus: (status: Number) => status < 400,
  retry: 4,
  retryDelay: 2000,
});

export function get(url: String, params: ApiVersion) {
  return instance.get(`${_getApiVersion(params)}/${url}`, _retryParams(params));
}

export function post(url: String, body: Object, params: ApiVersion) {
  return instance.post(`${_getApiVersion(params)}/${url}`, body, _retryParams(params));
}

export function put(url: String, body: Object, params: ApiVersion) {
  return instance.put(`${_getApiVersion(params)}/${url}`, body, _retryParams(params));
}

export function patch(url: String, params: ApiVersion, body: Object) {
  return instance.patch(`${_getApiVersion(params)}/${url}`, body || {}, _retryParams(params));
}

export function remove(url: String, params: ApiVersion, body: Object) {
  return instance.delete(`${_getApiVersion(params)}/${url}`, body || {});
}
