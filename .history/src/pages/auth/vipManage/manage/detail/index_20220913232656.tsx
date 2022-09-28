import React from 'react'
import {Button} from 'antd';
import { useLocation } from 'react-router-dom'

export default function Index() {
    // 获取传递过来的数据
    const {state}=useLocation()
    
  return (
    <div>
        <div>
            <span>会员信息</span>
            <Button size='small'>修改信息</Button>
        </div>
    </div>
  )
}
