import {useQuery,useMutation} from '@tanstack/react-query'
import {useAddConfig} from '../../../../utils/use-optimistic-options'
import {request} from '../../../../utils/http'
import {leadBookParams} from '../../../../type/type'

// 获取单本图书信息
export const getOneBook=(book_id:string)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/book/one?book_id='+book_id)
}

// 借阅
export const useLeadOneBook=()=>{
    return useMutation((params:leadBookParams)=>{
        return request(
            `http://127.0.0.1:4523/m1/1513755-0-default/back/borrow?book_id=${params.book_id}&phone=${params.phone}&week=${params.week}`,
            {
                method:'post',
            }
        )
    })
}