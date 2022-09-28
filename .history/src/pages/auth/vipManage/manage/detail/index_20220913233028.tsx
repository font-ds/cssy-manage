import React from 'react'
import {Button,Divider} from 'antd';
import { useLocation } from 'react-router-dom'

export default function Index() {
    // 获取传递过来的数据
    const {state}=useLocation()
    
  return (
    <div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>会员信息</span>
            <Button size='small' type='primary'>修改信息</Button>
        </div>
        <Divider style={{marginTop:'-0.2rem'}} />
    </div>
  )
}
