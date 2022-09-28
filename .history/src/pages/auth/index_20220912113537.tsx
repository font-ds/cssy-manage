import React,{useState} from 'react'
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import './index.scss'
import {router} from './router';
import { Route, Routes, useNavigate } from "react-router";
import Inde from './index/index';



const { Header, Sider, Content } = Layout;

export default function Index() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{height:'100vh'}}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </Header>
      <Layout>
        <Sider theme='light' trigger={null} collapsible collapsed={collapsed}>
          <LeftMenu></LeftMenu>
        </Sider>
        <Layout className="site-layout">

          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Routes>
              <Route index element={<Inde></Inde>}></Route>
              {router.map(item=>{
                if(item.key==='index') return null
                return <Route key={item.key} path={item.path} element={item.route}></Route>
              })}
            </Routes> 
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const LeftMenu=()=>{
  const navigate = useNavigate();

  return <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={['']}
    items={router}
    onClick={e=>{
      const path=e.keyPath.reverse().join('/')
      console.log(path)
      navigate(path)
  }}
  />
}


