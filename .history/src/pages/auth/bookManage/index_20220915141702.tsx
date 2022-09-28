import React from 'react'
import { Route, Routes } from "react-router";
import BookList from './bookList'
import BookDetail from './bookList/detail/index'


export default function Index() {
  return (
    <Routes>
      <Route
        path={"bookmanage1"}
        element={<BookList />}
      > 
      </Route>
      <Route
        path={"bookmanage1/detail"}
        element={<BookDetail />}
      > 
      </Route>
    </Routes>
  )
}