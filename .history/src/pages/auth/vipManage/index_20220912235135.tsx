import React from 'react'
import { Route, Routes } from "react-router";
import Coupon from './coupon/index'
import Manage from './manage/index'


export default function Index() {
  return (
    <Routes>
      <Route
        path={"vipmanage1"}
        element={<Manage />}
      ></Route>
      <Route
        path={"vipmanage2"}
        element={<Coupon />}
      ></Route>
    </Routes>
  )
}
