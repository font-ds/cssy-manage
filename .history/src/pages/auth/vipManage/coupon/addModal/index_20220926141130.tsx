import React from 'react'
import {Modal,Form,Input,Button,DatePicker, message} from 'antd';
import {addCoupon} from '../../../../../type/type';
import {useAddCoupon} from './util'
import moment from 'moment';
import {disabledDate} from '../../../../../utils/time';

interface propsConfig {
    controlModal:Function,
    addVisible:boolean,
    addModal:Function
}

export default function Index(props:propsConfig) {

    const {mutateAsync:addCoupon}=useAddCoupon(['vipmessage','couponlist'])

    // 提交
    const handleSubmit=(value:addCoupon)=>{
        let data={
            ...value,
            // 根据moment属性获取时间戳
            power_expire_date:moment(value.expired_date).unix()*1000
        }
        addCoupon(data).then(res=>{
            console.log(res)
            message.success('新增优惠券成功')
            props.addModal(false)
            props.controlModal(true)
        })

    }

  return (
    <Modal 
        visible={props.addVisible} 
        footer={null} 
        onCancel={()=>{props.addModal(false);props.controlModal(true)}}
        title='新增优惠券'
    >
        <Form
              className='form'
              name="basic"
              labelCol={{ span: 6}}
              wrapperCol= {{ span: 12 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="优惠券名称"
                  name="coupon_name"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input placeholder='优惠券名称(限10字)' />
                </Form.Item>
                <Form.Item
                  label="优惠券金额"
                  name="amount"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input placeholder='优惠金额(小于4位数)' maxLength={4} />
                </Form.Item>
                <Form.Item
                  label="到期时间"
                  name="expired_date"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <DatePicker disabledDate={disabledDate} style={{width:'14rem'}} placeholder='请选择到期时间' onChange={(e,value)=>console.log(e,value)}></DatePicker>
                </Form.Item>
                <Form.Item
                  label="优惠券数量"
                  name="max"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input placeholder='发布数量(小于4位数)' maxLength={4} />
                </Form.Item>

                <Form.Item wrapperCol={{offset:8,span:16}}>
                    <Button style={{marginRight:'1rem'}} size='small' type="primary" htmlType="submit">
                      新增
                    </Button>
                    <Button style={{marginLeft:'1rem'}} size='small' onClick={()=>{props.addModal(false);props.controlModal(true)}}>
                        取消
                    </Button>
                </Form.Item>
            </Form>

    </Modal>
  )
}
