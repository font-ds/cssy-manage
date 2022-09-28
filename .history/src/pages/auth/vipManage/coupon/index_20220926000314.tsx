import React,{useState,useRef} from 'react'
import {Table,Button,Divider,Popconfirm,PaginationProps,Input,Select,InputRef} from 'antd'
import {useGetCouponRecord,useCoupon} from './util';
import {couponRecord} from '../../../../type/type';
import CouponModal from './couponModal/index';
import AddModal from './addModal/index';

const {Option}=Select
export default function Index() {
  // 控制优惠券列表modal
  const [modalVisible,setModalVisible]=useState(false)
  // 控制添加优惠券modal
  const [addVisible,setAddVisible]=useState(false)
  // 分页
  const [page,setPage]=useState(0)
  // 搜索
  const [keyword,setKeyword]=useState<string|undefined>('')
  // 绑定搜索框
  const InputRef=useRef<InputRef>(null)
  // 搜索分类
  const [type,setType]=useState(0)
  // 获取数据
  const {isLoading,data}=useGetCouponRecord(page,keyword,type)
 
  // 使用优惠券
  const {mutateAsync:userUseCoupon}=useCoupon(['vipmanage','couponRecord',page,keyword,type])
  const confirmUse=(value:couponRecord)=>{
    let data={...value,state:'2'}
    userUseCoupon(data).then(res=>{
      console.log(res)
    })
  }

  return (
  <div className='coupon'>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <div className='type-button'>
        <div className='title' style={{width:'3rem'}}>查找</div>
        <Input.Group className='group' compact>
          <Select defaultValue={type} onChange={(e)=>setType(e)}>
            <Option className='option' value="0">姓名</Option>
            <Option value="1">手机号</Option>
          </Select>
          <Input ref={InputRef} onPressEnter={e=>setKeyword(e.target.value)} style={{ width: '45%',height:'2rem' }}  />
          <img onClick={()=>setKeyword(InputRef?.current?.input?.value)} src={require('../../../../assets/search.png')} alt='搜索'></img>
        </Input.Group>
      </div>
      <Button size='small' type='primary' onClick={()=>setModalVisible(true)}>发布优惠券</Button>
    </div>
    <Divider style={{marginTop:'0.3rem'}}></Divider>
    <Table
        loading={isLoading}
        size='small'
        pagination={data?.pagination}
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
        dataSource={data?.data}
        onChange={(v:PaginationProps)=>{
          setPage(v.current as number -1)
        }}
      />
      {
        modalVisible? <CouponModal controlModal={setModalVisible} visible={modalVisible} addModal={setAddVisible}></CouponModal>:null
      }
      {
        addVisible? <AddModal controlModal={setModalVisible} addVisible={addVisible} addModal={setAddVisible}></AddModal>:null
      }
    </div>
  )
}
