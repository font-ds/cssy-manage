import React,{useState} from 'react'
import {Table,Button,Divider} from 'antd'
import {useGetCouponRecord} from './util';
import {couponRecord} from '../../../../type/type';
import CouponModal from './couponModal/index';

export default function Index() {
  // 控制modal
  const [modalVisible,setModalVisible]=useState(false)
  // 获取数据
  const {isLoading,data:coupons}=useGetCouponRecord()

  return (
  <div className='coupon'>
    <div>
      查找
      <Button>发布优惠券</Button>
    </div>
    <Divider style={{marginTop:'1rem'}}></Divider>
    <Table
        loading={isLoading}
        size='small'
        rowKey={"coupon_id"}
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
            render(value:couponRecord) {
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
      {
        modalVisible? <CouponModal controlModal={setModalVisible} visible={modalVisible}></CouponModal>:null
      }
      
    </div>
  )
}
