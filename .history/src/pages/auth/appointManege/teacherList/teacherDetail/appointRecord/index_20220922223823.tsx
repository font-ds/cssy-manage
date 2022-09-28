import React from 'react'
import {Table} from 'antd';
import {appointRecord} from '../../../../../../type/type';
import {useGetAppoint} from './util';

export default function AppointTable(props:any) {

    const {isLoading,data:leadList}=useGetAppoint(props.tutor_id)

  return (
    <Table
        loading={isLoading}
        // pagination={pagination}
        size='small'
        pagination={{pageSize:5}}
        rowKey={"reserve_id"}
        columns={[
            {
              title: "预约记录ID",
              align:'center',
              dataIndex: "reserve_id",
            },
            {
              title: "预约会员",
              dataIndex: "user_name",
              align:'center',
            },
            {
              title: "会员手机",
              dataIndex: "phone",
              align:'center',
            },
            {
              title: "预约项目",
              dataIndex: "name",
              align:'center',
            },
            {
              title: "预约时间",
              dataIndex: "reserve_date",
              align:'center',
            },
            {
                title: "预约状态",
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
