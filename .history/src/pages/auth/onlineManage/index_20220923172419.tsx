import React from 'react'
import { Route, Routes } from "react-router";



export default function Index() {
  return (
    <Routes>
      <Route
        path={"vipmanage1"}
        element={<Manage />}
      > 
      </Route>
    </Routes>
  )
}
