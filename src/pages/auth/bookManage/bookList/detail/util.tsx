import {useMutation,QueryKey} from '@tanstack/react-query'
import {useEditConfig} from '../../../../../utils/use-optimistic-options'
import {useRequest} from '../../../../../utils/http'
import {book} from '../../../../../type/type'

// 修改图书
export const useEditBook=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:book)=>
        request(
            '/back/book',
            {
                method:'put',
                data:params
            }
        ),useEditConfig(queryKey,'book_id'))
}