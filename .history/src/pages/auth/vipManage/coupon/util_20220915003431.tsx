import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {request} from '../../../../utils/http';
import {useEditConfig} from '../../../../utils/use-optimistic-options';
import {couponRecord} from '../../../../././type/type';

// 获取优惠券记录
const getCouponRecord=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/issue')
}

export const useGetCouponRecord=()=>{
    return useQuery(['vipmanage','couponRecord'],async ()=>{
        const res=await getCouponRecord()
        return res.data
    })
}

// 使用优惠券
export const useCoupon=(queryKey: QueryKey)=>{
    return useMutation(
        (params:couponRecord)=>
        request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/vip/coupon',
            {
                method:'post',
                data:{
                    coupon_id:params.coupon_id,
                    phone:params.phone
                }
            }
        ),useEditConfig(queryKey,'coupon_id')
    )
}