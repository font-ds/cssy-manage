import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import {contentList} from '../../../../../type/type';
import {Button,Divider,Form,Input,FormInstance,DatePicker, message,Popconfirm,Radio,Select,Upload,TimePicker} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {disabledDate} from '../../../../../utils/time'
import {handleImgUrl,uploadImageBtn} from '../../../bookManage/util';
import ListModal from './listModal'
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
                <div>
                  <Button size='small' type='primary' onClick={()=>setListModal(true)}>预约名单</Button>
                  <Button size='small' style={{marginLeft:'1rem'}} type='primary' onClick={()=>setFormDisable(false)}>修改信息</Button>
                </div>
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
          label="内容分类"
          name="type"
          rules={[{ required: true, message: '此项不能为空！' }]}
        >
          <Select style={{ width: '14rem' }}>
            <Option value="0">普通会员</Option>
            <Option value="1">VIP</Option>
            <Option value="2">SVIP</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="内容标题"
          name="title"
          rules={[{ required: true, message: '此项不能为空！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="书籍封面"
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
          label="内容描述"
          name="content"
          rules={[{ required: true, message: '此项不能为空！' }]}
        >
          <TextArea allowClear rows={4} maxLength={250} />
        </Form.Item>

       
        <Form.Item
          label="预约人数"
          name="maximum"
          rules={[{ required: true, message: '此项不能为空！' }]}
        >
          <Input style={{width:'10rem'}} maxLength={3} />
        </Form.Item>
      </Form>
    </div>
  )
}
