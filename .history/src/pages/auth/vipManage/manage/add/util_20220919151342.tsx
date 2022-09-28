import {QueryKey,useMutation} from '@tanstack/react-query';
import {useAddConfig} from '../../../../../utils/use-optimistic-options'
import {request} from '../../../../../utils/http';
import {vipUser} from '../../../../../type/type'

export const useAddVip=(queryKey: QueryKey,params:vipUser)=>{
    return useMutation(
        ()=>
        request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/vip',
            {
                method:'post',
                data:params
            }
        ),useAddConfig(queryKey)
    )
}