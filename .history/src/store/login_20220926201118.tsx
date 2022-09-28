
import {createAsyncThunk, createSlice,PayloadAction} from '@reduxjs/toolkit';
import {request} from '../utils/http'

const checkTokenRequest=(token:any)=>{
    request('/back/tutor?page=0&limit=1&state=-1')
}

export const checkToken=createAsyncThunk('checkToken',async()=>{
    let token=window.localStorage.getItem('token')
    if(token){
        try{
            checkTokenRequest(token)
            return true
        }
        catch(e){
            return false
        }
    }
    else return false
})

interface useState{
    user:boolean|null
}

const initialState:useState={
    user:false
}

const loginSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state:useState,action:PayloadAction<boolean>)=>{
            state.user=action.payload
        }
    },
    extraReducers:build=>{
        build.addCase(checkToken.fulfilled,(state,action)=>{
            state.user=action.payload
        })
    }
})

export const {setUser}=loginSlice.actions

export default loginSlice.reducer