import React from 'react'
import {Table} from 'antd';
import {bookLeadRecord} from '../../../../../../type/type';
import {useGetBookLeadRecord} from './util';

export default function Index(props:{id:string}) {

    const {isLoading,data:leadList}=useGetBookLeadRecord(props)

  return (
    <Table
        loading={isLoading}
        // pagination={pagination}
        size='small'
        pagination={{pageSize:5}}
        rowKey={"borrow_id"}
        columns={[
            {
              title: "借阅记录ID",
              align:'center',
              dataIndex: "borrow_id",
            },
            {
              title: "借阅会员",
              dataIndex: "user_name",
              align:'center',
            },
            {
              title: "会员手机",
              dataIndex: "phone",
              align:'center',
            },
            {
              title: "借阅书籍",
              dataIndex: "title",
              align:'center',
            },
            {
              title: "借阅时间",
              dataIndex: "borrow_date",
              align:'center',
            },
            {
                title: "书籍状态",
                align:'center',
                render(value:bookLeadRecord){
                    return <span>
                        {value.state?value.state=='1'?"已完成":"已取消":"已预约"}
                    </span>
                }
            }
          ]}
        dataSource={leadList}
        
    ></Table>
  )
}
