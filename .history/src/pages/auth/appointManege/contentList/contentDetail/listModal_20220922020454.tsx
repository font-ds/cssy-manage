import React from 'react'
import {Modal} from 'antd';

interface propsConfig {
    id:string,
    closeFunc:Function
}

export default function ListModal(props:propsConfig) {
  return (
    <Modal 
        footer={null} 
        onCancel={()=>{props.closeFunc(false)}}
        title='预约名单'
    >
    </Modal>
  )
}
