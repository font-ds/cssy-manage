import {useRequest} from '../../../../../utils/http';
import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {coupon} from '../../../../../type/type';
import {useEditConfig} from '../../../../../utils/use-optimistic-options';

// 获取优惠券列表
export const useGetCouponList=(page:any)=>{
    const request=useRequest()
    return useQuery(['vipmanage','couponlist'],async ()=>{
        const res=await request(`/back/vip/coupon?page=${page}&limit=15`)
        let data={pagination:{totle:res.page*15,pageSize:15},data:res.data}
        return data
    })
}


// 停止发放优惠券
export const useStopCoupon=(queryKey: QueryKey)=>{
    const request=useRequest()
    return useMutation(
        (params:coupon)=>
        request(
            '/back/vip/coupon',
            {
                method:'delete',
                data:{
                    coupon_id:params.coupon_id
                }
            }
        ),useEditConfig(queryKey,'coupon_id')
    )
}