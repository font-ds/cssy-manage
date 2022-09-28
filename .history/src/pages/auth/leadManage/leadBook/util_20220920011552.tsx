import {useQuery,useMutation} from '@tanstack/react-query'
import {useAddConfig} from '../../../../utils/use-optimistic-options'
import {request} from '../../../../utils/http'
import {bookLeadRecord} from '../../../../type/type'

// 获取单本图书信息
export const getOneBook=(book_id:string)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/book/one?book_id='+book_id)
}

// 借阅
export const useLeadOneBook=()=>{
    return useMutation((params:any)=>{
        let data={
            book_id:params.borrow_id,
            phone:params.phone,
            week:params.borrow_date
        }
        return request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/borrow',
            {
                method:'post',
                data
            }
        )
    })
}