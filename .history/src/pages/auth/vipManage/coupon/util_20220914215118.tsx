import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

const getCouponList=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/issue')
}

export const useGetVipList=()=>{
    return useQuery(['vipmanage','couponlist'],async ()=>{
        const res=await getCouponList()
        return res.data
    })
}

