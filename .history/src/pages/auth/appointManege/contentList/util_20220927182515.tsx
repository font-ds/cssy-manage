import {useQuery,useMutation,QueryKey} from '@tanstack/react-query'
import {contentList} from '../../../../type/type'
import {useRequest} from '../../../../utils/http'

// 获取数据
export const useGetContentList=(page:any,state:any)=>{
    const request=useRequest()
    return useQuery(['appointmanage','contentlist',page,state],async()=>{
        let res=await request(`/back/reserve/feature?page=${page}&limit=20&state=${state}`)
        let data={pagination:{totle:res.page*20,pageSize:20,current:page+1},data:res.data}
        return data
    },{ keepPreviousData : true })
}