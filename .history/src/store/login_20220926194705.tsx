
import {createAsyncThunk, createSlice,PayloadAction} from '@reduxjs/toolkit';

interface useState{
    user:string|null
}

const initialState:useState={
    user:null
}

const loginSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state:useState,action:PayloadAction<string>)=>{
            state.user=action.payload
        }
    },
})

export const {setUser}=loginSlice.actions

export default loginSlice.reducer