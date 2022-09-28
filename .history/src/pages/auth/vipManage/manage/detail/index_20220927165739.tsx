import React,{useState} from 'react'
import {Button,Divider,Form,Input,FormInstance,DatePicker, message,Popconfirm,Select} from 'antd';
import { useLocation } from 'react-router-dom'
import Appoint from './components/appointTable';
import Lead from './components/leadTable';
import {disabledDate} from '../../../../../utils/time'
import moment from 'moment';
import { vipUser } from '../../../../../type/type';

import {useEditVip} from './util'
import './index.scss';

const {Option}=Select
export default function Index() {
    // 获取传递过来的数据
    let {state}:{state:any} = useLocation()
    state.expired_date=moment(state.expired_date,"YYYY-MM-DD")
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 绑定表单
    const [form] = Form.useForm<vipUser>();

    // 提交
    const {mutateAsync:editVip}=useEditVip(['vipmanage','viplist',state.page,state.state,state.keyword,state.type])
    const handleSubmit= async ()=>{
        const data=await form.validateFields()
        data.identity_number=state.identity_number
        data.expired_date=moment(data.expired_date).format('YYYY/MM/DD')
        editVip(data).then(res=>{
          message.success('会员信息修改成功')
          setFormDisable(true)
          state={...state,...data}
        })
    }
    
  return (
    <div className='vip-detail'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>会员信息</span>
            {
                formDisable?
                <Button size='small' type='primary' onClick={()=>setFormDisable(false)}>修改信息</Button>:
                <div>
                    <Button size='small' type='default' onClick={()=>{setFormDisable(true);form.setFieldsValue(state)}}>取消</Button>
                    <Popconfirm
                      placement="topRight"
                      title={'是否确认修改会员信息'}
                      onConfirm={handleSubmit}
                      okText="确认"
                      cancelText="取消"
                    >
                        <Button style={{marginLeft:'1rem'}} size='small' type='primary'>保存</Button>
                    </Popconfirm>
                    
                </div>
            }
        </div>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              form={form}
              className='form'
              name="basic"
              disabled={formDisable}
              labelCol={{offset:3}}
              wrapperCol= {{ span: 6 }}
              initialValues={state}
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
                  <Select placeholder='请选择会员类型' style={{ width: '14rem' }}>
                    <Option value={0}>普通会员</Option>
                    <Option value={1}>VIP</Option>
                    <Option value={2}>SVIP</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="到期时间"
                  name="expired_date"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <DatePicker disabledDate={disabledDate} style={{width:'14rem'}} placeholder='普通会员可任意填写'></DatePicker>
                </Form.Item>
            </Form>

            <div className='block-title'>借阅记录</div>
            <Divider style={{marginTop:'1rem'}} />
            <Lead phone={state.phone}></Lead>
            <div className='block-title'>预约记录</div>
            <Divider style={{marginTop:'1rem'}} />
            <Appoint phone={state.phone}></Appoint>

    </div>
  )
}
