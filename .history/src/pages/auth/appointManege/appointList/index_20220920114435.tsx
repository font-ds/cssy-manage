import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps} from 'antd'
import {useGetAppointList} from './util';
import {appointListRecord} from '../../../../type/type';

export default function Index() {

    // 分页
    const [page,setPage]=useState(0)
    // 搜索关键字
    const [keyword,setKeyword]=useState<string>('')
    // 搜索分类
    const [searchClass,setSearchClass]=useState('')
  // 展示类型
  const data=useGetAppointList(page,keyword,searchClass)
  console.log(data)
  return (
  <>
    <Divider></Divider>
    <Table
        loading={data.isLoading}
        pagination={data.data?.pagination}
        size='small'
        rowKey={"reserve_id"}
        columns={[
          {
            title: "预约记录ID",
            align:'center',
            dataIndex: "reserve_id",
          },
          {
            title: "预约会员",
            dataIndex: "user_name",
            align:'center',
          },
          {
            title: "会员手机",
            dataIndex: 'phone',
            align:'center',
          },
          {
            title: "预约项目",
            align:'center',
            render(value:appointListRecord){
                return <span>{value.type?value.type=='1'?'特色内容':'专业导读师':'功能阅读'}</span>
            }
          },
          {
            title: "预约时间",
            align:'center',
            render(value:appointListRecord){
                return <span>{value.reserve_date} {value.reserve_time}</span>
            }
          },
          {
            title: "预约状态",
            align:'center',
            render(value:appointListRecord){
                return <span>{value.state?value.state=='1'?'已完成':'已取消':'已预约'}</span>
            }
          },
          {
            title: "操作",
            align:'center',
            render(value) {
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
        dataSource={data.data?.data}

      />
    </>
  )
}
