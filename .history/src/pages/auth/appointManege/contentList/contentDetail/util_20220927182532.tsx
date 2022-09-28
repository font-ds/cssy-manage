import {useQuery,useMutation,QueryKey} from '@tanstack/react-query'
import {addContent} from '../../../../../type/type'
import {useRequest} from '../../../../../utils/http'
import { useEditConfig } from '../../../../../utils/use-optimistic-options'

// 修改内容
export const useEditContent=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:addContent)=>{
        return request(`/back/reserve/feature`,
            {method:'put',data:params}
        )
    },useEditConfig(queryKey,'id'))
}