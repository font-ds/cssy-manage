import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Index(props:any) {
    const location=useLocation()
    
    console.log(111)
    console.log(location)
  return (
    <div>index</div>
  )
}
