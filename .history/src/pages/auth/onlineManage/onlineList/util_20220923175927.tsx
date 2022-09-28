import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

const getOnlineList=(page:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/video?limit=20&page=${page}`)
}

export const useGetOnlineList=(page:any)=>{
    return useQuery(['onlinemanage','onlinelist',page],async ()=>{
        const res=await getOnlineList(page)
        let data={pagination:{totle:res.page*20,pageSize:20},data:res.data}
        return data
    },{ keepPreviousData : true })
}
