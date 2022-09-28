import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {request} from '../../../../utils/http';
import { useEditConfig } from '../../../../utils/use-optimistic-options';
import {appointListRecord} from '../../../../type/type';


// 获取所有预约
const getAppointList=(page:any,keyword:any,searchClass:any)=>{
    return request(`/back/reserve?page=${page}&limit=20`)
}

export const useGetAppointList=(page:any,keyword:any,searchClass:any)=>{
    return useQuery(['appointmanage','appointlist',page,keyword,searchClass],async ()=>{
        const res=await getAppointList(page,keyword,searchClass)
        let data={pagination:{totle:res.page*20,pageSize:20,current:page+1},data:res.data}
        return data
    },{ keepPreviousData : true })
}

// 修改预约状态
interface appointlist extends appointListRecord{
    changeState:number
}

export const useChangeAppoint=(queryKey:QueryKey)=>{
    return useMutation((params:appointlist)=>{
        return request(`/back/reserve?reserve_id=${params.reserve_id}&state=${params.changeState}`,{method:'put'})
    },useEditConfig(queryKey,'reserve_id'))
}