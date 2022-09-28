import {useQuery,QueryKey,useMutation} from '@tanstack/react-query';
import {useEditConfig,useDeleteConfig} from '../../../../utils/use-optimistic-options'
import {request} from '../../../../utils/http';
import {teacherList} from '../../../../type/type'

const getTeacherList=(page:any,state:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/tutor?limit=10&page=${page}&state=${state}`)
}

export const useGetTeacherList=(page:any,state:any)=>{
    return useQuery(['appointmanage','teacherlist',page,state],async()=>{
        let res=await getTeacherList(page,state)
         // 同时返回table表格pagenation设置
         let data={pagination:{totle:res.page*10,pageSize:10},data:res.data}
         return data
    })
}