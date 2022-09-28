import React,{useState} from 'react'
import {Table,Button,Divider, message,PaginationProps,Popconfirm} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetLeadRecordAll,useChangeLead, useConcelLead} from './util';
import {bookLeadRecord} from '../../../../type/type';

export default function Index() {
  const navigate=useNavigate()

  // 分页
  const [page,setPage]=useState(0)
  // 搜索
  const [keyword,setKeyword]=useState('')
  // 搜素类型
  const [type,setType]=useState(0)
  // 书籍状态
  const [state,setState]=useState(-1)
  // 获取图书
  const {isLoading,data}=useGetLeadRecordAll(page,state,keyword,type)
  // 取走或归还图书
  const {mutateAsync:changeBookLead}=useChangeLead(['leadmanage','leadrecordlist',page,state,keyword,type])
  const changeLeadRecord=(value:bookLeadRecord)=>{
    if(value.state==0) value.state=1
    else if(value.state==1) value.state=2
    changeBookLead(value).then(res=>{
        message.success('操作成功')
    })
  }
  // 取消借阅
  const {mutateAsync:concelLead}=useConcelLead(['leadmanage','leadrecordlist',page,state,keyword,type])
  const concelLeadFunc=(value:bookLeadRecord)=>{
    value.state=2
    concelLead(value).then(res=>{
      message.success('已取消该书籍借阅记录')
    })
  }

  return (
  <>
    <Button size='small' type='primary' onClick={()=>navigate('/leadmanage/leadmanage2')}>新增会员</Button>
    <Divider></Divider>
    <Table
        loading={isLoading}
        pagination={data?.pagination}
        size='small'
        rowKey={"borrow_id"}
        columns={[
          {
            title: "借阅记录ID",
            align:'center',
            dataIndex: "borrow_id",
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
            dataIndex: "title",
            align:'center',
          },
          {
            title: "借阅时间",
            dataIndex: "borrow_date",
            align:'center',
          },
          {
            title: "书籍状态",
            align:'center',
            render(value:bookLeadRecord){
                return (
                    <span>{value.state?value.state=='1'?'已完成':value.state=='2'?'已取消':'已逾期':'待取书'}</span>
                )
            }
          },
          {
            title: "操作",
            align:'center',
            render(value:bookLeadRecord) {
              if(value.state==0) return (<>
               <Popconfirm
                      placement="topRight"
                      title={'是否确认取走图书'}
                      onConfirm={()=>changeLeadRecord(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type='link' >取走图书</Button>
                </Popconfirm>
                <Popconfirm
                      placement="topRight"
                      title={'是否确认取走图书'}
                      onConfirm={()=>concelLeadFunc(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type='link' danger >取消借阅</Button>
                </Popconfirm>
              </>
              )
              else return (
                <>
                  <Popconfirm
                        placement="topRight"
                        title={'是否确认归还图书'}
                        onConfirm={()=>changeLeadRecord(value)}
                        okText="确认"
                        cancelText="取消"
                      >
                        <Button type='link' >归还图书</Button>
                  </Popconfirm>
                  <Popconfirm
                      placement="topRight"
                      title={
                        <div>
                          <span>确认要延长借阅所选图书吗?</span>
                          <div>
                            <Button style={{margin:'1rem 0.5rem'}}>1周</Button>
                            <Button style={{margin:'1rem 0.5rem'}}>2周</Button>
                            <Button style={{margin:'1rem 0.5rem'}}>3周</Button>
                            <Button style={{margin:'1rem 0.5rem'}}>4周</Button>
                          </div>
                        </div>
                      }
                      onConfirm={()=>changeLeadRecord(value)}
                      okText="确认"
                      cancelText="取消"
                    >
                      <Button type='link' danger >延长借阅</Button>
                </Popconfirm>
                </>
              );  
            },
          },
        ]}
        dataSource={data?.data}
        onChange={(v: PaginationProps) => {
          setPage(v.current as number -1)
        }}
      />
    </>
  )
}
