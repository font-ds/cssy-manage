import React from 'react'
import {Table,Button} from 'antd'
import {useGetVipList} from './util';

export default function Index() {

  const {isLoading,data:users}=useGetVipList()
  console.log(isLoading,users)

  return (
    <Table
        loading={isLoading}
        // pagination={pagination}
        rowKey={"id"}
        columns={[
          {
            title: "会员ID",
            dataIndex: "vip_id",
          },
          {
            title: "会员姓名",
            dataIndex: "vip_name",
          },
          {
            title: "会员身份",
            dataIndex: "power",
          },
          {
            title: "身份到期时间",
            dataIndex: "expired_date",
          },
          {
            title: "会员手机",
            dataIndex: "phone",
          },
          {
            title: "操作",
            render(value) {
              return (
                <>
                  <Button
                    type='link'
                    onClick={() => {
                      // open(value.employeeId);
                      console.log('详情')
                    }}
                  >
                    详情
                  </Button>
                  <Button
                    type='link'
                    onClick={() => {
                      // open(value.employeeId);
                      console.log('删除')
                    }}
                  >
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
  )
}
