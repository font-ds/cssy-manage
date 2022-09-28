import React from 'react'
import { Route, Routes } from "react-router";
import AppointList from './appointList/index';


export default function Index() {
  return (
    <Routes>
      <Route
        path={"appointmanage1"}
        element={<AppointList />}
      > 
      </Route>

    </Routes>
  )
}
