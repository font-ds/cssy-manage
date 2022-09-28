import React,{useState} from 'react'
import {Button,Divider,Form,Input,FormInstance} from 'antd';
import {vipUser} from '../../../../../type/type'

import './index.scss';

export default function Index() {
    // 提交
    const handleSubmit= async (value:vipUser)=>{
        console.log(value)
        
    }
    
  return (
    <div className='vip-detail'>
        <span>新增会员信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              className='form'
              name="basic"
              wrapperCol= {{ span: 6 }}
              autoComplete="off"
            >
                <Form.Item
                  label="会员姓名"
                  name="vip_name"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="会员电话"
                  name="phone"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="会员类型"
                  name="power"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="到期时间"
                  name="expired_date"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
            </Form>
    </div>
  )
}