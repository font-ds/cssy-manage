import {useRequest} from '../../../../../utils/http'
import {useAddConfig} from '../../../../../utils/use-optimistic-options'
import {useMutation,QueryKey} from '@tanstack/react-query'
import {addCoupon} from '../../../../../type/type'

export const useAddCoupon=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:addCoupon)=>{
        return request(
            '/back/vip/coupon/new',
            {
                method:'post',
                data:params
            }
        )
    },useAddConfig(queryKey))
}