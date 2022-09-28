import React from 'react'
import { Route, Routes } from "react-router";
import OnlineList from './onlineList/index'


export default function Index() {
  return (
    <Routes>
      <Route
        path={"vipmanage1"}
        element={<OnlineList />}
      > 
      </Route>
    </Routes>
  )
}
