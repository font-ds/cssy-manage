
import {createAsyncThunk, createSlice,PayloadAction} from '@reduxjs/toolkit';

interface useState{
    user:string
}

const initialState:textState={
    user:''
}

const loginSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state:useState,action:PayloadAction<string>)=>{
            state.user+=action.payload
        }
    },
})

export const {setUser}=loginSlice.actions

export default loginSlice.reducer