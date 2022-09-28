import {QueryKey,useMutation} from '@tanstack/react-query';
import {useAddConfig} from '../../../../../utils/use-optimistic-options'
import {useRequest} from '../../../../../utils/http';
import {addOnline} from '../../../../../type/type'

export const useAddOnline=(queryKey: QueryKey)=>{
    const request=useRequest()
    return useMutation(
        (params:addOnline)=>
        request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/video',
            {
                method:'post',
                data:params
            }
        ),useAddConfig(queryKey)
    )
}