import React,{useState} from 'react'
import {Button,Divider,Form,Input,Select,DatePicker,message} from 'antd';
import {useLeadOneBook} from './util'
import {bookLeadRecord} from '../../../../type/type'
import moment from 'moment';

import './index.scss';

const { Option } = Select;
export default function Index() {
    // 借阅人名字
    const [name,setName]=useState<string>('')
    // 选择日期
    const [state,setState]=useState<string>('1')
    // 表单是否可编辑
    const [disabled,setDisabled]=useState(false)
    // 新增突变
    const {mutateAsync:addVip}=useLeadOneBook(['leadmanage','leadrecordlist',-1])
    // 提交
    const handleSubmit= async (value:bookLeadRecord)=>{
        // let data={
        //     ...value,
        //     // 根据moment属性获取时间戳
        //     power_expire_date:moment(value.expired_date).unix()*1000
        // }
        // addVip(data).then((res:any)=>{
        //     message.success('新增会员成功')
        //     setDisabled(true)
        // })
    }
    
  return (
    <div className='vip-add'>
        <span className='title'>新增会员信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              disabled={disabled}
              className='form'
              name="basic"
              wrapperCol= {{ span: 8 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="会员手机"
                  name="vip_name"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="会员姓名"
                >
                  <span>{name}</span>
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
                  <Select defaultValue={state} onChange={e=>setState(e)}  style={{ width: '14rem' }}>
                    <Option value="1">一周</Option>
                    <Option value="2">一周</Option>
                    <Option value="3">一周</Option>
                    <Option value="4">一周</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="到期时间"
                  name="expired_date"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <DatePicker style={{width:'14rem'}} placeholder='请选择到期时间' onChange={(e,value)=>console.log(e,value)}></DatePicker>
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
