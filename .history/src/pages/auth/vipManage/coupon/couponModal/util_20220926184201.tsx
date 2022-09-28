import {useRequest} from '../../../../../utils/http';
import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {coupon} from '../../../../../type/type';
import {useEditConfig} from '../../../../../utils/use-optimistic-options';

// 获取优惠券列表
export const useGetCouponList=()=>{
    const request=useRequest()
    return useQuery(['vipmanage','couponlist'],async ()=>{
        const res=await request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/coupon')
        return res.data
    })
}


// 停止发放优惠券
export const useStopCoupon=(queryKey: QueryKey)=>{
    const request=useRequest()
    return useMutation(
        (params:coupon)=>
        request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/vip/coupon',
            {
                method:'delete',
                data:{
                    coupon_id:params.coupon_id
                }
            }
        ),useEditConfig(queryKey,'coupon_id')
    )
}