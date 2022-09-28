import React from 'react'
import {Modal,Form,Input,Button,DatePicker} from 'antd';
import {addCoupon} from '../../../../../type/type';

interface propsConfig {
    controlModal:Function,
    addVisible:boolean,
    addModal:Function
}

export default function Index(props:propsConfig) {

    // 提交
    const handleSubmit=(value:addCoupon)=>{
        console.log(value)
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
              wrapperCol= {{ span: 10 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="优惠券名称"
                  name="coupon_name"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="优惠券金额"
                  name="amount"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={4} />
                </Form.Item>
                <Form.Item
                  label="到期时间"
                  name="expired_date"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <DatePicker style={{width:'14rem'}} placeholder='请选择到期时间' onChange={(e,value)=>console.log(e,value)}></DatePicker>
                </Form.Item>
                <Form.Item
                  label="优惠券数量"
                  name="max"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={4} />
                </Form.Item>

                <Form.Item wrapperCol={{offset:4}}>
                    <Button size='small' type="primary" htmlType="submit">
                      新增
                    </Button>
                    <Button size='small' onClick={()=>{props.addModal(false);props.controlModal(true)}}>
                        取消
                    </Button>
                </Form.Item>
            </Form>

    </Modal>
  )
}
