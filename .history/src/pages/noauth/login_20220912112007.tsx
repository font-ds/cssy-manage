import {useState} from 'react'
import { Button, Form, Input,Row,Col } from 'antd';

import './login.scss'

export default function Index () {
    return <Row className="login">
        <Col span={12}>
            <img  src={require('../../assets/team.png')} alt='login'></img>
        </Col>

        <Col span={6} pull={1}>
            <Form
              className='form'
              name="basic"
              initialValues={{ remember: true }}
            //   onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
                <p className='title'>春山拾阅管理后台</p>
                <p className='small-title'>©春山拾阅</p>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: '请输入用户名！' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码!' }]}
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