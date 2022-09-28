import React from 'react'
import VipManage from './vipManage/index';
import BookMange from './bookManage/index'
import AppointManage from './appointManege/index'
import LeadManage from './leadManage/index'
import OnlineManage from './onlineManage/index'
import Index from './index/index';
import {
    UserOutlined,
    BookOutlined,
    DiffOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';

export const router=[
    {
        key:"",
        icon:<VideoCameraOutlined/>,
        label:'首页',
        route:<Index />, 
    },
    {
        key:'vipmanage',
        icon:<UserOutlined/>,
        label:'会员管理中心',
        path:'vipmanage/*',
        route:<VipManage />,
        children:[
            {label:'会员账号管理',key:'vipmanage1'},
            {label:'优惠券管理',key:'vipmanage2'},
        ]
    },
    {
        key:'bookmanage',
        icon:<BookOutlined />,
        label:'图书管理中心',
        path:'bookmanage/*',
        route:<BookMange />,
        children:[
            {label:'图书管理列表',key:'bookmanage1'},
            {label:'图书添加操作',key:'bookmanage2'}
        ]
    },
    {
        key:'leadmanage',
        icon:<DiffOutlined />,
        label:'借阅管理中心',
        path:'leadmanage/*',
        route:<LeadManage />,
        children:[
            {label:'借阅管理列表',key:'leadmanage1'},
            {label:'快捷借阅操作',key:'leadmanage2'}
        ]
    },
    {
        key:'appointmanage',
        icon:<UserOutlined/>,
        label:'预约管理中心',
        path:'appointmanage/*',
        route:<AppointManage />,
        children:[
            {label:'预约管理列表',key:'appointmanage1'},
            {label:'预约内容设置',key:'appointmanage2'},
            {label:'专业导读师设置',key:'appointmanage3'}
        ]
    },
    {
        key:'onlinemanage',
        icon:<UserOutlined/>,
        label:'电子图书管理',
        path:'onlinemanage/*',
        route:<OnlineManage />,
        children:[
            {label:'电子图书管理',key:'onlinemanage1'}
        ]
    },
]