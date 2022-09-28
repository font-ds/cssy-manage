import {useQuery} from '@tanstack/react-query';

import {useRequest} from '../../../../../../utils/http';

// 获取书籍借阅
const getBookLead=()=>{
    return 
}

// 获取预约记录
const getAppoint=(phone:string)=>{
    return 
}

// 获取书籍借阅
export const useGetBookLead=(phone:any)=>{
    const request=useRequest()
    return useQuery(['vipmanage','detail','booklead',phone],async ()=>{
        const res=await request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/borrow')
        return res.data
    })
}

// 获取预约记录
export const useGetAppoint=(phone:any)=>{
    const request=useRequest()
    return useQuery(['vipmanage','detail','appoint',phone],async ()=>{
        const res=await request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/reserve?phone='+phone)
        return res.data
    })
}