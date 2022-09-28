import {useDispatch,useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../store/store'
import qs from 'qs'
import {addStringAsync,addString,lowString} from '../store/test'
import {useQuery,useMutation} from '@tanstack/react-query'
import {getMessage,add} from '../utils/index'
import {useEditConfig} from '../utils/use-optimistic-options'

export default function Index() {

    const dispatch=useDispatch<AppDispatch>()
    const text=useSelector((state:RootState)=>state.test.text)
    const {data} = useQuery(['user','getMessage'],async()=>{
        const {data}=await getMessage()
        return data
    })
    // console.log(data)
    const {mutateAsync:editFunc}=useMutation(async ()=>{
      const data=await add()
      console.log('edit',data)
    },useEditConfig(['user','getMessage']))


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
    <div onClick={editFunc}>修改</div>

    {
      JSON.stringify(data)
    }
  </>
  )
}
