import React from 'react'
import { Route, Routes } from "react-router";
import OnlineList from './onlineList/index'


export default function Index() {
  return (
    <Routes>
      <Route
        path={"onlinemanage1"}
        element={<OnlineList />}
      > 
      </Route>
    </Routes>
  )
}
