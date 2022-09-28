import {useMutation,QueryKey} from '@tanstack/react-query';
import {request} from '../../../../../utils/http';
import {addTeacherConfig} from '../../../../../type/type';
import {useAddConfig} from '../../../../../utils/use-optimistic-options';

// 新增导读师
export const useAddTeacher=(queryKey:QueryKey)=>{
    return useMutation((params:addTeacherConfig)=>
        request('http://127.0.0.1:4523/m1/1513755-0-default/back/tutor',
        {
            method:'post',
            data:params
        }
        ),useAddConfig(queryKey)
    )
}