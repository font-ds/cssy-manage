import {useMutation} from '@tanstack/react-query'
import {useRequest,request} from '../../../../utils/http'
import {leadBookParams} from '../../../../type/type'

// 获取单本图书信息
export const getOneBook=(book_id:string)=>{
    const token = localStorage.getItem('token')
    return request('/back/book/one?book_id='+book_id,
    {token:token as string})
}

// 借阅
export const useLeadOneBook=()=>{
    const request=useRequest()
    return useMutation((params:leadBookParams)=>{
        return request(
            `/back/borrow?book_id=${params.book_id}&phone=${params.phone}&week=${params.week}`,
            {
                method:'post',
            }
        )
    })
}