import {useQuery,useMutation,QueryKey} from '@tanstack/react-query'
import {contentList} from '../../../../../type/type'
import {request} from '../../../../../utils/http'
import { useEditConfig } from '../../../../../utils/use-optimistic-options'

// 修改内容
export const useEditContent=(queryKey:QueryKey)=>{
    return useMutation((params:contentList)=>{
        return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/reserve/feature?page=${page}&limit=20&state=${state}`,
            {method:'put'}
        )
    },useEditConfig(queryKey,'id'))
}