import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

const getAppointList=(page:any,keyword:any,searchClass:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/reserve`)
}

export const useGetAppointList=(page:any,keyword:any,searchClass:any)=>{
    return useQuery(['appointmanage','appointlist',page,keyword,searchClass],async ()=>{
        const res=await getAppointList(page,keyword,searchClass)
        let data={pagination:{totle:res.page*10,pageSize:10},data:res.data}
        return data
    },{ keepPreviousData : true })
}
