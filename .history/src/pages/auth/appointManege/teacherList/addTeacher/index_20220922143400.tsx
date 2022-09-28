import React,{useState} from 'react'
import {Button,Divider,Form,Input,Radio,Upload, message,Popconfirm} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import {useAddTeacher} from './util'
import {uploadImageBtn} from '../../../bookManage/util';

const {TextArea} =Input

export default function Index() {
    const navigate=useNavigate()
    // 禁止修改
    const [disabled,setDisabled]=useState(false)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 上传的图片key
    const [avatar,setAvator]:[any,Function]=useState('')
    // 绑定表单
    const [form] = Form.useForm<any>();

    // 提交
    const {mutateAsync:addTeacher}=useAddTeacher(['appointmanage','teacherlist',0,-1])
    const handleSubmit=(value:any)=>{
        let data={...value,avatar}
    }

  return (
    <div className='add-book'>
        <span>新增图书信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              form={form}
              className='form'
              name="basic"
              disabled={disabled}
              labelCol={{ span: 3}}
              wrapperCol= {{ span: 6 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="导读师名称"
                  name="name"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={20} placeholder="限20字" /> 
                </Form.Item>
               <Form.Item
                  label="导读师头像"
                  name='cover'
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >   
                  <ImgCrop>
                      <Upload 
                        fileList={upFileList} 
                        maxCount={1} 
                        customRequest={e=>uploadImageBtn(e,setUpFileList,setAvator,form)}
                        onRemove={()=>{setUpFileList([]);form.setFieldValue('cover',null)}}
                        listType="picture-card"
                      >
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                      </Upload>
                  </ImgCrop>
                </Form.Item>
                <Form.Item
                  label="导读师描述"
                  name="introduction"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <TextArea allowClear rows={4} placeholder="限250字" maxLength={250} />
                </Form.Item>
                <Form.Item
                  label="书籍分类"
                  name='label'
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={10} placeholder="限10字"></Input>
                </Form.Item>
                <Form.Item wrapperCol={{offset:3,span:16}}>
                    <Popconfirm
                      placement="topRight"
                      title={'是否确认新增导读师'}
                      onConfirm={()=>form.submit()}
                      okText="确认"
                      cancelText="取消"
                    >
                        <Button style={{marginRight:'2rem'}} size='small' type="primary" >
                            新增
                        </Button>
                    </Popconfirm>
                    
                    <Button style={{marginLeft:'2rem'}} size='small' onClick={()=>navigate(-1)}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
    </div>
  )
}
