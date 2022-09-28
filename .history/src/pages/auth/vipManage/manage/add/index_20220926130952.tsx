import React,{useState} from 'react'
import {Button,Divider,Form,Input,Select,DatePicker,message} from 'antd';
import {vipUser} from '../../../../../type/type'
import {useAddVip} from './util'
import {disabledDate} from '../../../../../utils/time'
import moment from 'moment';

import './index.scss';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
export default function Index() {
    const navigate=useNavigate() 
    const [disabled,setDisabled]=useState(false)
    // 新增突变
    const {mutateAsync:addVip}=useAddVip(['vipmanage','viplist',0,-1,'',''])
    // 提交
    const handleSubmit= async (value:vipUser)=>{
        let data={
            ...value,
            // 根据moment属性获取时间戳
            power_expire_date:moment(value.expired_date).unix()*1000
        }
        addVip(data).then((res:any)=>{
            message.success('新增会员成功')
            setDisabled(true)
        })
    }
    
  return (
    <div className='vip-add'>
        <span className='title'>新增会员信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              disabled={disabled}
              className='form'
              name="basic"
              labelCol={{offset:1}}
              wrapperCol= {{ span: 6 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="会员姓名"
                  name="vip_name"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input placeholder='会员姓名(限8字)' maxLength={8} />
                </Form.Item>
                <Form.Item
                  label="身份征号"
                  name="identity_number"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input  placeholder='身份征号(限18数)' maxLength={18} minLength={18} />
                </Form.Item>
                <Form.Item
                  label="会员电话"
                  name="phone"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input placeholder='会员电话(限18数)' maxLength={11} minLength={11} />
                </Form.Item>
                <Form.Item
                  label="会员类型"
                  name="power"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Select  style={{ width: '14rem' }}>
                    <Option value="0">普通会员</Option>
                    <Option value="1">VIP</Option>
                    <Option value="2">SVIP</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="到期时间"
                  name="expired_date"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <DatePicker disabledDate={disabledDate} style={{width:'14rem'}} placeholder='请选择到期时间' onChange={(e,value)=>console.log(e,value)}></DatePicker>
                </Form.Item>

                <Form.Item wrapperCol={{offset:4}}>
                    <Button type="primary" htmlType="submit">
                      新增
                    </Button>
                    <Button type="primary" onClick={()=>navigate(-1)}>
                      取消
                    </Button>
                </Form.Item>
            </Form>
    </div>
  )
}
