import React from 'react'
import { useLocation } from 'react-router-dom'
import {contentList} from '../../../../../type/type';

export default function Index() {
    const {state}:{state:contentList} = useLocation()

  return (
    <div>Index</div>
  )
}
