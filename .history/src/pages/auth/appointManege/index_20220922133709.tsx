import React from 'react'
import { Route, Routes } from "react-router";
import AppointList from './appointList/index';
import ContentList from './contentList/index'
import AddContent from './contentList/addContent/index';
import ContentDetail from './contentList/contentDetail/index'
import TeacherList from './teacherList/index'

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
      <Route
        path={"appointmanage2/addcontent"}
        element={<AddContent />}
      > 
      </Route>
      <Route
        path={"appointmanage2/contentdetail"}
        element={<ContentDetail />}
      > 
      </Route>
      <Route
        path={"appointmanage3"}
        element={<TeacherList />}
      > 
      </Route>

    </Routes>
  )
}
