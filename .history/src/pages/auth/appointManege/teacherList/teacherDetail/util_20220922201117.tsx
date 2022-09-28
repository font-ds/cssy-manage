import {useMutation,QueryKey} from '@tanstack/react-query'
import {useEditConfig} from '../../../../../utils/use-optimistic-options'
import {request} from '../../../../../utils/http'
import {editTeacherConfig,changeTimeConfig} from '../../../../../type/type'

// 修改导读师信息
export const useEditTeacher=(queryKey:QueryKey)=>{
    return useMutation((params:editTeacherConfig)=>{
        return request(
            'http://127.0.0.1:4523/m1/1513755-0-default/back/tutor',
            {
                method:'put',
                data:params
            }
        )
    })
}

// 修改上下班时间
export const changeOnlineTime=(params:changeTimeConfig)=>{
    return request('http://127.0.0.1:4523/m1/1513755-0-default/back/tutor/period')
}