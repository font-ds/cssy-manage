import {useQuery,QueryKey,useMutation} from '@tanstack/react-query';
import {useAddConfig} from '../../../../utils/use-optimistic-options'
import {request} from '../../../../utils/http';

const getVipList=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip')
}

export const useGetVipList=()=>{
    return useQuery(['vipmanage'],async ()=>{
        const res=await getVipList()
        return res.data
    })
}

export const useAddVip=(queryKey: QueryKey)=>{
    return useMutation(
        (param)=>
        request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/vip',
            {
                method:'post',
                data:param
            }
        ),useAddConfig(queryKey)
    )
}