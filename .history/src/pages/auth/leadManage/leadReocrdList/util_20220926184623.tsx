import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {useRequest} from '../../../../utils/http';
import {useEditConfig} from '../../../../utils/use-optimistic-options';
import {bookLeadRecord} from '../../../../type/type';

// 获取记录
// 分页并区分状态
const getLeadRecord=(page:any,state:any,keyword:any,type:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/borrow?page=${page}&state=${state}&limit=20`)
}

export const useGetLeadRecordAll=(page:any,state:any,keyword:any,type:any)=>{
    const request=useRequest()
    return useQuery(['leadmanage','leadrecordlist',page,state,keyword,type],async ()=>{
        let res=await getLeadRecord(page,state,keyword,type)
        // 同时返回table表格pagenation设置
        let data={pagination:{totle:res.page*20,pageSize:20,current:page+1},data:res.data}
        return data
    })
}

// 取走或归还图书
export const useChangeLead=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:bookLeadRecord)=>{
        let state
        return request(
            `http://127.0.0.1:4523/m1/1513755-0-default/back/borrow?borrow_id=${params.borrow_id}&state=${state}`,
            {method:'put'}
        )
    },useEditConfig(queryKey,'borrow_id'))
}

// 取消借阅
export const useConcelLead=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:bookLeadRecord)=>{
        let state
        return request(
            `http://127.0.0.1:4523/m1/1513755-0-default/back/borrow?borrow_id=${params.borrow_id}&state=${state}`,
            {method:'delete'}
        )
    },useEditConfig(queryKey,'borrow_id'))
}

// 延长借阅
interface bookLonger extends bookLeadRecord{
    extension:string
}

export const useLongLead=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:bookLonger)=>{
        let state
        return request(
            `http://127.0.0.1:4523/m1/1513755-0-default/back/borrow/extend?borrow_id=${params.borrow_id}&state=${state}`,
            {method:'put'}
        )
    },useEditConfig(queryKey,'borrow_id'))
}