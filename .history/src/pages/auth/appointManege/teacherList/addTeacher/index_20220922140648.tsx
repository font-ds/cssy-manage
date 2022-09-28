import React,{useState,useRef,useEffect} from 'react'
import {Button,Divider,Form,Input,Radio,Upload,Switch, message, Col,Tag} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import {useAddBook} from './util'
import {handleImgUrl,uploadImageBtn} from '../util';

const {TextArea} =Input

export default function Index() {
    // 禁止修改
    const [disabled,setDisabled]=useState(false)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 自动下一本
    const [autoNext,setAutoNext]=useState(true)
    // 上传的图片key
    const [cover,setCover]:[any,Function]=useState('')
    // 绑定表单
    const [form] = Form.useForm<book>();
    // 控制标签添加删除
    const [tags,setTags]=useState<Array<string>>([])
    const [addTag,setAddTag]=useState(false)
    const inputRef = useRef<InputRef>(null);
    // 控制增加标签输入框的选中
    useEffect(()=>{
      inputRef.current?.focus()
    },[addTag])
    // 增加标签
    const addTagFunc=(e:any)=>{
      if(e.target.value) setTags([...tags,e.target.value])
      setAddTag(false)
    }

    // 提交
    const handleSubmit=(value:any)=>{

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
                  name="id"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input /> 
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
                >
                  <div style={{display:'flex',alignItems:'center',flexWrap:'wrap'}}>
                    {
                      tags.map((item,index)=>
                      <Tag style={{margin:'0.5rem 0.2rem'}}  
                      closable 
                      onClose={()=>{let newTags=tags.splice(0,index);setTags(newTags)}} 
                      key={index}
                      >{item}</Tag>) 
                    }
                    {
                      addTag?<Input
                      type="text"
                      size="small"
                      maxLength={4}
                      ref={inputRef}
                      style={{width:'7rem',height:'2.2rem',fontSize:'1rem'}}
                      onBlur={(e)=> addTagFunc(e)}
                      onPressEnter={(e)=> addTagFunc(e)}
                    />:<Tag onClick={()=>setAddTag(true)}><PlusOutlined /></Tag>
                    }
                  </div>
                </Form.Item>
               
                
                
                <Form.Item
                  label="借阅权限"
                  name="permission"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Radio.Group>
                        <Radio value="0"> 默认 </Radio>
                        <Radio value="1"> 精品 </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{offset:2,span:16}}>
                    <Button style={{marginRight:'2rem'}} size='small' type="primary" htmlType="submit">
                      保存
                    </Button>
                    <Button style={{marginLeft:'2rem'}} size='small' onClick={reset}>
                        重置
                    </Button>
                    <Switch style={{margin:'0 1rem 0 5rem'}} checkedChildren="开启" unCheckedChildren="关闭" defaultChecked onChange={e=>setAutoNext(e)} />
                    保存后自动进入下一本
                </Form.Item>
            </Form>
    </div>
  )
}
