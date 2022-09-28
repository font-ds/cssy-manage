import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import {contentList} from '../../../../../type/type';
import {Button,Divider,Form,Input,FormInstance,DatePicker, message,Popconfirm,Radio,Select,Upload,TimePicker} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {disabledDate} from '../../../../../utils/time'
import {handleImgUrl,uploadImageBtn} from '../../../bookManage/util';
const {Option}=Select
const {TextArea}=Input

export default function Index() {
    const {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)

    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 上传的图片key
    const [cover,setCover]:[any,Function]=useState('')

    // 绑定表单
    const [form] = Form.useForm<FormInstance>();

    // 提交
    const handleSubmit=()=>{
      
    }
    // 取消
    const concelModify=()=>{

      setFormDisable(true);
      form.setFieldsValue(state)
    }
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>会员信息</span>
            {
              formDisable?
                  <Button size='small' style={{marginLeft:'1rem'}} type='primary' onClick={()=>setFormDisable(false)}>修改信息</Button>
                :
                <div>
                    <Button size='small' type='default' onClick={concelModify}>取消</Button>
                    <Popconfirm
                      placement="topRight"
                      title={'是否确认修改会员信息'}
                      onConfirm={handleSubmit}
                      okText="确认"
                      cancelText="取消"
                    >
                        <Button style={{marginLeft:'1rem'}} size='small' type='primary'>保存</Button>
                    </Popconfirm>
                    
                </div>
            }
        </div>
        <Divider style={{marginTop:'1rem'}} />
        <Form
      form={form}
      disabled={formDisable}
      className='form'
      name="basic"
      initialValues={state}
      labelCol={{ span: 3}}
      wrapperCol= {{ span: 6 }}
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
      </Form>
    </div>
  )
}
