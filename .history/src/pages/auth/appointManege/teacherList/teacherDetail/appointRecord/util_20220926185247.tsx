import {useQuery} from '@tanstack/react-query';
import {useRequest} from '../../../../../../utils/http';

// 获取预约记录
export const useGetAppoint=(tutor_id:any)=>{
    const request=useRequest()
    return useQuery(['appoint','teacher','appointList',tutor_id],async ()=>{
        const res=await request('http://127.0.0.1:4523/m1/1513755-0-default/back/tutor/reserve?tutor_id='+tutor_id)
        return res.data
    })
}