import React from 'react'
import {Table,Button,Divider} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetCouponList} from './util';

export default function Index() {
  // 跳转
  const navigate=useNavigate()
  // 获取数据
  const {isLoading,data:coupons}=useGetCouponList()

  return (
  <>
    <div>查找</div>
    <Divider></Divider>
    <Table
        loading={isLoading}
        // pagination={pagination}
        size='small'
        rowKey={"vip_id"}
        columns={[
          {
            title: "优惠券ID",
            align:'center',
            dataIndex: "vip_id",
          },
          {
            title: "所属会员",
            dataIndex: "vip_name",
            align:'center',
          },
          {
            title: "会员手机",
            dataIndex: "power",
            align:'center',
          },
          {
            title: "优惠券名称",
            dataIndex: "expired_date",
            align:'center',
          },
          {
            title: "优惠金额",
            dataIndex: "phone",
            align:'center',
          },
          {
            title: "优惠券到期日期",
            dataIndex: "phone",
            align:'center',
          },
          {
            title: "操作",
            align:'center',
            render(value) {
              return (
                <>
                  <Button type='link' danger onClick={() => {console.log('删除',value)}}>
                    待使用
                  </Button>
                </>
              );  
            },
          },
        ]}
        dataSource={coupons}
        // onChange={(v: PaginationProps) => {
        //   setPagination(v);
        // }}
      />
    </>
  )
}
