import {useQuery,useMutation,QueryKey} from '@tanstack/react-query';
import { onlineList } from '../../../../type/type';
import {useRequest} from '../../../../utils/http';
import { useDeleteConfig } from '../../../../utils/use-optimistic-options';


// 获取视频列表
export const useGetOnlineList=(page:any)=>{
    const request=useRequest()
    return useQuery(['onlinemanage','onlinelist',page],async ()=>{
        const res=await  request(`http://127.0.0.1:4523/m1/1513755-0-default/back/video?limit=20&page=${page}`)
        let data={pagination:{totle:res.page*20,pageSize:20},data:res.data}
        return data
    },{ keepPreviousData : true })
}

// 删除某个视频
export const useDelVedio=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:onlineList)=>{
        return request('http://127.0.0.1:4523/m1/1513755-0-default/back/video?video_id='+params.video_id,{method:'delete'})
    },useDeleteConfig(queryKey,'video_id'))
}