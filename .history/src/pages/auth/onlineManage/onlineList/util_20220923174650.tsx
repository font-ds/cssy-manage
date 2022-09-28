import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

const getVipList=(page:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/video?limit=20&page=${page}`)
}

export const useGetVipList=(page:any)=>{
    return useQuery(['vipmanage','viplist',page],async ()=>{
        const res=await getVipList(page)
        let data={pagination:{totle:res.page*10,pageSize:10},data:res.data}
        return data
    },{ keepPreviousData : true })
}
