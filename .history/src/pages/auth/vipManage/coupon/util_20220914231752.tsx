import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

const getCouponRecord=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/issue')
}

export const useGetCouponRecord=()=>{
    return useQuery(['vipmanage','couponlist'],async ()=>{
        const res=await getCouponRecord()
        return res.data
    })
}

