import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {useDeleteConfig} from '../../../../utils/use-optimistic-options'
import {request} from '../../../../utils/http';
import {book} from '../../../../type/type'


// 获取图书列表
const getBookList=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/book')
}

export const useGetBookList=()=>{
    return useQuery(['bookmanage','booklist'],async ()=>{
        const res=await getBookList()
        return res.data
    })
}

// 删除图书
export const useDelBook=(queryKey:QueryKey)=>{
    return useMutation((params:book)=>
        request(`http://127.0.0.1:4523/m1/1513755-0-default/back/book?book_id=${params.id}`)
    ),useDeleteConfig(['bookmanage','booklist'],)
}