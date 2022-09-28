import {useQuery} from '@tanstack/react-query';
import { useRequest} from '../../../../../../utils/http';

// 获取图书列表

export const useGetBookLeadRecord=(props:{id:string})=>{
    const request=useRequest()
    return useQuery(['bookmanage','bookleadrecord'],async ()=>{
        const res=await request('http://127.0.0.1:4523/m1/1513755-0-default/back/book/borrow?book_id='+props.id)
        return res.data
    })
}