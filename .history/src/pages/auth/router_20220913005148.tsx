import React from 'react'
import VipManage from './vipManage/index';
import BookMange from './bookManage/index'
import AppointManage from './appointManege/index'
import LeadManage from './leadManage/index'
import OnlineManage from './onlineManage/index'
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
        breadcrumbName:'首页',

    },
    {
        key:'vipmanage',
        icon:<VideoCameraOutlined/>,
        label:'会员管理中心',
        path:'vipmanage/*',
        route:<VipManage />,
        breadcrumbName:'会员管理中心',
        children:[
            {label:'会员账号管理',key:'vipmanage1',breadcrumbName:'会员账号管理'},
            {label:'优惠券管理',key:'vipmanage2',breadcrumbName:'优惠券管理'},
        ]
    },
    {
        key:'bookmanage',
        icon:<UserOutlined/>,
        label:'图书管理中心',
        path:'bookmanage/*',
        route:<BookMange />,
        children:[
            {label:'图书管理列表',key:'bookmanage1',breadcrumbName:'图书管理列表'},
            {label:'图书添加操作',key:'bookmanage2',breadcrumbName:'图书添加操作'}
        ]
    },
    {
        key:'leadmanage',
        icon:<UserOutlined/>,
        label:'借阅管理中心',
        path:'leadmanage/*',
        route:<LeadManage />,
        breadcrumbName:'借阅管理中心',

        children:[
            {label:'借阅管理列表',key:'leadmanage1',breadcrumbName:'借阅管理列表'},
            {label:'快捷借阅操作',key:'leadmanage2',breadcrumbName:'快捷借阅操作'}
        ]
    },
    {
        key:'appointmanage',
        icon:<UserOutlined/>,
        label:'预约管理中心',
        path:'appointmanage/*',
        route:<AppointManage />,
        breadcrumbName:'预约管理中心',

        children:[
            {label:'预约管理列表',key:'appointmanage1',breadcrumbName:'预约管理列表'},
            {label:'预约内容设置',key:'appointmanage2',breadcrumbName:'预约内容设置'},
            {label:'金牌讲师设置',key:'appointmanage3',breadcrumbName:'金牌讲师设置'}
        ]
    },
    {
        key:'onlinemanage',
        icon:<UserOutlined/>,
        label:'电子图书管理',
        path:'onlinemanage/*',
        route:<OnlineManage />,
        breadcrumbName:'电子图书管理',
    },
]