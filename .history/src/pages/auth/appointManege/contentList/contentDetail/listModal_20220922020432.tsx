import React from 'react'
import {Modal,Form,Input,Button,DatePicker, message} from 'antd';

interface propsConfig {
    id:string,
    closeFunc:Function
}

export default function ListModal(props:propsConfig) {
  return (
    <Modal 
        footer={null} 
        onCancel={()=>{props.closeFunc(false)}}
        title='新增优惠券'
    >
    </Modal>
  )
}
