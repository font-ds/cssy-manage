import React,{useState} from 'react'
import {Table,Button,Divider,Popconfirm} from 'antd'
import {useGetCouponRecord,useCoupon} from './util';
import {couponRecord} from '../../../../type/type';
import CouponModal from './couponModal/index';
import AddModal from './addModal/index';

export default function Index() {
  // 控制优惠券列表modal
  const [modalVisible,setModalVisible]=useState(false)
  // 控制添加优惠券modal
  const [addVisible,setAddVisible]=useState(false)
  // 获取数据
  const {isLoading,data:coupons}=useGetCouponRecord()
 

  // 使用优惠券
  const {mutateAsync:userUseCoupon}=useCoupon(['vipmanage','couponRecord'])
  const confirmUse=(value:couponRecord)=>{
    let data={...value,state:'1'}
    userUseCoupon(data).then(res=>{
      console.log(res)
    })
  }

  return (
  <div className='coupon'>
    <div>
      查找
      <Button size='small' type='primary' onClick={()=>setModalVisible(true)}>发布优惠券</Button>
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
              if(!value.state) return <span>已使用</span>
              // else return <Button type='primary' danger onClick={() => {console.log('删除',value)}}>待使用</Button>
              else return <Popconfirm
              placement="topRight"
              title={'是否确认使用优惠券'}
              onConfirm={()=>confirmUse(value)}
              okText="确认"
              cancelText="取消"
            >
              <Button type='link'>待使用</Button>
            </Popconfirm>
            },
          },
        ]}
        dataSource={coupons}
        // onChange={(v: PaginationProps) => {
        //   setPagination(v);
        // }}
      />
      {
        modalVisible? <CouponModal controlModal={setModalVisible} visible={modalVisible} addModal={setAddVisible}></CouponModal>:null
      }
      {
        addVisible? <AddModal addVisible={addVisible}></AddModal>:null
      }
    </div>
  )
}
