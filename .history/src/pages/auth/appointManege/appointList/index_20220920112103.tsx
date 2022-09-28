import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetAppointList} from './util';

export default function Index() {

    // 分页
    const [page,setPage]=useState(0)
    // 搜索关键字
    const [keyword,setKeyword]=useState<string>('')
    // 搜索分类
    const [searchClass,setSearchClass]=useState('')
  // 展示类型
  const navigate=useNavigate()
  const {isLoading,data}=useGetAppointList(page,keyword,searchClass)
  return (
  <>
    <Button onClick={()=>navigate('add')}>新增会员</Button>
    <Divider></Divider>
    <Table
        loading={isLoading}
        pagination={data?.pagination}
        size='small'
        rowKey={"vip_id"}
        columns={[
          {
            title: "会员ID",
            align:'center',
            dataIndex: "vip_id",
          },
          {
            title: "会员姓名",
            dataIndex: "vip_name",
            align:'center',
          },
          {
            title: "会员身份",
            dataIndex: "power",
            align:'center',
          },
          {
            title: "身份到期时间",
            dataIndex: "expired_date",
            align:'center',
          },
          {
            title: "会员手机",
            dataIndex: "phone",
            align:'center',
          },
          {
            title: "操作",
            align:'center',
            render(value) {
              return (
                <>
                  <Button type='link' onClick={() => {navigate('detail',{state:{...value,state}})}}>
                    详情
                  </Button>
                  <Button type='link' danger onClick={() => {console.log('删除',value)}}>
                    删除
                  </Button>
                </>
              );  
            },
          },
        ]}
        dataSource={data?.data}

      />
    </>
  )
}
