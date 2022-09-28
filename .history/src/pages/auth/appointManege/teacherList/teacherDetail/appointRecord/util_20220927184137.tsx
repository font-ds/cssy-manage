import {useQuery} from '@tanstack/react-query';
import {useRequest} from '../../../../../../utils/http';

// 获取预约记录
export const useGetAppoint=(tutor_id:any)=>{
    const request=useRequest()
    return useQuery(['appoint','teacher','appointList',tutor_id],async ()=>{
        const res=await request('/back/tutor/reserve?tutor_id='+tutor_id)
        let data={pagination:{totle:res.page*20,pageSize:20},data:res.data}
        return data
    })
}