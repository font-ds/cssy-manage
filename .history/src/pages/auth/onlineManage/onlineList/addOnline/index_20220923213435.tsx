import React,{useState} from 'react'
import {Button,Divider,Form,Input,Select,message,Radio} from 'antd';
import {addOnline} from '../../../../../type/type'
import {useAddVip} from './util'
import {disabledDate} from '../../../../../utils/time'
import { useNavigate } from 'react-router-dom'


const { Option } = Select;
export default function Index() {
    const navigate=useNavigate()

    // 表单是否禁用
    const [disabled,setDisabled]=useState(false)
    // 封面
    const [cover,setCover]=useState('')
    // 视频
    const [key,setKey]=useState('')
    // 新增突变
    const {mutateAsync:addVip}=useAddVip(['onlinemanage','onlinelist',0])
    // 提交
    const handleSubmit= async (value:addOnline)=>{
        let data={
            ...value,
        }
        addVip(data).then((res:any)=>{
            message.success('新增电子图书成功')
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
                  name="title"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="视频封面"
                  name="cover"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={11} />
                </Form.Item>
                <Form.Item
                  label="视频内容"
                  name="key"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={11} minLength={11} />
                </Form.Item>
                <Form.Item
                  label="视频状态"
                  name="state"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Radio.Group>
                        <Radio value="0"> 下架 </Radio>
                        <Radio value="1"> 上架 </Radio>
                    </Radio.Group>
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
