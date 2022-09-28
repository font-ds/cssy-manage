import {useMutation,QueryKey} from '@tanstack/react-query';
import {useRequest} from '../../../../../utils/http';
import {addTeacherConfig} from '../../../../../type/type';
import {useAddConfig} from '../../../../../utils/use-optimistic-options';

// 新增导读师
export const useAddTeacher=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:addTeacherConfig)=>
        request('/back/tutor',
        {
            method:'post',
            data:params
        }
        ),useAddConfig(queryKey)
    )
}