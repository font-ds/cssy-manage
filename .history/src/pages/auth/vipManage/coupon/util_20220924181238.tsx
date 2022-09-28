import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {request} from '../../../../utils/http';
import {useEditConfig} from '../../../../utils/use-optimistic-options';
import {couponRecord} from '../../../../././type/type';

// 获取优惠券记录
const getCouponRecord=(page:number,keyword:string,type:number)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/vip/issue?page=${page}&limit=20&keyword=${keyword}&type=${type}`)
}

export const useGetCouponRecord=(page:number,keyword:string,type:number)=>{
    return useQuery(['vipmanage','couponRecord',page,keyword,type],async ()=>{
        const res=await getCouponRecord(page,keyword,type)
        let data={pagination:{totle:res.page*20,pageSize:20},data:res.data}
        return data
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