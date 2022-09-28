import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Index() {
    // 获取传递过来的数据
    const {state}=useLocation()
    
  return (
    <div>{JSON.stringify(state)}</div>
  )
}
