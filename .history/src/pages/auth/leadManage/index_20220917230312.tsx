import React from 'react'
import { Route, Routes } from "react-router";
import {LeadRecordList} from './leadReocrdList/index';


export default function Index() {
  return (
    <Routes>
      <Route
        path={"leadmanage1"}
        element={<LeadRecordList />}
      > 
      </Route>
    </Routes>
  )
}
