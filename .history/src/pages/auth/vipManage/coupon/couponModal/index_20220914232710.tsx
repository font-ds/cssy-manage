import React from 'react'
import {Modal,Table,Button} from 'antd'
import {useGetCouponList} from './util';
import {coupon} from '../../../../../type/type';

export default function Index() {
    const {isLoading,data:couponList}=useGetCouponList()
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
                title: "优惠券名称",
                dataIndex: "coupon_name",
                align:'center',
              },
              {
                title: "优惠券金额",
                dataIndex: "amount",
                align:'center',
              },
              {
                title: "优惠券到期日期",
                dataIndex: "expired_date",
                align:'center',
              },
              {
                title: "领取数量",
                align:'center',
                render(value:coupon) {
                    return <>
                        {value.issued}/{value.max}
                    </>
                }
              },
              {
                title: "优惠券兑换码",
                dataIndex: "amount",
                align:'center',
              },
              {
                title: "操作",
                align:'center',
                render(value:coupon) {
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
            dataSource={couponList}
        />
    </Modal>
  )
}
