import React from 'react'
import { Route, Routes } from "react-router";
import BookList from './bookList'
import BookDetail from './bookList/detail'


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
      <Route
        path={"bookmanage2"}
        element={<BookDetail />}
      > 
      </Route>
    </Routes>
  )
}
