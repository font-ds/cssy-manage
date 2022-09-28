import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './login'

export const store=configureStore({
    reducer:{
        test:loginReducer
    },
    
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch