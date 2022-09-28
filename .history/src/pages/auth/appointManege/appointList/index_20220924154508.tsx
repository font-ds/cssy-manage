import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps,Popconfirm, message} from 'antd'
import {useGetAppointList,useChangeAppoint} from './util';
import {appointListRecord} from '../../../../type/type';

export default function Index() {

    // 分页
    const [page,setPage]=useState(0)
    // 搜索关键字
    const [keyword,setKeyword]=useState<string>('')
    // 搜索分类
    const [searchClass,setSearchClass]=useState('')
  // 展示类型
  const {isLoading,data}=useGetAppointList(page,keyword,searchClass)
  // 修改状态
  const {mutateAsync:changeAppoint}=useChangeAppoint(['appointmanage','appointlist',page,keyword,searchClass])
  const changeAppointBtn=(reserve_id:string,state:number)=>{
    changeAppoint({reserve_id,state}).then(res=>{
      let messageKey=state?'到馆操作成功':'取消预约成功'
      message.success(messageKey)
    })
  }
  return (
  <>
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
                      onConfirm={()=>changeAppointBtn(value.reserve_id,1)}
                      okText="确认"
                      cancelText="取消"
                    >
                        <Button type='link' >到馆完成</Button>
                    </Popconfirm>
                    <Popconfirm
                      placement="topRight"
                      title={'是否确认取消预约'}
                      onConfirm={()=>changeAppointBtn(value.reserve_id,0)}
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
