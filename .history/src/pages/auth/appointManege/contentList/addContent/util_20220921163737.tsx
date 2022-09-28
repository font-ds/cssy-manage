import {addContent} from '../../../../../type/type'
import {request} from '../../../../../utils/http'
import {useAddConfig} from '../../../../../utils/use-optimistic-options'
import {useMutation,QueryKey} from '@tanstack/react-query'

export const useAddContent=(queryKey:QueryKey)=>{
    return useMutation((params:addContent)=>{
        return request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/reserve',
            {
                method:'post',
                data:params
            })
    },useAddConfig(queryKey))
}