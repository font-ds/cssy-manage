import React,{useState} from 'react'
import {Table,Button,Divider, message,PaginationProps} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetLeadRecordAll,useChangeLead} from './util';
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
    changeBookLead(value).then(res=>{
        console.log(res)
        message.success('操作成功')
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
                <Button type='link' >
                  取走图书
                </Button>
                <Button type='link' danger >
                  取消借阅
                </Button>
              </>
              )
              else return (
                <>
                  <Button type='link' >
                    归还图书
                  </Button>
                  <Button type='link' danger >
                    延长借阅
                  </Button>
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
