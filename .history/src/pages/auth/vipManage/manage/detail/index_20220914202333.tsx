import React,{useState} from 'react'
import {Button,Divider,Form,Input,FormInstance,DatePicker} from 'antd';
import { useLocation } from 'react-router-dom'
import Appoint from './components/appointTable';
import Lead from './components/leadTable';
import moment from 'moment';

import {useEditVip} from './util'
import './index.scss';

export default function Index() {
    // 获取传递过来的数据
    const {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 绑定表单
    const [form] = Form.useForm<FormInstance>();

    // 提交
    const handleSubmit= async ()=>{
        const data=await form.validateFields()
        console.log(data)
        
    }
    
  return (
    <div className='vip-detail'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>会员信息</span>
            {
                formDisable?<Button size='small' type='primary' onClick={()=>setFormDisable(false)}>修改信息</Button>:
                <div>
                    <Button size='small' type='default' onClick={()=>{setFormDisable(true);form.setFieldsValue(state)}}>取消</Button>
                    <Button style={{marginLeft:'1rem'}} size='small' type='primary' onClick={()=>handleSubmit}>保存</Button>
                </div>
            }
        </div>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              form={form}
              className='form'
              name="basic"
              disabled={formDisable}
              wrapperCol= {{ span: 6 }}
              initialValues={state}
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
                    <DatePicker></DatePicker>
                </Form.Item>
            </Form>

            <div className='block-title'>借阅记录</div>
            <Divider style={{marginTop:'1rem'}} />
            <Lead></Lead>
            <div className='block-title'>预约记录</div>
            <Divider style={{marginTop:'1rem'}} />
            <Appoint phone={state.phone}></Appoint>

    </div>
  )
}
