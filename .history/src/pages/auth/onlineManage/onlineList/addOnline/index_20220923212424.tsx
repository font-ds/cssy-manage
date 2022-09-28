import React,{useState} from 'react'
import {Button,Divider,Form,Input,Select,message} from 'antd';
import {vipUser} from '../../../../../type/type'
import {useAddVip} from './util'
import {disabledDate} from '../../../../../utils/time'
import { useLocation } from 'react-router-dom'
import moment from 'moment';


const { Option } = Select;
export default function Index() {
    const [state,setState]=useState(0)
    const [disabled,setDisabled]=useState(false)
    // 新增突变
    const {mutateAsync:addVip}=useAddVip(['onlinemanage','onlinelist',0])
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
              wrapperCol= {{ span: 8 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="视频标题"
                  name="vip_name"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="视频封面"
                  name="identity_number"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={11} />
                </Form.Item>
                <Form.Item
                  label="视频内容"
                  name="phone"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={11} minLength={11} />
                </Form.Item>
                <Form.Item
                  label="视频状态"
                  name="power"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >

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
