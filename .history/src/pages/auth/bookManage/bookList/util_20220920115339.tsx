import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {useDeleteConfig} from '../../../../utils/use-optimistic-options'
import {request} from '../../../../utils/http';
import {book} from '../../../../type/type'


// 获取图书列表
const getBookList=(page:any)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/book?page='+1)
}

export const useGetBookList=(page:any)=>{
    return useQuery(['bookmanage','booklist',page],async ()=>{
        const res=await getBookList(page)
        return res.data
    })
}

// 删除图书
export const useDelBook=(queryKey:QueryKey)=>{
    return useMutation((params:book)=>
        request(`http://127.0.0.1:4523/m1/1513755-0-default/back/book?book_id=${params.id}`,{method:'delete'}),
        useDeleteConfig(queryKey,'id')
    )
}