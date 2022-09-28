import React from 'react'
import {Button,Divider,Form,Input} from 'antd';
import { useLocation } from 'react-router-dom'
import './index.scss';

export default function Index() {
    // 获取传递过来的数据
    const {state}:{state:any} = useLocation()

    // 提交
    const handleSubmit=(value:any)=>{
        console.log(value)
    }
    
  return (
    <div className='vip-detail'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>会员信息</span>
            <Button size='small' type='primary' onClick={handleSubmit}>修改信息</Button>
        </div>
        <Divider />
        <Form
              className='form'
              name="basic"
              disabled
              initialValues={state}
              onFinish={handleSubmit}
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
