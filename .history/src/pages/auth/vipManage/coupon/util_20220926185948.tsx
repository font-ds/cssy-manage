import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {useRequest} from '../../../../utils/http';
import {useEditConfig} from '../../../../utils/use-optimistic-options';
import {couponRecord} from '../../../../././type/type';


// 获取优惠券记录
export const useGetCouponRecord=(page:number,keyword:any,type:any)=>{
    const request=useRequest()
    return useQuery(['vipmanage','couponRecord',page,keyword,type],async ()=>{
        const res=await request(`/back/vip/issue?page=${page}&limit=20&keyword=${keyword}&type=${type}`)
        let data={pagination:{totle:res.page*20,pageSize:20},data:res.data}
        return data
    })
}

// 使用优惠券
export const useCoupon=(queryKey: QueryKey)=>{
    const request=useRequest()
    return useMutation(
        (params:couponRecord)=>
        request(
            '/back/vip/coupon',
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