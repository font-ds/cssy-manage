
import {createAsyncThunk, createSlice,PayloadAction} from '@reduxjs/toolkit';

const checkTokenRequest=()=>{

}

export const checkToken=createAsyncThunk('checkToken',async()=>{
    let token=window.localStorage.getItem('token')
    if(token){
        try{
            checkTokenRequest()
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