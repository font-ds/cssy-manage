import {request} from '../../utils/http';
import {loginConfig} from '../../type/type'
import { message } from 'antd';
import {AppDispatch} from '../../store/store';
import {setUser} from '../../store/login';

export const login=(params:loginConfig,dispatch:AppDispatch)=>{
    return request(
        'http://127.0.0.1:4523/m1/1513755-0-default/back/login',
        {
            method:'post',
            data:params
        }
    ).then(res=>{
        if(!res.status){
            message.success('登录成功')
            window.localStorage.setItem('token',res.token)
            dispatch(setUser(true))
        }
    })
}