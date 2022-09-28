import React from 'react'
import {Modal,Form,Input,Button,DatePicker, message,Popconfirm} from 'antd';
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
    // 绑定表单
    const [form] = Form.useForm<addCoupon>();
    // 提交
    const {mutateAsync:addCoupon}=useAddCoupon(['vipmessage','couponlist'])
    const handleSubmit=()=>{
        let data=form.getFieldsValue()
        data.amount*=1
        data.max*=1
        data.expired_date=moment(data.expired_date).format('YYYY/MM/DD')
        addCoupon(data).then(res=>{
          if(res.status==0){
            message.success('新增优惠券成功')
            props.addModal(false)
            props.controlModal(true)
          }
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
              form={form}
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
                  <DatePicker disabledDate={disabledDate} style={{width:'14rem'}} placeholder='请选择到期时间'></DatePicker>
                </Form.Item>
                <Form.Item
                  label="优惠券数量"
                  name="max"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input placeholder='发布数量(小于4位数)' maxLength={4} />
                </Form.Item>

                <Form.Item wrapperCol={{offset:8,span:16}}>

                  <Popconfirm
                      placement="topRight"
                      title={'是否新增优惠券'}
                      onConfirm={()=>handleSubmit()}
                      okText="确认"
                      cancelText="取消"
                    >
                    <Button style={{marginRight:'1rem'}} size='small' type="primary">
                      新增
                    </Button>
                  </Popconfirm>
                    <Button style={{marginLeft:'1rem'}} size='small' onClick={()=>{props.addModal(false);props.controlModal(true)}}>
                        取消
                    </Button>
                </Form.Item>
            </Form>

    </Modal>
  )
}
