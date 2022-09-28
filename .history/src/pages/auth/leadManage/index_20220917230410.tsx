import React from 'react'
import { Route, Routes } from "react-router";
import LeadRecordList from './leadReocrdList/index';
import LeadBook from './leadBook/index'

export default function Index() {
  return (
    <Routes>
      <Route
        path={"leadmanage1"}
        element={<LeadRecordList />}
      > 
      </Route>
      <Route
        path={"leadmanage2"}
        element={<LeadBook />}
      > 
      </Route>
    </Routes>
  )
}
