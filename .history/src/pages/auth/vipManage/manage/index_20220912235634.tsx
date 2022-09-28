import React from 'react'
import {Table,Button} from 'antd'

export default function Index() {
  return (
    <Table
        // loading={isLoading}
        // pagination={pagination}
        rowKey={"id"}
        columns={[
          {
            title: "会员ID",
            dataIndex: "employeeId",
          },
          {
            title: "会员姓名",
            dataIndex: "name",
          },
          {
            title: "会员身份",
            dataIndex: "phoneNum",
          },
          {
            title: "身份到期时间",
            dataIndex: "phoneNum",
          },
          {
            title: "会员手机",
            dataIndex: "phoneNum",
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
        onChange={(v: PaginationProps) => {
          setPagination(v);
        }}
      />
  )
}
