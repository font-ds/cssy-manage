import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps,Popconfirm} from 'antd'
import {useGetContentList} from './util';
import {useNavigate} from 'react-router-dom'
import {contentList} from '../../../../type/type';

export default function Index() {
    const navigate=useNavigate()

    // 分页
    const [page,setPage]=useState(0)
    // 状态
    const [state,setState]=useState(-1)
  // 展示类型
  const {isLoading,data}=useGetContentList(page,state)
  return (
  <>
    <div style={{display:'flex',justifyContent:'space-between'}}>
      <div className='type-button' style={{paddingLeft:'1rem'}}>
        <Button type={state==-1?'primary':'default'} onClick={()=>{setState(-1);setPage(0)}}>所有</Button>
        <Button type={state==0?'primary':'default'} onClick={()=>{setState(0);setPage(0)}}>已下班</Button>
        <Button type={state==1?'primary':'default'} onClick={()=>{setState(1);setPage(0)}}>已上班</Button>
      </div>
        <Button type='primary' size='small' onClick={()=>navigate('addcontent')}>新增预约内容</Button>
    </div>
    <Divider style={{marginTop:'0rem'}}></Divider>
    <Table
        loading={isLoading}
        pagination={data?.pagination}
        size='small'
        rowKey={"id"}
        columns={[
          {
            title: "预约内容ID",
            align:'center',
            dataIndex: "id",
          },
          {
            title: "内容名称",
            dataIndex: "title",
            align:'center',
          },
          {
            title: "内容分类",
            dataIndex: 'type',
            align:'center',
          },
          {
            title: "内容时间",
            dataIndex: 'date',
            align:'center',
          },
          {
            title: "内容状态",
            align:'center',
            render(value:contentList){
                return <span>已上架</span>
            }
          },
          {
            title: "操作",
            align:'center',
            render(value:contentList) {
                 return (
                <>
                  <Button type='link' onClick={() => navigate('contentdetail',{state:value})}>
                    编辑
                  </Button>
                  <Popconfirm
                      placement="topRight"
                      title={'是否确认删除该预约内容'}
                      onConfirm={()=>{}}
                      okText="确认"
                      cancelText="取消"
                    >
                        <Button type='link' danger >删除</Button>
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
