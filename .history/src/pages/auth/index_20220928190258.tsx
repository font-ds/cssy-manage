import React, { useState } from "react";
import { Layout, Menu, Button, message } from "antd";
import Bread from "../../components/bread/bread";
import "./index.scss";
import { router } from "./router";
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/login";

const { Header, Sider, Content } = Layout;

export default function Index() {
  const dispatch = useDispatch();
  // 退出
  const loginOut = () => {
    window.localStorage.removeItem("token");
    dispatch(setUser(false));
    message.success("退出登录成功");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <div className="back-header">
          <span>春山拾阅管理后台</span>
          <div className="head-right">
            <span>超级管理员</span>
            <Button size="small" type="primary" onClick={loginOut}>
              退出
            </Button>
          </div>
        </div>
      </Header>
      <Layout>
        <Sider theme="light" trigger={null} collapsible>
          <LeftMenu></LeftMenu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              marginLeft: "0.3rem",
              padding: "1rem",
              minHeight: 280,
            }}
          >
            <Bread></Bread>
            <Routes>
              {/* <Route index element={<Inde></Inde>}></Route> */}
              {router.map((item) => {
                if (item.key === "index") return null;
                return (
                  <Route
                    key={item.key}
                    path={item.path}
                    element={item.route}
                  ></Route>
                );
              })}
              <Route
                path="/"
                element={<Navigate to="/vipmanage/vipmanage1"></Navigate>}
              ></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

const LeftMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultOpenKeys={["vipmanage"]}
      defaultSelectedKeys={["vipmanage", "vipmanage1"]}
      items={router}
      onClick={(e) => {
        const path = e.keyPath.reverse().join("/");
        console.log(path);
        navigate(path);
      }}
    />
  );
};
