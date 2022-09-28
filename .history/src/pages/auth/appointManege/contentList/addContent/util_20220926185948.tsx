import {addContent} from '../../../../../type/type'
import {request} from '../../../../../utils/http'
import {useAddConfig} from '../../../../../utils/use-optimistic-options'
import {useMutation,QueryKey} from '@tanstack/react-query'

export const useAddContent=(queryKey:QueryKey)=>{
    return useMutation((params:addContent)=>{
        return request(
            '/back/reserve',
            {
                method:'post',
                data:params
            })
    },useAddConfig(queryKey))
}