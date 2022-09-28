import React from 'react'
import {Modal,Form,Input,Button,DatePicker, message} from 'antd';


export default function ListModal(props) {
  return (
    <Modal 
        visible={props.addVisible} 
        footer={null} 
        onCancel={()=>{props.addModal(false);props.controlModal(true)}}
        title='新增优惠券'
    >
    </Modal>
  )
}
