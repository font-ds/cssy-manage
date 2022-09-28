import React from 'react'
import {Modal} from 'antd';

interface propsConfig {
    controlModal:Function,
    addVisible:boolean,
    addModal:Function
}

export default function Index(props:propsConfig) {
  return (
    <Modal 
        width={1000} 
        visible={props.addVisible} 
        footer={null} 
        // onCancel={()=>props.controlModal()}
    >

    </Modal>
  )
}
