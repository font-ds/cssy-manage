import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

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
