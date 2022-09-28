import React,{useState,useRef,useEffect} from 'react'
import {Button,Divider,Form,Input,FormInstance,Radio,Upload, Col,Tag} from 'antd';
import ImgCrop from 'antd-img-crop';
import type { InputRef } from 'antd';
import { useLocation } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import RecordTable from './recordTable/index';
import {handleImgUrl,uploadImageBtn} from '../../util';
// import {useEditVip} from './util'

export default function Index() {
    // 获取传递过来的数据
    const {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState()
    // 图片地址
    const [cover,setCover]:[any,Function]=useState('')
    // 控制标签添加删除
    const [tags,setTags]=useState(['最好的你'])
    const [addTag,setAddTag]=useState(false)
    const inputRef = useRef<InputRef>(null);
    // 控制增加标签输入框的选中
    useEffect(()=>{
      // 初始化数据
      setTags(state.tags)
      setUpFileList(handleImgUrl(state.cover,setUpFileList))
      setCover('has')
      // 添加监听事件
      window.addEventListener('keypress',keyPress)
      inputRef.current?.focus()
      // 移除监听事件
      return ()=>{
        window.removeEventListener('keypress',keyPress)
      }
    },[addTag])

    // 监听扫码枪
    const keyPress=(e:any)=>{
      console.log(e.target.value)
    }

    // 增加标签
    const addTagFunc=(e:any)=>{
      if(e.target.value) setTags([...tags,e.target.value])
      setAddTag(false)
    }
    // 绑定表单
    const [form] = Form.useForm<FormInstance>();

    // 提交
    const handleSubmit= async ()=>{
        const data=await form.validateFields()
    }

    // 取消修改
    const concelModify=()=>{
        form.setFieldsValue(state);
        setTags(state.tags)
        setUpFileList(handleImgUrl(state.cover,setUpFileList))
        setFormDisable(true);
        setCover('has')
    }
    
  return (
    <div className='vip-detail'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>书籍信息</span>
            {
                formDisable?<Button size='small' type='primary' onClick={()=>setFormDisable(false)}>修改信息</Button>:
                <div>
                    <Button size='small' type='default' onClick={concelModify}>取消</Button>
                    <Button style={{marginLeft:'1rem'}} size='small' type='primary' onClick={handleSubmit} >保存</Button>
                </div>
            }
        </div>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              form={form}
              className='form'
              name="basic"
              disabled={formDisable}
              labelCol={{ span: 3}}
              wrapperCol= {{ span: 6 }}
              initialValues={state}
              autoComplete="off"
              onFinish={handleSubmit}
            >
                <Form.Item
                  label="书籍录入ID"
                  name="id"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input  disabled />
                </Form.Item>
                <Form.Item 
                  label="图书ISBN" 
                  rules={[{ required: true, message: '此项不能为空！' }]}  
                  name='isbn' 
                >
                  <Input /> 
                </Form.Item>
                <Button style={{position:'relative',left:'40%',top:'-5rem'}} type='primary' size='small'>
                  读取书籍
                </Button>

                <Form.Item
                  style={{marginTop:'-3.5rem'}}
                  label="书籍封面"
                  name="cover"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input style={{visibility:'hidden'}}></Input>
                </Form.Item>
                <Col style={{marginBottom:'0.5rem'}} offset={3}>
                <ImgCrop>
                        <Upload 
                          defaultFileList={upFileList} 
                          fileList={upFileList} 
                          maxCount={1} 
                          customRequest={(e)=>uploadImageBtn(e,setUpFileList,setCover,form)}
                          onRemove={()=>{setUpFileList([]);form.setFieldValue('cover',null)}}
                          listType="picture-card"
                        >
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        </Upload>
                    </ImgCrop>
                </Col>
                

                <Form.Item
                  label="书籍名称"
                  name="title"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input  />
                </Form.Item>
                <Form.Item
                  label="书籍作者"
                  name="author"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input  />
                </Form.Item>
                <Form.Item
                  label="书籍分类"
                >
                   <div style={{display:'flex',alignItems:'center'}}>
                    {
                      tags.map((item,index)=><Tag closable onClose={()=>{let newTags=tags.splice(0,index);setTags(newTags)}} key={index}>{item}</Tag>) 
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
                  label="书籍语言"
                  name="language"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input  />
                </Form.Item>
                <Form.Item
                  label="出版社"
                  name="publish_by"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input  />
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
            </Form>
            <div>书籍借阅历史</div>
            <Divider style={{marginTop:'1rem'}} />
            <RecordTable id={state.id}></RecordTable>
    </div>
  )
}
