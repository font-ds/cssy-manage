import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {request} from '../../../../utils/http';
import {useEditConfig} from '../../../../utils/use-optimistic-options';
import {bookLeadRecord} from '../../../../type/type';

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

// 取走或归还图书
export const useChangeLead=(queryKey:QueryKey)=>{
    return useMutation((params:bookLeadRecord)=>{
        let state
        request(
            `http://127.0.0.1:4523/m1/1513755-0-default/back/borrow?borrow_id=${params.borrow_id}&state=${state}`,
            {method:'put'}
        )
    },useEditConfig(queryKey,'borrow_id'))
}