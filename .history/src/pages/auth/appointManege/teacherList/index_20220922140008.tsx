import React,{useState} from 'react'
import {Table,Button,Divider,PaginationProps,Popconfirm, message} from 'antd'
import {useNavigate} from 'react-router-dom';
import {teacherList} from '../../../../type/type';
import {useGetTeacherList,useDelTeacher} from './util';

export default function Index() {
  // 展示类型
  const [state,setState]=useState(-1)
  // 分页
  const [page,setPage]=useState(0)
  const navigate=useNavigate()
  const {isLoading,data}=useGetTeacherList(page,state)
  // 删除导读师
  const {mutateAsync:delTeacher}=useDelTeacher(['appointmanage','teacherlist',page,state])
  const confirmDel=(value:teacherList)=>{
    delTeacher(value).then(res=>{
      message.success('删除导读师成功')
    })
  }

  return (
  <>
    <Button size='small' type='primary' onClick={()=>navigate('addteacher')}>新增导读师</Button>
    <Divider></Divider>
    <Table
        loading={isLoading}
        pagination={data?.pagination}
        size='small'
        rowKey={"tutor_id"}
        columns={[
          {
            title: "导读师ID",
            align:'center',
            dataIndex: "tutor_id",
          },
          {
            title: "导读师名称",
            dataIndex: "name",
            align:'center',
          },
          {
            title: "导读师状态",
            align:'center',
            render(value:teacherList){
                return <span>{value.state?'上班中':'已下班'}</span>
            }
          },
          {
            title: "切换状态",
            align:'center',
            render(value:teacherList){
                return <Popconfirm
                placement="topRight"
                title={'是否切换该导读师上下班状态'}
                onConfirm={()=>confirmDel(value)}
                okText="确认"
                cancelText="取消"
              >
              <Button size='small' type='primary'>{value.state?'下班':'上班'}</Button>
            </Popconfirm>
                
            }
          },
          {
            title: "操作",
            align:'center',
            render(value:teacherList) {
              return (
                <>
                  <Button type='link' onClick={() => {navigate('teacherdetail',{state:{...value,state}})}}>
                    编辑
                  </Button>
                  <Popconfirm
                      placement="topRight"
                      title={'是否删除该导读师'}
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
