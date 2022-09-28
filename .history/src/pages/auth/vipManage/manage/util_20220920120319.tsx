import {useQuery} from '@tanstack/react-query';
import {request} from '../../../../utils/http';

const getVipList=(state:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/vip?&state=${state}`)
}

export const useGetVipList=(state:any,power:any,page:any)=>{
    return useQuery(['vipmanage','viplist',state,power,page],async ()=>{
        const res=await getVipList(state)
        let data={pagination:{totle:res.page*10,pageSize:10},data:res.data}
        return data
    },{ keepPreviousData : true })
}
