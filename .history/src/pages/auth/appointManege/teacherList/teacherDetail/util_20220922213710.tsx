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
    },useEditConfig(queryKey,'tutor_id'))
}

// 修改上下班时间
export const changeOnlineTime=(params:changeTimeConfig)=>{
    return request(
        'http://127.0.0.1:4523/m1/1513755-0-default/back/tutor/period',
        {
            method:'put',
        }
    )
}

// 右侧时间选择
// 返回周几
const getDay=(day:number)=>{
    switch(day){
     case 0:
         return 'SUN'
     case 1:
         return 'MON'
     case 2:
         return 'TUE'
     case 3:
         return 'WED'
     case 4:
         return 'THU'
     case 5:
         return 'FRI'
     case 6:
         return 'SAT'
    }
 }

 interface currentDayConfig{
    time?:string,
    detailTime?:string,
    week?:string,
    day?:string|number
 }
// 返回七天日期
export const getTime=(timer:any)=>{
    let arr=[]
    for(let i=0;i<7;i++){
        let currentDay:currentDayConfig={}
        let time=new Date(timer+24*3600*1000*i)
        currentDay.time=`${time.getFullYear()}/${time.getMonth()}/${time.getDate()}`
        currentDay.detailTime=`${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日`
        currentDay.week=getDay(time.getDay())
        if(i==0) currentDay.day='今天'
        else if(i==1) currentDay.day='明天'
        else if(i==2) currentDay.day='后天'
        else currentDay.day=time.getDate()+"号"
        arr.push(currentDay)
    }
    console.log(arr)
    return arr
}