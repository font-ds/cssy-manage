import {useQuery} from '@tanstack/react-query';
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

