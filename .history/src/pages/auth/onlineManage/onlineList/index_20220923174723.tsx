import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps,Popconfirm} from 'antd'
import {useNavigate} from 'react-router-dom';
import {onlineList} from '../../../../type/type';
import {useGetVipList} from './util';

export default function Index() {
  // 分页
  const [page,setPage]=useState(0)
  const navigate=useNavigate()
  const {isLoading,data}=useGetVipList(page)
  // 删除用户
  const confirmDel=(value:onlineList)=>{}
  return (
  <>
    <Button onClick={()=>navigate('add')}>新增会员</Button>
    <Divider></Divider>
    <Table
        loading={isLoading}
        pagination={data?.pagination}
        size='small'
        rowKey={"video_id"}
        columns={[
          {
            title: "电子图书ID",
            align:'center',
            dataIndex: "video_id",
          },
          {
            title: "电子图书名称",
            dataIndex: "title",
            align:'center',
          },
        //   {
        //     title: "修改日期",
        //     dataIndex: "power",
        //     align:'center',
        //   },
          {
            title: "图书状态",
            align:'center',
            render(value:onlineList){
                return <span>{value.state?"已下架":"已上架"}</span>
            }
          },
          {
            title: "操作",
            align:'center',
            render(value:onlineList) {
              return (
                <>
                  <Button type='link' onClick={() => {navigate('detail',{state:{...value}})}}>
                    详情
                  </Button>
                  <Popconfirm
                      placement="topRight"
                      title={'是否删除书籍'}
                      onConfirm={()=>confirmDel(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                    <Button type='link' danger>删除</Button>
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
