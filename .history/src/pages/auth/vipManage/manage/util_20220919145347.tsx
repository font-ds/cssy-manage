import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

const getVipList=(page:any,state:any)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip?page=${page}&state=${state}&limit=10')
}

export const useGetVipList=(page:any,state:any)=>{
    return useQuery(['vipmanage','viplist',page,state],async ()=>{
        const res=await getVipList(page,state)
        let data={pagination:{totle:res.page*10,pageSize:10,current:page+1},data:res.data}
        return data
    },{ keepPreviousData : true })
}
