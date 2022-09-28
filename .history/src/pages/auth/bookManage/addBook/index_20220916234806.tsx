import React,{useState} from 'react'
import {Button,Divider,Form,Input,Radio,Upload,Switch, message, Col} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {uploadImage} from '../../../../utils/cos-js-sdk'
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
               <Form.Item
                  label="书籍封面"
                  name='cover'
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >   
                {/* 用input模拟判断有没有插入图片 */}
                  <Input style={{visibility:'hidden',height:'1rem'}} />
                </Form.Item>
                <Col style={{marginTop:'-1rem'}} offset={3}>

                  <ImgCrop key={123}>
                      <Upload 
                        style={{marginLeft:'20%'}}
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
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input />
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
