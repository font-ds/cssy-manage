import React from 'react'
import {Table,Button,Divider} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetVipList} from './util';
import {useAddVip} from './util'

export default function Index() {
  const navigate=useNavigate()
  const {isLoading,data:users}=useGetVipList()
  console.log(isLoading,users)

  const {mutateAsync:addVip}=useAddVip(['vipmessage'])
  const addVipSubmit=()=>{
    addVip({username:'gyf',
      phone:'15824967233',
      identity_number:'12371923712937912379',
      power:1,
      power_expire_date:null})
    .then(res=>{
      console.log(res)
    })
  }

  return (
  <>
    
    <Divider></Divider>
    <Table
        loading={isLoading}
        // pagination={pagination}
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
                  <Button type='link' onClick={() => {navigate('detail',{state:value})}}>
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
        dataSource={users}
        // onChange={(v: PaginationProps) => {
        //   setPagination(v);
        // }}
      />
    </>
  )
}
