import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {request} from '../../../../utils/http';
import {useEditConfig} from '../../../../utils/use-optimistic-options';
import {bookLeadRecord} from '../../../../type/type';

// 获取记录
const getLeadRecord=(page:any,state:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/borrow?page=${page}&state=${state}&limit=10`)
}

export const useGetLeadRecordAll=(page:any,state:any)=>{
    return useQuery(['leadmanage','leadrecordlist',page,state],async ()=>{
        let res=await getLeadRecord(page,state)
        let data={pagination:{totle:res.page*10,pageSize:1,current:1},data:res.data}
        return data
    },{ keepPreviousData : true })
}

// 取走或归还图书
export const useChangeLead=(queryKey:QueryKey)=>{
    return useMutation((params:bookLeadRecord)=>{
        let state
        return request(
            `http://127.0.0.1:4523/m1/1513755-0-default/back/borrow?borrow_id=${params.borrow_id}&state=${state}`,
            {method:'put'}
        )
    },useEditConfig(queryKey,'borrow_id'))
}