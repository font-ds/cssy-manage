import {useQuery,useMutation,QueryKey} from '@tanstack/react-query'
import {addContent} from '../../../../../type/type'
import {request} from '../../../../../utils/http'
import { useEditConfig } from '../../../../../utils/use-optimistic-options'

// 修改内容
export const useEditContent=(queryKey:QueryKey)=>{
    return useMutation((params:addContent)=>{
        return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/reserve/feature`,
            {method:'put',data:params}
        )
    },useEditConfig(queryKey,'id'))
}