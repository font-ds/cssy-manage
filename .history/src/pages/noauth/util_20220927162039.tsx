import {request} from '../../utils/http';
import {loginConfig} from '../../type/type'
import { message } from 'antd';
import {AppDispatch} from '../../store/store';
import {setUser} from '../../store/login';

export const login=(params:loginConfig,dispatch:AppDispatch)=>{
    return request(
        '/back/login',
        {
            method:'post',
            data:params,
            form:true

        }
    ).then(res=>{
        // if(!res.status){
            console.log(res)
            // message.success('登录成功')
            // window.localStorage.setItem('token',res.token)
            // dispatch(setUser(true))
        // }
    })
}