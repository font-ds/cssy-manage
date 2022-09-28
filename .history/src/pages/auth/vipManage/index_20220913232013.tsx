import React from 'react'
import { Route, Routes } from "react-router";
import Coupon from './coupon/index'
import Manage from './manage/index'
import Detail from './manage/detail/index';


export default function Index() {
  return (
    <Routes>
      <Route
        path={"vipmanage1"}
        element={<Manage />}
      >
          <Route
            path={"detail"}
            element={<Detail />}
          ></Route>
        
      </Route>
      <Route
        path={"vipmanage2"}
        element={<Detail />}
      ></Route>

    </Routes>
  )
}
