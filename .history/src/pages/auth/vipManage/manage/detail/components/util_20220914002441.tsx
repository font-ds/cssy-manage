import {useQuery} from '@tanstack/react-query';

import {request} from '../../../../../../utils/http';

const getBookLead=()=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/borrow')
}

const getAppoint=(phone:string)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip/reserve?phone='+phone)
}

export const useGetBookLead=()=>{
    return useQuery(['vipmanage','detail','booklead'],async ()=>{
        const res=await getBookLead()
        return res.data
    })
}

export const useGetAppoint=(props:any)=>{
    const phone = props.phone
    return useQuery(['vipmanage','detail','appoint'],async ()=>{
        const res=await getAppoint(phone)
        return res.data
    })
}