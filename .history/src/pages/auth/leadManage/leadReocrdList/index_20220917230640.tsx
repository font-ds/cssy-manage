import React from 'react'
import {Table,Button,Divider} from 'antd'
import {useNavigate} from 'react-router-dom';
// import {useGetVipList} from './util';

export default function Index() {
  const navigate=useNavigate()
//   const {isLoading,data:users}=useGetVipList()
  return (
  <>
    <Button onClick={()=>navigate('add')}>新增会员</Button>
    <Divider></Divider>
    <Table
        loading={isLoading}
        // pagination={pagination}
        size='small'
        rowKey={"vip_id"}
        columns={[
          {
            title: "借阅记录ID",
            align:'center',
            dataIndex: "vip_id",
          },
          {
            title: "借阅会员",
            dataIndex: "vip_name",
            align:'center',
          },
          {
            title: "会员手机",
            dataIndex: "power",
            align:'center',
          },
          {
            title: "借阅书籍",
            dataIndex: "expired_date",
            align:'center',
          },
          {
            title: "借阅时间",
            dataIndex: "phone",
            align:'center',
          },
          {
            title: "书籍状态",
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
                    归还图书
                  </Button>
                  <Button type='link' danger onClick={() => {console.log('删除',value)}}>
                    延长借阅
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
