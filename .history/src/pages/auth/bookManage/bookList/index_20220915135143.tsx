import React from 'react'
import {Table,Button,Divider} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetBookList} from './util';

export default function Index() {
  const navigate=useNavigate()
  const {isLoading,data:users}=useGetBookList()
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
            title: "书籍ID",
            align:'center',
            dataIndex: "vip_id",
          },
          {
            title: "书籍名称",
            dataIndex: "vip_name",
            align:'center',
          },
          {
            title: "出版社",
            dataIndex: "power",
            align:'center',
          },
          {
            title: "书籍编辑时间",
            dataIndex: "expired_date",
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
