import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps,Popconfirm} from 'antd'
import {useNavigate} from 'react-router-dom';
import {vipUser} from '../../../../type/type';
import {useGetVipList} from './util';

export default function Index() {
  // 展示类型
  const [state,setState]=useState(-1)
  // 分页
  const [page,setPage]=useState(0)
  const navigate=useNavigate()
  const {isLoading,data}=useGetVipList(page,state)
  // 删除用户
  const confirmDel=(value:vipUser)=>{}
  return (
  <>
    <Button onClick={()=>navigate('add',{state:{state,page}})}>新增会员</Button>
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
            render(value:vipUser) {
              return (
                <>
                  <Button type='link' onClick={() => {navigate('detail',{state:{...value,state}})}}>
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
