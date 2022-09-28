import {request} from './http'

export const getMessage=()=>{
    return request(
        '/test/getArray',
        {
            data:{
                pages:1
            }
        }
    )
}