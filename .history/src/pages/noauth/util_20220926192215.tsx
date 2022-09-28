import {request} from '../../utils/http';
import {loginConfig} from '../../type/type'

export const login=(params:loginConfig)=>{
    return request(
        'http://127.0.0.1:4523/m1/1513755-0-default/back/login',
        {
            method:'post',
            data:params
        }
    )
}