import React,{useState} from 'react'
import {Button,Divider,Form,Input,Radio,Upload, message} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
// import {useAddBook} from './util'
import {uploadImageBtn} from '../../../bookManage/util';

const {TextArea} =Input

export default function Index() {
    // 禁止修改
    const [disabled,setDisabled]=useState(false)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 上传的图片key
    const [cover,setCover]:[any,Function]=useState('')
    // 绑定表单
    const [form] = Form.useForm<any>();

    // 提交
    const handleSubmit=(value:any)=>{
        let data={...value,avatar:cover}
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
                        customRequest={e=>uploadImageBtn(e,setUpFileList,setCover,form)}
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
                  <TextArea allowClear rows={4} maxLength={250} />
                </Form.Item>
                <Form.Item
                  label="书籍分类"
                  name='label'
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={10}></Input>
                </Form.Item>
                <Form.Item wrapperCol={{offset:2,span:16}}>
                    <Button style={{marginRight:'2rem'}} size='small' type="primary" htmlType="submit">
                      保存
                    </Button>
                    <Button style={{marginLeft:'2rem'}} size='small' onClick={()=>{}}>
                        重置
                    </Button>
                </Form.Item>
            </Form>
    </div>
  )
}
