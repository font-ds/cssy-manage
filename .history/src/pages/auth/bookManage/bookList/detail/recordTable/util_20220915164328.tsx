import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../../../utils/http';

// 获取图书列表
const getBookLeadRecord=(id:string)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/book?book_id='+id)
}

export const useGetBookLeadRecord=(props:{id:string})=>{
    return useQuery(['bookmanage','booklist'],async ()=>{
        const res=await getBookLeadRecord(props.id)
        return res.data
    })
}