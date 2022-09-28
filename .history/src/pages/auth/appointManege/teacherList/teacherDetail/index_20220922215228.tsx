import React,{ useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom'
import {addTeacherConfig} from '../../../../../type/type';
import {Button,Divider,Form,Input,Col, message,Popconfirm,Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {handleImgUrl,uploadImageBtn} from '../../../bookManage/util';
import {useEditTeacher,getTime} from './util';
import './index.scss'

const {TextArea}=Input

export default function Index() {
    let {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 上传的图片key
    const [avator,setAvator]:[any,Function]=useState('')
    // swiper
    const [swiperCurrent,setSwiperCurrent]=useState(0)
    // 上班时间
    const [onlineList,setOnlineList]=useState<Array<Array<boolean>>>([])
    // 绑定表单
    const [form] = Form.useForm<addTeacherConfig>();
    let topChoose=getTime(new Date().getTime())
    console.log(topChoose)
    //初始化
    useEffect(()=>{
  
    },[])
    // 提交
    const {mutateAsync:editTeacher}=useEditTeacher(['appointmanage','teacherlist',state.page,state.state])
    const handleSubmit=()=>{
      let formData=form.getFieldsValue()
      let data={...formData,tutor_id:state.tutor_id,avator}
      editTeacher(data).then(res=>{
        message.success('修改成功')
        state={...state,...data}
      })
    }

    // 取消
    const concelModify=()=>{
      setFormDisable(true);
      setUpFileList(handleImgUrl(state.avatar,setUpFileList))
      form.setFieldsValue(state)
    }
  return (
    <div className='appoint-teacher'>
      <div style={{display:'flex'}}>
        <Col span={14}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>导读师信息</span>
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
              // labelCol={{ span: 2}}
              wrapperCol= {{ span: 12 }}
              autoComplete="off"
            >
                  <Form.Item
                    label="导读师名称"
                    name="name"
                    rules={[{ required: true, message: '此项不能为空！' }]}
                  >
                    <Input style={{width:'75%'}} maxLength={20} placeholder="限20字" /> 
                  </Form.Item>
                 <Form.Item
                    label="导读师头像"
                    name='avator'
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
                    label="导读师标签"
                    name='label'
                    rules={[{ required: true, message: '此项不能为空！' }]}
                  >
                    <Input  style={{width:'75%'}} maxLength={10} placeholder="限10字"></Input>
                  </Form.Item>
        </Form>
        </Col>
        <Col style={{paddingLeft:'2rem'}} span={9}>
          <span>导读师上班时段</span>
          <Divider style={{marginTop:'1.15rem'}} />
          <div className='out-div'>
            {topChoose.map((item,index)=>{
              return  <div key={index}  
                className='choose-item' 
                onClick={()=>setSwiperCurrent(index)}
                style={{
                  backgroundColor:swiperCurrent==index?'#20C58D':'',
                  color:swiperCurrent==index?'white':''
                }}
              >
              <div className='top'>{item.week}</div>
              <div className='bottom'>{item.day}</div>
            </div>
            })}
            <div>
              {onlineList.map(item=>
                item.map((bottomItem,index)=>{
                  return <div key={'time'+index}>{10+index/2}:{0+index%2*3}0-{10+(index+1)/2}:{0+(index+1)%2*3}0</div>
                })
              )}
            </div>
          </div>
        </Col>
      </div>
    </div>
  )
}
