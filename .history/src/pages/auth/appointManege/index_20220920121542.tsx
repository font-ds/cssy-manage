import React from 'react'
import { Route, Routes } from "react-router";
import AppointList from './appointList/index';
import ContentList from './contentList/index'


export default function Index() {
  return (
    <Routes>
      <Route
        path={"appointmanage1"}
        element={<AppointList />}
      > 
      </Route>
      <Route
        path={"appointmanage2"}
        element={<ContentList />}
      > 
      </Route>

    </Routes>
  )
}
