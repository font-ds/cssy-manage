import {useQuery,useMutation,QueryKey} from '@tanstack/react-query'
import {useAddConfig} from '../../../../utils/use-optimistic-options'
import {request} from '../../../../utils/http'
import {book,bookLeadRecord} from '../../../../type/type'

// 获取单本图书信息
const getOneBook=(book_id:string)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/book/one?book_id='+book_id)
}

const useGetOneBook=(book_id:string)=>{
    return useQuery(['leadmanage','onebook'],async()=>{
        let res=await getOneBook(book_id)
        return res.data
    })
}