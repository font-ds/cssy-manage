import React from 'react'
import {Button,Divider,Form,Input} from 'antd';
import { useLocation } from 'react-router-dom'
import {vipConfig} from '../type';

export default function Index() {
    // 获取传递过来的数据
    const {state}:{state:any} = useLocation()

    // 提交
    const handleSubmit=(value:any)=>{
        console.log(value)
    }
    
  return (
    <div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>会员信息</span>
            <Button size='small' type='primary' onClick={handleSubmit}>修改信息</Button>
        </div>
        <Divider />
        <Form
              className='form'
              name="basic"
              initialValues={state}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  name="vip_name"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input type='password' className='ipt' placeholder='登录密码' />
                </Form.Item>
            </Form>

    </div>
  )
}
