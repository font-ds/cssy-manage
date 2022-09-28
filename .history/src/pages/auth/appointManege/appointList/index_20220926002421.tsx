import React,{useState,useRef} from 'react'
import {Table,Button,Divider,PaginationProps,Input,Select,InputRef,Popconfirm, message} from 'antd'
import {useGetAppointList,useChangeAppoint} from './util';
import {appointListRecord} from '../../../../type/type';
import { useNavigate } from 'react-router-dom';

const {Option}=Select
export default function Index() {
    const navigate=useNavigate()
    // 分页
    const [page,setPage]=useState(0)
    // 搜索
    const [keyword,setKeyword]=useState<string|undefined>('')
    // 绑定搜索框
    const InputRef=useRef<InputRef>(null)
    // 搜索分类
    const [searchClass,setSearchClass]=useState('0')
  // 展示类型
  const {isLoading,data}=useGetAppointList(page,keyword,searchClass)
  // 修改状态
  const {mutateAsync:changeAppoint}=useChangeAppoint(['appointmanage','appointlist',page,keyword,searchClass])
  const changeAppointBtn=(value:appointListRecord,changeState:number)=>{
    let data={...value,changeState,state:changeState+''}
    changeAppoint(data).then(res=>{
      let messageKey=changeState==1?'到馆操作成功':'取消预约成功'
      message.success(messageKey)
    })
  }
  return (
  <>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className='type-button'>
        <div className='title'>查找</div>
        <Input.Group className='group' compact>
          <Select defaultValue={searchClass} onChange={(e)=>setSearchClass(e)}>
            <Option value="0">姓名</Option>
            <Option value="1">手机号</Option>
          </Select>
          <Input ref={InputRef} onPressEnter={e=>{setKeyword(e.target.value);setPage(0)}} style={{ width: '45%',height:'2rem' }}  />
          <img onClick={()=>{setKeyword(InputRef?.current?.input?.value);setPage(0)}} src={require('../../../../assets/search.png')} alt='搜索'></img>
        </Input.Group>
      </div>
      <></>
    </div>
    <Divider></Divider>
    <Table
        loading={isLoading}
        pagination={data?.pagination}
        size='small'
        rowKey={"reserve_id"}
        columns={[
          {
            title: "预约记录ID",
            align:'center',
            dataIndex: "reserve_id",
          },
          {
            title: "预约会员",
            dataIndex: "user_name",
            align:'center',
          },
          {
            title: "会员手机",
            dataIndex: 'phone',
            align:'center',
          },
          {
            title: "预约项目",
            align:'center',
            render(value:appointListRecord){
                return <span>{value.type?value.type=='1'?'特色内容':'专业导读师':'功能阅读'}</span>
            }
          },
          {
            title: "预约时间",
            align:'center',
            render(value:appointListRecord){
                return <span>{value.reserve_date} {value.reserve_time}</span>
            }
          },
          {
            title: "预约状态",
            align:'center',
            render(value:appointListRecord){
                return <span>{value.state?value.state=='1'?'已完成':'已取消':'已预约'}</span>
            }
          },
          {
            title: "操作",
            align:'center',
            render(value) {
                if(value.state=='1') return <span>已完成</span>
                else if(value.state=='2') return <span>已取消</span>
                else return (
                <>
                    <Popconfirm
                      placement="topRight"
                      title={'是否确认到馆完成'}
                      onConfirm={()=>changeAppointBtn(value,1)}
                      okText="确认"
                      cancelText="取消"
                    >
                        <Button type='link' >到馆完成</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="topRight"
                      title={'是否确认取消预约'}
                      onConfirm={()=>changeAppointBtn(value,2)}
                      okText="确认"
                      cancelText="取消"
                    >
                        <Button type='link' danger>取消预约</Button>
                    </Popconfirm>

                </>
              );  
            },
          },
        ]}
        dataSource={data?.data}
        onChange={(v:PaginationProps)=>{
            setPage(v.current as number -1)
        }}
      />
    </>
  )
}
