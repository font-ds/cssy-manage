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
                  style={{marginTop:'3rem'}}
                  name="username"
                  rules={[{ required: true, message: '账号不能为空！' }]}
                >
                  <Input className='ipt' placeholder='登录账号' />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '密码不能为！' }]}
                >
                  <Input type='password' className='ipt' placeholder='登录密码' />
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