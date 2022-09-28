import React,{useState} from 'react'
import {Table,Button,Divider,Popconfirm, message,PaginationProps} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetBookList,useDelBook} from './util';
import {book} from '../../../../type/type'

export default function Index() {
  // 跳转
  const navigate=useNavigate()
  // 分页
  const [page,setPage]=useState(0)
  // 搜索
  const [keyword,setKeyword]=useState('')
  // 获取数据
  const {isLoading,data}=useGetBookList(page)
  // 确认删除
  const {mutateAsync:delBook}=useDelBook(['bookmanage','booklist',page])
  const confirmDel=(value:book)=>{
    delBook(value).then(res=>{
      message.success('删除成功')
    })
  } 

  return (
  <>
    <div>书籍列表</div>
    <Divider></Divider>
    <Table
        loading={isLoading}
        size='small'
        pagination={data?.pagination}
        rowKey={"id"}
        columns={[
          {
            title: "书籍ID",
            align:'center',
            dataIndex: "id",
          },
          {
            title: "书籍名称",
            dataIndex: "title",
            align:'center',
          },
          {
            title: "出版社",
            dataIndex: "publish_by",
            align:'center',
          },
          {
            title: "书籍状态",
            align:'center',
            render(value:book){
              return <span>{value.state?value.state==1?"待取走":"已被借阅":"可借阅"}</span>
            }
          },
          {
            title: "操作",
            align:'center',
            render(value:book) {
              return (
                <>
                  <Button type='link' onClick={() => {navigate('detail',{state:value})}}>
                    查看
                  </Button>
                  <Popconfirm
                      placement="topRight"
                      title={'是否删除书籍'}
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
        onChange={(v: PaginationProps) => {
          setPage(v.current as number -1)
        }}
      />
    </>
  )
}
