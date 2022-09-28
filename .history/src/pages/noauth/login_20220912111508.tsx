import {useState} from 'react'
import { Button, Form, Input,Row,Col } from 'antd';

import './login.scss'

export default function Index () {
    return <Row className="login">
        <Col span={12}>
            <img  src={require('../../assets/team.png')} alt='login'></img>
        </Col>

        <Col span={8}>
        <Form
          className='form'
          name="basic"
        //   labelCol={{ span: 8 }}
        //   wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
            <p>春山拾阅管理后台</p>
            <p>©春山拾阅</p>
            <Form.Item
            //   label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
            //   label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
        </Form>
        </Col>
        
    </Row>
}