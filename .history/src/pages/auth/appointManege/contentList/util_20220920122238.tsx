import {useQuery,useMutation,QueryKey} from '@tanstack/react-query'
import {contentList} from '../../../../type/type'
import {request} from '../../../../utils/http'

// 获取数据
const getContentList=(page:any,state:any)=>{
    return request(`http://127.0.0.1:4523/m1/1513755-0-default/back/reserve/feature?page=${page}&limit=10&state=${state}`)
}