import React,{useState,useRef} from 'react'
import {Table,Button,Divider,Popconfirm, message,PaginationProps,Input,Select,InputRef} from 'antd'
import {useNavigate} from 'react-router-dom';
import {useGetBookList,useDelBook} from './util';
import {book} from '../../../../type/type'

const {Option}=Select
export default function Index() {
  // 跳转
  const navigate=useNavigate()
  // 分页
  const [page,setPage]=useState(0)
  // 搜索
  const [keyword,setKeyword]=useState<string|undefined>('')
  // 绑定搜索框
  const InputRef=useRef<InputRef>(null)
  // 获取数据
  const {isLoading,data}=useGetBookList(page,keyword)
  // 确认删除
  const {mutateAsync:delBook}=useDelBook(['bookmanage','booklist',page,keyword])
  const confirmDel=(value:book)=>{
    delBook(value).then(res=>{
      message.success('删除成功')
    })
  } 

  return (
  <>
    <div>
      <div className='type-button'>
        <div className='title'>查找</div>
        <Input.Group className='group' compact>
          <Select defaultValue="0">
            <Option value="0">书名</Option>
          </Select>
          <Input ref={InputRef} onPressEnter={e=>{setKeyword(e.target.value);setPage(0)}} style={{ width: '45%',height:'2rem' }}  />
          <img onClick={()=>{setKeyword(InputRef?.current?.input?.value);setPage(0)}} src={require('../../../../assets/search.png')} alt='搜索'></img>
        </Input.Group>
      </div>
      <Button size='small' type='primary' onClick={()=>navigate('/bookmanage/bookmanage2')}>添加书籍</Button>
    </div>
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
                  <Button type='link' onClick={() => {navigate('detail',{state:{...value,page,keyword}})}}>
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
