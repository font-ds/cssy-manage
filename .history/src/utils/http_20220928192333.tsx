import React from "react";
import qs from "qs";
import { cleanObject } from "./util";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setUser } from "../store/login";

interface fetchType extends RequestInit {
  token?: string;
  data?: Object;
  form?: boolean;
}

// export const apiUrl = 'http://127.0.0.1:4523/m1/1513755-0-default'
export const apiUrl = "https://seasonslibrary.cn";

export const request = async (
  url: string,
  { data, token, headers, ...fetchConfig }: fetchType = {},
  dispatch: AppDispatch
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? "bearer " + token : "",
      "Content-Type": data ? "application/json" : "",
    },
    form: false,
    ...fetchConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    // url += `?${qs.stringify(data)}`
  } else if (!config.form) {
    config.body = JSON.stringify(cleanObject(data));
  } else {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.body = qs.stringify(data);
  }
  return fetch(apiUrl + url, config).then(async (response) => {
    // if (
    //   response.status === 403 &&
    //   url != "/back/vip?power=-1&page=0&limit=20&keyword=&type=0"
    // ) {
    //   window.localStorage.removeItem("token");
    //   dispatch(setUser(false));
    //   message.error("登录过期,请重新登录");
    // }
    if (response.status === 400 && url == "/back/login")
      return message.error("账号或密码错误");
    if (response.status === 500 || response.status === 400)
      return message.error("服务出错,请联系管理员");
    const res = await response.json();
    if (response.ok || response.status === 400) {
      // if (res.code != "200") {
      //   message.error(res.msg || "服务错误，请联系管理员");
      //   return Promise.reject(res);
      // }
      // try {
      //   return JSON.parse(res.data);
      // } catch (e) {
      //   //如果JSON解析失败，则直接返回文本
      //   return res.data;
      // }
      return res;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useRequest = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  return React.useCallback(
    (url: string, { data, token, headers, ...fetchConfig }: fetchType = {}) => {
      return request(url, { ...fetchConfig, token: token as string }, dispatch);
    },
    [token]
  );
};
