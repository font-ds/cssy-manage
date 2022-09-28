import React,{useState} from 'react'
import {Modal,Table,Button,Popconfirm} from 'antd'
import {useGetCouponList} from './util';
import {coupon} from '../../../../../type/type';

export default function Index(props:{controlModal:Function,visible:boolean}) {
    const {isLoading,data:couponList}=useGetCouponList()
    console.log(111,couponList)

    const confirmStop=(value:coupon)=>{

    }
  return (
    <Modal 
        width={1000} 
        visible={props.visible} 
        footer={null} 
        onCancel={()=>props.controlModal()}
    >
        <Table
            loading={isLoading}
            size='small'
            pagination={{pageSize:8}}
            rowKey={"coupon_id"}
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
                title: "优惠券兑换码",
                dataIndex: "coupon_id",
                align:'center',
              },
              {
                title: "领取数量",
                align:'center',
                render(value:coupon) {
                    return <>
                        {value?.issued}/{value?.max}
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
                    if(!value.state) return <span>已完成</span>
                    else return <Popconfirm
                      placement="topRight"
                      title={'是否确认使用优惠券'}
                      onConfirm={()=>confirmStop(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type='primary' danger onClick={() => {console.log('删除',value)}}>停止发放</Button>
                    </Popconfirm>
                },
              },
            ]}
            dataSource={couponList}
        />
    </Modal>
    // <></>
  )
}
