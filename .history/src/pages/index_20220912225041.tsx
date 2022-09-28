import {useDispatch,useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../store/store'
import {addStringAsync,addString,lowString} from '../store/test'
import {useQuery} from '@tanstack/react-query'
import {getMessage} from '../utils/index'

export default function Index() {

    const dispatch=useDispatch<AppDispatch>()
    const text=useSelector((state:RootState)=>state.test.text)
    const {data} = useQuery(['user','getMessage'],async()=>{
        const {data}=await getMessage()
        // .then(res=>{
        //   console.log('data',res)
        //     return res
        // })
        return data
    })
    console.log(data)
    // console.log(isLoading,data)
    // console.log(data)
    // const queriesData=useQueries({
    //     queries:[
    //         {
    //             queryKey:['user','getMessage'],
    //             queryFn:async()=>{
    //                 return fetch('http://127.0.0.1:777/getMessage').then(async response=>{
    //                     let res=await response.json()
    //                     return res
    //                 })
    //             }
    //         },
    //         {
    //             queryKey:['user','getMessage1'],
    //             queryFn:async()=>{
    //                 return fetch('http://127.0.0.1:777/getMessage').then(async response=>{
    //                     let res=await response.json()
    //                     return res
    //                 })
    //             }
    //         }
    //     ]
    // })

    // console.log(isLoading,isError,data)
    // console.log(queriesData)

  return (<>
  
    {/* {
        isLoading?'加载中...'
        :
        isError?'错误...'
        :null
    }
   */}
    <div>{text}</div>
    <div onClick={()=>dispatch(addStringAsync('123'))}>异步加</div>
    <div onClick={()=>dispatch(addString('+'))}>加</div>
    <div onClick={()=>dispatch(lowString())}>减</div>

    {
      // JSON.stringify(res)
    }
  </>
  )
}
