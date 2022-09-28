import React,{useState} from 'react'
import {Button,Divider,Form,Input,FormInstance,Radio,Upload,UploadProps} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useLocation } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

// import {useEditVip} from './util'

// import './index.scss';

export default function Index() {
    // 获取传递过来的数据
    const {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 绑定表单
    const [form] = Form.useForm<FormInstance>();

    // 提交
    const handleSubmit= async ()=>{
        const data=await form.validateFields()
        console.log(data)
        
    }

    let defaultFileList:any=[{
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]
    
  return (
    <div className='vip-detail'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>书籍信息</span>
            {
                formDisable?<Button size='small' type='primary' onClick={()=>setFormDisable(false)}>修改信息</Button>:
                <div>
                    <Button size='small' type='default' onClick={()=>{setFormDisable(true);form.setFieldsValue(state)}}>取消</Button>
                    <Button style={{marginLeft:'1rem'}} size='small' type='primary' onClick={()=>handleSubmit}>保存</Button>
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
            //   initialValues={state}
              autoComplete="off"
            >
                <Form.Item
                  label="书籍录入ID"
                  name="id"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input disabled />
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
                  name="cover"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >

                    <ImgCrop>
                        <Upload defaultFileList={defaultFileList} maxCount={1} action="/upload.do" listType="picture-card">
                            <div>
                              {/* <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div> */}
                                <img src={require('../../../../../assets/team.png')} alt="图片" />
                            </div>
                        </Upload>
                    </ImgCrop>
                </Form.Item>
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
                  name="expired_date"
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
            </Form>
    </div>
  )
}