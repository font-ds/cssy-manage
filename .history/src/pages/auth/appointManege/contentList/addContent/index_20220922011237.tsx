import React,{useState} from 'react'
import {Button,Divider,Form,Input,Select,DatePicker,message,TimePicker,Upload,Radio} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {addContent} from '../../../../../type/type'
import {useAddContent} from './util'
import {handleImgUrl,uploadImageBtn} from '../../../bookManage/util';

import moment from 'moment';


const { Option } = Select;
const {TextArea}=Input

export default function Index() {
    const [state,setState]=useState(-1)
    const [disabled,setDisabled]=useState(false)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 上传的图片key
    const [cover,setCover]:[any,Function]=useState('')
    // 绑定表单
    const [form] = Form.useForm<any>();
    // 新增突变
    const {mutateAsync:addContentFunc}=useAddContent(['vipmanage','viplist',state])
    // 提交
    const handleSubmit= async (value:addContent)=>{
        let data={
            ...value,
            // 根据moment属性获取时间戳
            // power_expire_date:moment(value.expired_date).unix()*1000
        }
        addContentFunc(data).then((res:any)=>{
            message.success('新增会员成功')
            setDisabled(true)
        })
    }
    
  return (
    <div>
        <span className='title'>新增会员信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              form={form}
              disabled={disabled}
              className='form'
              name="basic"
              labelCol={{ span: 3}}
              wrapperCol= {{ span: 6 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="内容分类"
                  name="type"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Select onChange={e=>setState(e)}  style={{ width: '14rem' }}>
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
                  // style={{marginTop:'-1rem'}}
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
                  name="introduction"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <TextArea allowClear rows={4} maxLength={250} />
                </Form.Item>
                
                <Form.Item
                  label="内容时间"
                  name="time"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <DatePicker placeholder='请选择日期' onChange={(e,value)=>console.log(e,value)}></DatePicker>
                  <TimePicker.RangePicker  />
                </Form.Item>
                <Form.Item
                  label="预约人数"
                  name="maximum"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="内容状态"
                  name="permission"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Radio.Group>
                        <Radio value="0"> 上架 </Radio>
                        <Radio value="1"> 下架 </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{offset:4}}>
                  
                    <Button type="primary" htmlType="submit">
                      新增
                    </Button>
                </Form.Item>
            </Form>
    </div>
  )
}
