import React from 'react'
import {Modal,Table,Button} from 'antd'

export default function Index() {
  return (
    <Modal>
        <Table
            loading={isLoading}
            size='small'
            rowKey={"vip_id"}
            columns={[
              {
                title: "优惠券ID",
                align:'center',
                dataIndex: "coupon_id",
              },
              {
                title: "所属会员",
                dataIndex: "vip_name",
                align:'center',
              },
              {
                title: "会员手机",
                dataIndex: "phone",
                align:'center',
              },
              {
                title: "优惠券名称",
                dataIndex: "coupon_name",
                align:'center',
              },
              {
                title: "优惠金额",
                dataIndex: "amount",
                align:'center',
              },
              {
                title: "优惠券到期日期",
                dataIndex: "expired_date",
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
        />
    </Modal>
  )
}
