import React from 'react'
import {Button,Divider,Form,Input,Select,DatePicker} from 'antd';
import {vipUser} from '../../../../../type/type'
import {useAddVip} from './util'
import moment from 'moment';

import './index.scss';

const { Option } = Select;
export default function Index() {

    const {mutateAsync:addVip}=useAddVip(['vipmanage','viplist'])
    // 提交
    const handleSubmit= async (value:vipUser)=>{
        let data={
            ...value,
            // 根据moment属性获取时间戳
            power_expire_date:moment(value.power_expire_date).unix()*1000
        }
        addVip(data).then((res:any)=>{
            console.log(res)
        })
    }
    
  return (
    <div className='vip-add'>
        <span className='title'>新增会员信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              className='form'
              name="basic"
              wrapperCol= {{ span: 8 }}
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
                  label="身份征号"
                  name="identity_number"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={11} />
                </Form.Item>
                <Form.Item
                  label="会员电话"
                  name="phone"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={11} minLength={11} />
                </Form.Item>
                <Form.Item
                  label="会员类型"
                  name="power"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Select  style={{ width: '12rem' }}>
                    <Option value="0">普通会员</Option>
                    <Option value="1">VIP</Option>
                    <Option value="2">SVIP</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="到期时间"
                  name="power_expire_date"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <DatePicker onChange={(e,value)=>console.log(e,value)}></DatePicker>
                </Form.Item>

                <Form.Item wrapperCol={{offset:4}}>
                    <Button type="primary" htmlType="submit">
                      新增
                    </Button>
                </Form.Item>
            </Form>
    </div>
  )
}
