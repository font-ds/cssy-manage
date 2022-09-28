import {useEffect} from 'react'
import { Button, Form, Input,Row,Col } from 'antd';
import {login} from './util'
import './login.scss'
import { useDispatch } from 'react-redux';
import {checkToken} from '../../store/login'

export interface AuthForm{
    username: string;
    password: string;
}

export default function Index () {
    const dispatch=useDispatch()
    // 表单提交
    const handleSubmit=(value:AuthForm)=>{
        console.log(value)
        login(value,dispatch)
    }



    return <Row className="login">
        <Col span={12}>
            <img  src={require('../../assets/team.png')} alt='login'></img>
        </Col>

        <Col span={6} pull={1}>
            <Form
              className='form'
              name="basic"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <p className='title'>春山拾阅管理后台</p>
                <p className='small-title'>©春山拾阅</p>
                <Form.Item
                  style={{marginTop:'2rem'}}
                  name="username"
                  rules={[{ required: true, message: '账号不能为空！' }]}
                >
                  <Input className='ipt' placeholder='登录账号' />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '密码不能为空！' }]}
                >
                  <Input type='password' className='ipt' placeholder='登录密码' />
                </Form.Item>
                <Form.Item  >
                  <Button className='btn' type="primary" htmlType="submit">
                    登录
                  </Button>
                </Form.Item>
            </Form>
        </Col>
        
    </Row>
}