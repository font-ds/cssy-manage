import {useMutation,QueryKey} from '@tanstack/react-query'
import {useEditConfig} from '../../../../../utils/use-optimistic-options'
import {request} from '../../../../../utils/http'
import {book} from '../../../../../type/type'

// 修改图书
export const useEditBook=(queryKey:QueryKey)=>{
    return useMutation((params:book)=>
        request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/book',
            {
                method:'put',
                data:params
            }
        ),useEditConfig(queryKey,'book_id'))
}