
import {createAsyncThunk, createSlice,PayloadAction} from '@reduxjs/toolkit';

interface textState{
    text:string
}

const initialState:textState={
    text:''
}

const loginSlice=createSlice({
    name:'text',
    initialState,
    reducers:{
        setUser:(state:textState,action:PayloadAction<string>)=>{
            state.text+=action.payload
        }
    },
})

export const {setUser}=loginSlice.actions

export default loginSlice.reducer