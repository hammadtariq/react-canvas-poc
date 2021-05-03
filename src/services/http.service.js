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
  (response) => response.data.data,
  (error) => {
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
  }
);

const _getApiVersion = (params = { apiVersion: "" }) => params.apiVersion || "";
const _retryParams = (params = {}) => ({
  ...params,
  validateStatus: (status) => status < 400,
  retry: 4,
  retryDelay: 2000,
});

export function get(url, params) {
  return instance.get(`${_getApiVersion(params)}/${url}`, _retryParams(params));
}

export function post(url, body, params) {
  return instance.post(
    `${_getApiVersion(params)}/${url}`,
    body,
    _retryParams(params)
  );
}

export function put(url, body, params) {
  return instance.put(
    `${_getApiVersion(params)}/${url}`,
    body,
    _retryParams(params)
  );
}

export function patch(url, params, body) {
  return instance.patch(
    `${_getApiVersion(params)}/${url}`,
    body || {},
    _retryParams(params)
  );
}

export function remove(url, params, body) {
  return instance.delete(`${_getApiVersion(params)}/${url}`, body || {});
}
