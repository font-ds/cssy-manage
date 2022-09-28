import React from 'react'
import {Table} from 'antd';
import {bookLead} from '../../../../../../type/type';

export default function leadTable() {

    const columns=[
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
            render(value:bookLead){
                return <span>
                    {value.state?value.state==='1'?"借阅中":value.state==='2'?"已完成":"已逾期":"待取书"}
                </span>
            }
        }
      ]

  return (
    <Table
    ></Table>
  )
}
