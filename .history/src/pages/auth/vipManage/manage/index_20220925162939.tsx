import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps,Popconfirm, message} from 'antd'
import {useNavigate} from 'react-router-dom';
import {vipUser} from '../../../../type/type';
import {useGetVipList,useDelVip} from './util';

export default function Index() {
  // 展示类型
  const [state,setState]=useState(-1)
  // 搜索
  const [keyword,setKeyword]=useState('')
  // 搜索类型
  const [type,setType]=useState(-1)
  // 分页
  const [page,setPage]=useState(0)
  const navigate=useNavigate()
  const {isLoading,data}=useGetVipList(page,state,keyword,type)
  // 删除用户
  const {mutateAsync:delVip}=useDelVip(['vipmanage','viplist',page,state,keyword,type])
  const confirmDel=(value:vipUser)=>{
    delVip(value).then(res=>{
      message.success('会员删除成功')
    })
  }
  return (
  <>

    <Button onClick={()=>setState(-1)}>所有</Button>
    <Button onClick={()=>setState(0)}>普通用户</Button>
    <Button onClick={()=>setState(1)}>VIP</Button>
    <Button onClick={()=>setState(2)}>SVIP</Button>
    <Button size='small' type='primary' onClick={()=>navigate('add',{state:{state,page}})}>新增会员</Button>
    <Divider style={{marginTop:'0rem'}}></Divider>
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
                  <Button type='link' onClick={() => {navigate('detail',{state:{...value,page,state,keyword,type}})}}>
                    详情
                  </Button>
                  <Popconfirm
                      placement="topRight"
                      title={'是否删除该会员'}
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
