import React,{useEffect} from 'react';
import {Provider, useSelector} from 'react-redux'
import {store,RootState} from './store/store'
import {checkToken} from './store/login'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {BrowserRouter} from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {FullPageLoading} from './components/fullpage/FullPageLoading';
import './App.scss'

// 代码分割
const AuthComponents=React.lazy(()=>import('./pages/auth'))
const NoAuthComponents=React.lazy(()=>import('./pages/noauth/login'))

function App() {
  useEffect(()=>{
    checkToken()
  },[])
  const queryClient = new QueryClient()
  const user=useSelector((state:RootState)=>state.user.user)
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Provider store={store}> */}
        <React.Suspense fallback={<FullPageLoading />}>
          <BrowserRouter>
            {user?<AuthComponents />:<NoAuthComponents />}
          </BrowserRouter>
        </React.Suspense>
      {/* </Provider> */}
      <ReactQueryDevtools initialIsOpen={false}  />
    </QueryClientProvider>
  );
}

export default App;
