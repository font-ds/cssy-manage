import {useQuery} from '@tanstack/react-query';
import {useRequest} from '../../../../../../utils/http';

// 获取预约记录
export const useGetAppoint=(tutor_id:any,page:any)=>{
    const request=useRequest()
    return useQuery(['appoint','teacher','appointList',tutor_id,page],async ()=>{
        const res=await request(`/back/tutor/reserve?tutor_id=${tutor_id}&page=${page}&limit=10`)
        let data={pagination:{totle:res.page*10,pageSize:10},data:res.data}
        return data
    })
}