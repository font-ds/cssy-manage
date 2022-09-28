import React,{useState,useRef} from 'react'
import {Button,Divider,Form,Input,Radio,Upload,Switch, message, Col,Tag} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import {uploadImage,getImage} from '../../../../utils/cos-js-sdk'
import {book} from '../../../../type/type'
import {useAddBook} from './util'


export default function Index() {
    // 禁止修改
    const [disabled,setDisabled]=useState(false)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 自动下一本
    const [autoNext,setAutoNext]=useState(true)
    // 上传的图片key
    const [cover,setCover]=useState('')
    // 绑定表单
    const [form] = Form.useForm<book>();
    // 控制标签添加删除
    const [tags,setTags]=useState(['最好的你'])
    const [addTag,setAddTag]=useState(false)

    // 监听扫码枪
    window.addEventListener('keypress',(e)=>{
      console.log(e)
    })

    // 提交新增图书
    const {mutateAsync:addBook}=useAddBook(['bookmanage','booklist'])
    const handleSubmit= async (value:book)=>{
      console.log(value)
        let data={...value,cover}
        addBook(data).then(res=>{
          message.success('新增书籍成功')
          if(!autoNext) setDisabled(true)
          else {
            form.resetFields()
            setUpFileList([])
          }
        })
    }

    // 重置表单
    const reset=()=>{
      form.resetFields()
    }

    // 图片上传
    const uploadImageBtn=(params:any)=>{
      uploadImage(params.file.name,params.file,function(url:any){
        form.setFieldValue('cover','has')
        setCover('picture/'+params.file.name)
        let obj={
            status:'done',
            url:url.replace('http','https')
        }
        setUpFileList([obj])
      })
    }

    // 图片地址处理
    const handleImgUrl=(key:string)=>{
      if(key.substring(0,4)!='http') {
        getImage(key,(url:string)=>{
          setUpFileList({state:'done',url})
        })
      }
      else setUpFileList({state:'done',url:key})
    }

    // 增加标签
    const addTagFunc=(e:any)=>{
      // if(e) setTags([...tags,e])
      console.log(e)
      setAddTag(false)
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
                  label="书籍录入ID"
                  name="id"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input /> 
                </Form.Item>
                <Form.Item
                  label="图书ISBN"
                  name="isbn"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input /> 
                </Form.Item>
                <Button style={{position:'relative',left:'40%',top:'-5rem'}} type='primary' size='small'>
                  读取书籍
                </Button>

               <Form.Item
                  style={{marginTop:'-3.5rem'}}
                  label="书籍封面"
                  name='cover'
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >   
                {/* 用input模拟判断有没有插入图片 */}
                  <Input size='small' style={{visibility:'hidden'}} />
                </Form.Item>
                <Col offset={3} style={{marginBottom:'0.5rem'}}>
                  <ImgCrop key={123}>
                      <Upload 
                        fileList={upFileList} 
                        maxCount={1} 
                        customRequest={uploadImageBtn}
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
                    <Input />
                </Form.Item>
                <Form.Item
                  label="书籍作者"
                  name="author"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                  label="书籍分类"
                  name="tags"
                >
                  <div style={{display:'flex',alignItems:'center'}}>
                  {
                      tags.map((item,index)=><Tag closable key={index}>{item}</Tag>) 
                    }
                    {
                      addTag?<Input
                      type="text"
                      size="small"
                      maxLength={4}
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
                    <Input />
                </Form.Item>
                <Form.Item
                  label="出版社"
                  name="publish_by"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
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
