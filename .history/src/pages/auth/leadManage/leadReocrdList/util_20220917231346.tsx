import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

// 获取记录
const getLeadRecord=(page:any)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/borrow?query='+page)
}

export const useGetLeadRecordAll=(page:any)=>{
    return useQuery(['leadmanage','leadrecordlist'],async ()=>{
        let res=await getLeadRecord(page)
        return res.data
    })
}