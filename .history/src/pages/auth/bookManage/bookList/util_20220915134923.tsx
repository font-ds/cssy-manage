import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

const getBookList=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/book')
}

export const useGetBookList=()=>{
    return useQuery(['vipmanage','booklist'],async ()=>{
        const res=await getBookList()
        return res.data
    })
}

