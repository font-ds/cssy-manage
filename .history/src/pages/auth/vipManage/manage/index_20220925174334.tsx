import React,{useState,useRef} from 'react'
import {Table,Button,Divider,PaginationProps,Popconfirm, message,Input,Select, InputRef} from 'antd'
import {useNavigate} from 'react-router-dom';
import {vipUser} from '../../../../type/type';
import {useGetVipList,useDelVip} from './util';


const {Option}=Select
export default function Index() {
  // 展示类型
  const [state,setState]=useState(-1)
  // 搜索
  const [keyword,setKeyword]=useState<string|undefined>('')
  // 绑定搜索框
  const InputRef=useRef<InputRef>(null)
  // 搜索类型
  const [type,setType]=useState('0')
  // 分页
  const [page,setPage]=useState(0)
  const navigate=useNavigate()
  const {isLoading,data}=useGetVipList(page,state,keyword,type)
  // 删除用户
  const {mutateAsync:delVip}=useDelVip(['vipmanage','viplist',page,state,keyword,type])
  const confirmDel=(value:vipUser)=>{
    delVip(value).then(res=>{
      message.success('会员删除成功')
    })
  }
  return (
  <>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div className='type-button'>
        <div className='title'>查找</div>
        <Input.Group className='group' compact>
          <Select defaultValue={type} onChange={(e)=>setType(e)}>
            <Option className='option' value="0">姓名</Option>
            <Option value="1">手机号</Option>
          </Select>
          <Input ref={InputRef} onPressEnter={e=>setKeyword(e.target.value)} style={{ width: '45%',height:'2rem' }}  />
          <img onClick={()=>setKeyword(InputRef?.current?.input?.value)} src={require('../../../../assets/search.png')} alt='搜索'></img>
        </Input.Group>
        <Button type={state==-1?'primary':'default'} onClick={()=>{setState(-1);setPage(0)}}>所有</Button>
        <Button type={state==0?'primary':'default'} onClick={()=>{setState(0);setPage(0)}}>普通用户</Button>
        <Button type={state==1?'primary':'default'} onClick={()=>{setState(1);setPage(0)}}>VIP</Button>
        <Button type={state==2?'primary':'default'} onClick={()=>{setState(2);setPage(0)}}>SVIP</Button>
      </div>
      <Button size='small' type='primary' onClick={()=>navigate('add',{state:{state,page}})}>新增会员</Button>
    </div>
    
    <Divider style={{marginTop:'0rem'}}></Divider>
    <Table
        loading={isLoading}
        pagination={data?.pagination}
        size='small'
        rowKey={"vip_id"}
        columns={[
          {
            title: "会员ID",
            align:'center',
            dataIndex: "vip_id",
          },
          {
            title: "会员姓名",
            dataIndex: "vip_name",
            align:'center',
          },
          {
            title: "会员身份",
            dataIndex: "power",
            align:'center',
          },
          {
            title: "身份到期时间",
            dataIndex: "expired_date",
            align:'center',
          },
          {
            title: "会员手机",
            dataIndex: "phone",
            align:'center',
          },
          {
            title: "操作",
            align:'center',
            render(value:vipUser) {
              return (
                <>
                  <Button type='link' onClick={() => {navigate('detail',{state:{...value,page,state,keyword,type}})}}>
                    详情
                  </Button>
                  <Popconfirm
                      placement="topRight"
                      title={'是否删除该会员'}
                      onConfirm={()=>confirmDel(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                    <Button type='link' danger>删除</Button>
                  </Popconfirm>
                </>
              );  
            },
          },
        ]}
        dataSource={data?.data}
        onChange={(v:PaginationProps)=>{
          setPage(v.current as number -1)
        }}
      />
    </>
  )
}
