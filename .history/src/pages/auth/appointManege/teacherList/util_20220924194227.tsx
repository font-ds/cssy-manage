import {useQuery,QueryKey,useMutation} from '@tanstack/react-query';
import {useEditConfig,useDeleteConfig} from '../../../../utils/use-optimistic-options'
import {request} from '../../../../utils/http';
import {teacherList} from '../../../../type/type'


// 获取导读师列表
const getTeacherList=(page:any,state:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/tutor?limit=10&page=${page}&state=${state}`)
}

export const useGetTeacherList=(page:any,state:any)=>{
    return useQuery(['appointmanage','teacherlist',page,state],async()=>{
        let res=await getTeacherList(page,state)
         // 同时返回table表格pagenation设置
         let data={pagination:{totle:res.page*20,pageSize:20,current:page+1},data:res.data}
         return data
    })
}

// 删除导读师
export const useDelTeacher=(queryKey:QueryKey)=>{
    return useMutation((params:teacherList)=>{
        return request('http://127.0.0.1:4523/m1/1513755-0-default/back/tutor?tutor_id='+params.tutor_id)
    },useDeleteConfig(queryKey,'tutor_id'))
}

// 改变导读师上下班
export const useChangeTeacher=(queryKey:QueryKey)=>{
    return useMutation((params:teacherList)=>{
        return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/tutor?tutor_id=${params.tutor_id}&to_state=${params.to_state}`,
        {method:'put'})
    },useEditConfig(queryKey,'tutor_id'))
}