import {useQuery} from '@tanstack/react-query';

import {request} from '../../../../../../utils/http';

// 获取书籍借阅
const getBookLead=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/borrow')
}

// 获取预约记录
const getAppoint=(phone:string)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/reserve?phone='+phone)
}

// 获取书籍借阅
export const useGetBookLead=(props:any)=>{
    const phone=props.phone
    return useQuery(['vipmanage','detail','booklead',phone],async ()=>{
        const res=await getBookLead()
        return res.data
    })
}

// 获取预约记录
export const useGetAppoint=(props:any)=>{
    const phone = props.phone
    return useQuery(['vipmanage','detail','appoint',phone],async ()=>{
        const res=await getAppoint(phone)
        return res.data
    })
}