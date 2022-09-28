import React,{useEffect,useState} from 'react'
import {Button,Divider,Form,Input,FormInstance,Upload,Radio, message,Popconfirm} from 'antd';
import { useLocation } from 'react-router-dom'
import { PlusOutlined ,UploadOutlined} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import {uploadImageBtn,handleImgUrl,uploadVedioBtn} from '../../../bookManage/util'
import {useEditOnline} from './util'
import {onlineList} from '../../../../../type/type'

export default function Index() {
    // 获取传递过来的数据
    let {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 封面
    const [cover,setCover]=useState('')
    // 视频
    const [key,setKey]=useState('')
    // 控制表单是否可填写
    const [keyFileList,setKeyFileList]:[any,Function]=useState(true)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 绑定表单
    const [form] = Form.useForm<onlineList>();
    // 数据初始化
    useEffect(()=>{
      handleImgUrl(state.cover,setUpFileList)
      handleImgUrl(state.cover,setKeyFileList,state.title)
    },[])
    // 提交
    const {mutateAsync:editOnline}=useEditOnline(['onlinemanage','onlinelist',state.page])
    const handleSubmit= async ()=>{
        const formData=await form.validateFields()
        const data={...formData,key,cover}
        editOnline(data).then(res=>{
          message.success('会员信息修改成功')
          setFormDisable(true)
          state={...state,...data}
        })
        
    }
    
  return (
    <div className='vip-detail'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>电子图书详情</span>
            {
                formDisable?
                <Button size='small' type='primary' onClick={()=>setFormDisable(false)}>修改信息</Button>:
                <div>
                    <Button size='small' type='default' onClick={()=>{setFormDisable(true);form.setFieldsValue(state)}}>取消</Button>
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
              className='form'
              name="basic"
              disabled={formDisable}
              wrapperCol= {{ span: 6 }}
              initialValues={state}
              autoComplete="off"
            >
                <Form.Item
                  label="视频标题"
                  name="title"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
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
                    onRemove={()=>{setKey('');form.setFieldValue('key',null)}}
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
            </Form>
    </div>
  )
}
