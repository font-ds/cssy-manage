import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import {request} from '../../../../utils/http';
import { useEditConfig } from '../../../../utils/use-optimistic-options';

// 获取所有预约
const getAppointList=(page:any,keyword:any,searchClass:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/reserve?page=${page}&limit=20`)
}

export const useGetAppointList=(page:any,keyword:any,searchClass:any)=>{
    return useQuery(['appointmanage','appointlist',page,keyword,searchClass],async ()=>{
        const res=await getAppointList(page,keyword,searchClass)
        let data={pagination:{totle:res.page*20,pageSize:20,current:page+1},data:res.data}
        return data
    },{ keepPreviousData : true })
}

// 修改预约状态
export const useChangeAppoint=(queryKey:QueryKey)=>{
    return useMutation((params:{reserve_id:string,state:number})=>{
        return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/reserve?reserve_id=${reserve_id}&state=${state}`,{method:'put'})
    },useEditConfig(queryKey,'reserve_id'))
}