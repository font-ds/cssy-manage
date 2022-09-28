import {request} from '../../../../../utils/http';
import {useQuery} from '@tanstack/react-query';

const getCouponList=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/coupon')
}

export const useGetCouponList=()=>{
    return useQuery(['vipmanage','couponlist'],async ()=>{
        const res=await getCouponList()
        return res.data
    })
}