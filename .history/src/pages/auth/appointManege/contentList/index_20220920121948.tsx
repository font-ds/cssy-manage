import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps} from 'antd'
import {useGetAppointList} from './util';
import {contentList} from '../../../../type/type';

export default function Index() {

    // 分页
    const [page,setPage]=useState(0)
    // 状态
    const [state,setState]=useState(-1)
  // 展示类型
  const {isLoading,data}=useGetAppointList(page,state)
  return (
  <>
    <Divider></Divider>
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
                if(value.state=='1') return <span>已完成</span>
                else if(value.state=='2') return <span>已取消</span>
                else return (
                <>
                  <Button type='link' onClick={() => {}}>
                    到馆完成
                  </Button>
                  <Button type='link' danger onClick={() => {console.log('删除',value)}}>
                    取消预约
                  </Button>
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
