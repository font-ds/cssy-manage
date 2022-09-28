import React from 'react'
import VipManage from './vipManage/index';
import BookMange from './bookManage/index'
import AppointManage from './appointManege/index'
import LeadManage from './leadManage/index'
import OnlineManage from './onlineManage/index'

import User from './user/index';
import Index from './index/index';
import {

    UserOutlined,
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
        icon:<VideoCameraOutlined/>,
        label:'会员管理中心',
        path:'vipmanage/*',
        route:<VipManage />,
        children:[
            {label:'会员账号管理',key:'manage1'},
            {label:'优惠券管理',key:'manage2'},
        ]
    },
    {
        key:'bookmanage',
        icon:<UserOutlined/>,
        label:'图书管理中心',
        path:'bookmanage/*',
        route:<BookMange />,
        children:[
            {label:'图书管理列表',key:'manage1'},
            {label:'图书添加操作',key:'manage2'}
        ]
    },
    {
        key:'leadmanage',
        icon:<UserOutlined/>,
        label:'借阅管理中心',
        path:'leadmanage/*',
        route:<LeadManage />,
        children:[
            {label:'借阅管理列表',key:'manage1'},
            {label:'快捷借阅操作',key:'manage2'}
        ]
    },
    {
        key:'appointmanage',
        icon:<UserOutlined/>,
        label:'预约管理中心',
        path:'appointmanage/*',
        route:<AppointManage />,
        children:[
            {label:'预约管理列表',key:'manage1'},
            {label:'预约内容设置',key:'manage2'},
            {label:'金牌讲师设置',key:'manage3'}
        ]
    },
    {
        key:'onlinemanage',
        icon:<UserOutlined/>,
        label:'电子图书管理',
        path:'onlinemanage/*',
        route:<OnlineManage />,
        
    },
]