import React from 'react'
import { Route, Routes } from "react-router";
import BookList from './bookList'


export default function Index() {
  return (
    <Routes>
      <Route
        path={"bookmanage1"}
        element={<BookList />}
      > 
      </Route>
    </Routes>
  )
}
