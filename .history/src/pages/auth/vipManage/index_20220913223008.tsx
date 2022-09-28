import React from 'react'
import { Route, Routes } from "react-router";
import Coupon from './coupon/index'
import Manage from './manage/index'
import Detail from './manage/detail';


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
      <Route
        path={"vipmanage2/detail/*"}
        element={<Detail />}
      ></Route>
    </Routes>
  )
}
