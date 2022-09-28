import {useQuery} from '@tanstack/react-query';

import {request} from '../../../../../../utils/http';

// 获取预约记录
const getAppoint=(tutor_id:string)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/tutor/reserve?tutor_id='+tutor_id)
}

// 获取预约记录
export const useGetAppoint=(props:any)=>{
    const tutor_id = props.tutor_id
    return useQuery(['appoint','teacher','appointList',tutor_id],async ()=>{
        const res=await getAppoint(tutor_id)
        return res.data
    })
}