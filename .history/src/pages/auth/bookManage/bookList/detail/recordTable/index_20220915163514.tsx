import React from 'react'
import {Table} from 'antd';
import {appointRecord} from '../../../../../../type/type';
import {useGetAppoint} from './util';

export default function recordTable(props:any) {

    const {isLoading,data:leadList}=useGetAppoint(props.phone)

  return (
    <Table
        loading={isLoading}
        // pagination={pagination}
        size='small'
        pagination={{pageSize:5}}
        rowKey={"reserve_id"}
        columns={[
            {
              title: "借阅记录ID",
              align:'center',
              dataIndex: "reserve_id",
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
              dataIndex: "name",
              align:'center',
            },
            {
              title: "借阅时间",
              dataIndex: "reserve_date",
              align:'center',
            },
            {
                title: "书籍状态",
                align:'center',
                render(value:appointRecord){
                    return <span>
                        {value.state?value.state==1?"已完成":"已取消":"已预约"}
                    </span>
                }
            }
          ]}
        dataSource={leadList}
        
    ></Table>
  )
}
