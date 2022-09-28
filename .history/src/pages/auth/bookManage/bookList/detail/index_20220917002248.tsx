import React,{useState} from 'react'
import {Button,Divider,Form,Input,FormInstance,Radio,Upload, Col} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useLocation } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import RecordTable from './recordTable/index';
import {uploadImage,getImage} from '../../../../../utils/cos-js-sdk'

// import {useEditVip} from './util'

export default function Index() {
    // 获取传递过来的数据
    const {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([
        {
        uid: '-1',
        status: 'done',
        // value:state.cover,
        url: 'http://library-1313332868.cos.ap-chongqing.myqcloud.com/picture/1.png',
      }
    ])

    // 图片地址处理
    const handleImgUrl=(key:string)=>{
      if(key.substring(0,4)!='http') {
        getImage(key,(url:string)=>{
          setUpFileList({state:'done',url})
        })
      }
      else setUpFileList({state:'done',url:key})
    }

    // 绑定表单
    const [form] = Form.useForm<FormInstance>();

    // 提交
    const handleSubmit= async ()=>{
        // console.log(form.validateFields())
        const data=await form.validateFields()

        console.log(data)
        
    }

    // 取消修改
    const concelModify=()=>{
        form.setFieldsValue(state);
        setUpFileList([{
            uid: '-1',
            status: 'done',
            // value:state.cover,
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          }])
        setFormDisable(true);
    }

    // 图片上传
    const uploadImageBtn=(params:any)=>{
        uploadImage(params.file.name,params.file,function(url:any){
            let obj={
                status:'done',
                url:url.replace('http','https')
            }
            setUpFileList([obj])
        })
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
              wrapperCol= {{ span: 8 }}
              initialValues={state}
              autoComplete="off"
              onFinish={handleSubmit}
            >
                <Form.Item
                  label="书籍录入ID"
                  name="id"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input style={{width:'75%'}} disabled />
                </Form.Item>
                <Form.Item
                  label="图书ISBN"
                  name="isbn"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input style={{width:'75%'}} /> <Button style={{width:'20%',marginLeft:'3%'}} size='small'>读取书籍</Button>
                </Form.Item>
                <Form.Item
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
                    <Input style={{width:'75%'}} />
                </Form.Item>
                <Form.Item
                  label="书籍作者"
                  name="author"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input style={{width:'75%'}} />
                </Form.Item>
                <Form.Item
                  label="书籍分类"
                  name="tags"
                >
                    <Input style={{width:'75%'}}  />
                </Form.Item>
                <Form.Item
                  label="书籍语言"
                  name="language"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input style={{width:'75%'}} />
                </Form.Item>
                <Form.Item
                  label="出版社"
                  name="publish_by"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input style={{width:'75%'}} />
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
