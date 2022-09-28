import {useQuery,QueryKey,useMutation} from '@tanstack/react-query';
import {useEditConfig,useDeleteConfig} from '../../../../utils/use-optimistic-options'
import {useRequest} from '../../../../utils/http';
import {teacherList} from '../../../../type/type'


// 获取导读师列表
export const useGetTeacherList=(page:any,state:any)=>{
    const request=useRequest()
    return useQuery(['appointmanage','teacherlist',page,state],async()=>{
        let res=await request(`/back/tutor?limit=20&page=${page}&state=${state}`)
         // 同时返回table表格pagenation设置
         let data={pagination:{totle:res.page*20,pageSize:20,current:page+1},data:res.data}
         return data
    })
}

// 删除导读师
export const useDelTeacher=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:teacherList)=>{
        return request('/back/tutor?tutor_id='+params.tutor_id,
        {method:'delete'}
        )
    },useDeleteConfig(queryKey,'tutor_id'))
}

// 改变导读师上下班
export const useChangeTeacher=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:teacherList)=>{
        let to_state=params.state==0?1:0
        return request(`/back/tutor/state?tutor_id=${params.tutor_id}&to_state=${to_state}`,
        {method:'put'})
    },useEditConfig(queryKey,'tutor_id'))
}