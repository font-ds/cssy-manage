import {request} from './http'

export const getMessage=()=>{
    return request(
        'http://127.0.0.1:4523/m1/1513695-0-default/pet/findByStatus',
        {
            data:{
                status:200
            }
        }
    )
}