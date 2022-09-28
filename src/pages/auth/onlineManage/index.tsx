import React from 'react'
import { Route, Routes } from "react-router";
import OnlineList from './onlineList/index'
import AddOnline from './onlineList/addOnline/index';
import OnlineDetail from './onlineList/onlineDetail/index';

export default function Index() {
  return (
    <Routes>
      <Route
        path={"onlinemanage1"}
        element={<OnlineList />}
      > 
      </Route>
      <Route
        path={"onlinemanage1/addonline"}
        element={<AddOnline />}
      > 
      </Route>
      <Route
        path={"onlinemanage1/onlinedetail"}
        element={<OnlineDetail />}
      > 
      </Route>
    </Routes>
  )
}
