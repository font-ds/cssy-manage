import React from 'react'
import {Table,Button,Divider} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetBookList} from './util';
import {book} from '../../../../type/type'

export default function Index() {
  const navigate=useNavigate()
  const {isLoading,data:users}=useGetBookList()
  return (
  <>
    <div>书籍列表</div>
    <Divider></Divider>
    <Table
        loading={isLoading}
        // pagination={pagination}
        size='small'
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
                  <Button type='link' danger onClick={() => {console.log('删除',value)}}>
                    删除
                  </Button>
                </>
              );  
            },
          },
        ]}
        dataSource={users}
        // onChange={(v: PaginationProps) => {
        //   setPagination(v);
        // }}
      />
    </>
  )
}
