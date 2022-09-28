import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {useDeleteConfig} from '../../../../utils/use-optimistic-options'
import {useRequest} from '../../../../utils/http';
import {book} from '../../../../type/type'


// 获取图书列表
export const useGetBookList=(page:any,keyword:any)=>{
    const request=useRequest()
    return useQuery(['bookmanage','booklist',page,keyword],async ()=>{
        const res=await request(`http://127.0.0.1:4523/m1/1513755-0-default/back/book?page=${page}&limit=20&keyword=${keyword}`)
        let data={pagination:{totle:res.page*20,pageSize:20},data:res.data}
        return data
    })
}

// 删除图书
export const useDelBook=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:book)=>
        request(`http://127.0.0.1:4523/m1/1513755-0-default/back/book?book_id=${params.id}`,{method:'delete'}),
        useDeleteConfig(queryKey,'id')
    )
}