import React,{useState} from 'react'
import {Button,Divider,Form,Input,Select,DatePicker,message,TimePicker,Upload,Radio} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {addContent} from '../../../../../type/type'
import {useAddContent} from './util'
import {disabledDate} from '../../../../../utils/time'
import {uploadImageBtn} from '../../../bookManage/util';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const {TextArea}=Input

export default function Index() {
  const navigate=useNavigate()
    const [state,setState]=useState(-1)
    const [disabled,setDisabled]=useState(false)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 上传的图片key
    const [cover,setCover]:[any,Function]=useState('')
    // 日期
    const [date,setDate]=useState<any>('')
    // 开始时间
    const [beginTime,setBeginTime]=useState('')
    // 结束时间
    const [endTime,setEndTime]=useState('')
    // 绑定表单
    const [form] = Form.useForm<any>();
    // 新增突变
    const {mutateAsync:addContentFunc}=useAddContent(['vipmanage','viplist',state])
    // 提交
    const handleSubmit= async (value:addContent)=>{
        let data={
          type:value.type,
          title:value.title,
          cover:'picture/'+cover,
          content:value.content,
          maximum:value.maximum,
          date,
          begin_time:beginTime,
          end_time:endTime,
          state:value.state
        }
        addContentFunc(data).then((res:any)=>{
          if(res.status==0){
            message.success('新增会员成功')
            navigate(-1)
            setDisabled(true)
          }
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
                  label="内容封面"
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
                  label="内容时间"
                  name="time"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <DatePicker size='small' placeholder='请选择日期' disabledDate={disabledDate}
                    onChange={value=>{
                      if(beginTime&&endTime) form.setFieldValue('time','has')
                      setDate(moment(value,'YYYY-MM-DD'))
                    }}
                  ></DatePicker>
                  <br />
                  <TimePicker.RangePicker 
                    style={{marginTop:'1rem'}} 
                    placeholder={['开始时间','结束时间']} 
                    format='HH:mm' 
                    size='small' 
                    allowClear={false}
                    onChange={(e,value)=>{
                      if(date) form.setFieldValue('time','has')
                      setBeginTime(value[0])
                      setEndTime(value[1])
                    }} 
                  />
                </Form.Item>
                <Form.Item
                  label="预约人数"
                  name="maximum"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input style={{width:'10rem'}} maxLength={3} />
                </Form.Item>
                <Form.Item
                  label="内容状态"
                  name="state"
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
