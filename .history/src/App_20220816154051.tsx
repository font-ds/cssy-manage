import React from 'react';
import {Provider} from 'react-redux'
import {store} from './store/store'
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
const NoAuthComponents=React.lazy(()=>import('./pages/noauth'))

function App() {
  const queryClient = new QueryClient()
  const user=true
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <React.Suspense fallback={<FullPageLoading />}>
          <BrowserRouter>
            {user?<AuthComponents />:<NoAuthComponents />}
          </BrowserRouter>

        </React.Suspense>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false}  />
    </QueryClientProvider>
  );
}

export default App;
