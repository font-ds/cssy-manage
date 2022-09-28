import React from 'react'
import Manage from './manage/index';
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
        key:'manage',
        icon:<VideoCameraOutlined/>,
        label:'会员管理中心',
        path:'manage/*',
        route:<Manage />,
        children:[
            {label:'管理1',key:'manage1'},
            {label:'管理2',key:'manage2'},
        ]
    },
    {
        key:'user',
        icon:<UserOutlined/>,
        label:'用户',
        path:'user/*',
        route:<User />,
        children:[
            {label:'用户1',key:'user1'},
            {label:'用户2',key:'user2'}
        ]
    }
]