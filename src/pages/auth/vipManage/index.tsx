import React from 'react'
import { Route, Routes } from "react-router";
import Coupon from './coupon/index'
import Manage from './manage/index'
import Detail from './manage/detail/index';
import Add from './manage/add/index'


export default function Index() {
  return (
    <Routes>
      <Route
        path={"vipmanage1"}
        element={<Manage />}
      > 
      </Route>
      <Route
        path={"vipmanage1/detail"}
        element={<Detail />}
      > 
      </Route>
      <Route
        path={"vipmanage1/add"}
        element={<Add />}
      > 
      </Route>
      <Route
        path={"vipmanage2"}
        element={<Coupon />}
      ></Route>

    </Routes>
  )
}
