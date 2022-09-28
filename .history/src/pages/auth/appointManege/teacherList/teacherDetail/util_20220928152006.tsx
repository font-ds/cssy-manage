import {useMutation,QueryKey} from '@tanstack/react-query'
import {useEditConfig} from '../../../../../utils/use-optimistic-options'
import {useRequest,request} from '../../../../../utils/http'
import {editTeacherConfig,changeTimeConfig} from '../../../../../type/type'

// 修改导读师信息
export const useEditTeacher=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:editTeacherConfig)=>{
        return request(
            '/back/tutor',
            {
                method:'put',
                data:params
            }
        )
    },useEditConfig(queryKey,'tutor_id'))
}

// 修改上下班时间
export const changeOnlineTime=(params:changeTimeConfig)=>{
    const token = localStorage.getItem('token')
    return request(
        `/back/tutor/period?date=${params.date}&period=${params.period}&to_state=${params.to_state}&tutor_id=${params.tutor_id}`,
        {
            method:'put',
            token:token as string
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
// 获取所选日期的yyyy-mm-dd格式日期
export const formDataTime=(index:any)=>{
    let timer=new Date().getTime()
    let checkedTimer=new Date(timer+24*3600*1000*index)
    let currentMonth=checkedTimer.getMonth()+1
    let currentDay=checkedTimer.getDate()
    let month=currentMonth<10?'0'+currentMonth:currentMonth
    let day=currentDay<10?'0'+currentDay:currentDay
    return `${checkedTimer.getFullYear()}/${month}/${day}`
}