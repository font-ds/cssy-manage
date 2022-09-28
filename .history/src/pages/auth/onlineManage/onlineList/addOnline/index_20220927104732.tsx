import React,{useState} from 'react'
import {Button,Divider,Form,Input,message,Radio,Upload} from 'antd';
import {addOnline} from '../../../../../type/type'
import { PlusOutlined ,UploadOutlined} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import {useAddOnline} from './util'
import { useNavigate } from 'react-router-dom'
import {uploadImageBtn,uploadVedioBtn} from '../../../bookManage/util'


export default function Index() {
    const navigate=useNavigate()

    // 表单是否禁用
    const [disabled,setDisabled]=useState(false)
    // 封面
    const [cover,setCover]=useState('')
    // 视频
    const [key,setKey]=useState('')
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 绑定表单
    const [form] = Form.useForm<addOnline>();
    // 新增突变
    const {mutateAsync:addVip}=useAddOnline(['onlinemanage','onlinelist',0])
    // 提交
    const handleSubmit= async (value:addOnline)=>{
        let data={
            ...value,
            cover,
            key
        }
        addVip(data).then((res:any)=>{
            message.success('新增电子图书成功')
            setDisabled(true)
        })
    }
    
  return (
    <div className='vip-add'>
        <span className='title'>新增电子图书</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              form={form}
              disabled={disabled}
              className='form'
              name="basic"
              labelCol={{offset:1}}
              wrapperCol= {{ span: 6 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="视频标题"
                  name="title"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input maxLength={25} placeholder='视频标题(限25字)' />
                </Form.Item>
                <Form.Item
                  label="视频封面"
                  name="cover"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                   <ImgCrop aspect={16/9}>
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
                  label="视频内容"
                  name="key"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Upload
                    maxCount={1} 
                    customRequest={e=>uploadVedioBtn(e,setUpFileList,setKey,form)}
                    onRemove={()=>{form.setFieldValue('key',null)}}
                  >
                    <Button icon={<UploadOutlined />}>上传视频</Button> &nbsp;支持扩展名：mp4
                  </Upload>
                </Form.Item>
                <Form.Item
                  label="视频状态"
                  name="state"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Radio.Group>
                        <Radio value="0"> 上架 </Radio>
                        <Radio value="1"> 下架 </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item  wrapperCol={{offset:3}}>
                  
                    <Button style={{marginRight:'2rem',marginTop:'2rem'}} type="primary" htmlType="submit">
                      新增
                    </Button>
                    <Button style={{marginLeft:'2rem'}} type="primary" onClick={()=>navigate(-1)}>
                      取消
                    </Button>
                </Form.Item>
            </Form>
    </div>
  )
}
