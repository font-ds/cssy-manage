import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import {contentList} from '../../../../../type/type';
import {Button,Divider,Form,Input,FormInstance,DatePicker, message,Popconfirm,Radio,Select,Upload,TimePicker} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {disabledDate} from '../../../../../utils/time'
import {handleImgUrl,uploadImageBtn} from '../../../bookManage/util';
import moment from 'moment';
import ListModal from './listModal'
import { useEditContent } from './util';
const {Option}=Select
const {TextArea}=Input

export default function Index() {
    const {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 弹窗显示
    const [listModal,setListModal]=useState(false)
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
    const [form] = Form.useForm<FormInstance>();

    // 初始化
    useEffect(()=>{
      handleImgUrl(state.cover,setUpFileList)
      setDate(state?.data)
      setBeginTime(state?.begin_time)
      setEndTime(state?.end_time)
    },[])
    // 提交
    const {mutateAsync:editContent}=useEditContent(['appointmanage','contentlist',state.page,state.state])
    const handleSubmit=()=>{
      let formData=form.getFieldsValue()
      let data={...formData,cover,date,beginTime,endTime}
      editContent(data).then(res=>{
        message.success('特色内容修改成功')
        setFormDisable(true);
      })
    }
    // 取消
    const concelModify=()=>{
      setDate(state.data)
      setBeginTime(state.begin_time)
      setEndTime(state.end_time)
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
          label="内容时间"
          name="date"
          rules={[{ required: true, message: '此项不能为空！' }]}
        >
          <DatePicker size='small' placeholder='请选择日期' disabledDate={disabledDate}
            defaultValue={moment(state.data,'YYYY-MM-DD')}
            onChange={value=>{
              if(beginTime&&endTime) form.setFieldValue('date','has')
              setDate(moment(value,'YYYY-MM-DD'))
            }}
          ></DatePicker>
          <br />
          <TimePicker.RangePicker 
            style={{marginTop:'1rem'}} 
            defaultValue={[moment(state.begin_time,'HH:mm'),moment(state.end_time,'HH:mm')]}
            placeholder={['开始时间','结束时间']} 
            format='HH:MM' 
            size='small' 
            allowClear={false}
            onChange={(e,value)=>{
              if(date) form.setFieldValue('date','has')
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
      </Form>

      {
        listModal?<ListModal id={state.id} visible={listModal} closeFunc={setListModal}></ListModal>:null
      }
    </div>
  )
}
