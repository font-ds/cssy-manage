import React,{useState} from 'react'
import {Button,Divider,Form,Input,Select,message,Tag,Popconfirm} from 'antd';
import {useLeadOneBook,getOneBook} from './util'
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
export default function Index() {
  const navigate=useNavigate()
    // 书籍标签
    const [tags,setTags]=useState<Array<string>>([])
    // 书籍封面
    const [cover,setCover]=useState('')
    // 表单是否可编辑
    const [disabled,setDisabled]=useState(false)
    // 绑定表单
    const [form] = Form.useForm<any>();

    // 读取书籍信息
    const readBook=()=>{
      let bookId=form.getFieldValue('book_id')
      if(!bookId) return message.warn('书籍ID不能为空')
      getOneBook(bookId).then(res=>{
        console.log(res)
        res.data.permission=res.data.permission?'精品':'默认'
        form.setFieldsValue(res.data)
        setCover(res.data.cover)
        setTags(res.data.tags)
      })
    }

    // 提交
    const {mutateAsync:addBookLead}=useLeadOneBook()
    const handleSubmit= async (value:any)=>{
      console.log(value)
      let formDate=form.getFieldsValue()
      let data={
        week:formDate.week,
        phone:formDate.phone,
        book_id:formDate.book_id
      }
      addBookLead(data).then(res=>{
        message.success('书籍借阅成功')
        navigate('/leadmanage/leadmanage1')
        setDisabled(true)
      })
    }
    
  return (
    <div className='vip-add'>
        <span className='title'>新增会员信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              form={form}
              disabled={disabled}
              className='form'
              name="basic"
              labelCol={{ span: 3}}
              initialValues={{week:'1'}}
              wrapperCol= {{ span: 6 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="会员手机"
                  name="phone"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input style={{width:'50%'}} maxLength={11} minLength={11} placeholder='会员手机号(限11位)' />
                </Form.Item>
                <Form.Item
                  label="会员姓名"
                  name='vip_name'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="借阅时长"
                  name="week"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Select style={{ width: '14rem' }}>
                    <Option value="1">一周</Option>
                    <Option value="2">二周</Option>
                    <Option value="3">三周</Option>
                    <Option value="4">四周</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="借阅书籍ID"
                  name="book_id"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input></Input>
                </Form.Item>
                <Button style={{position:'relative',left:'38%',top:'-3.3rem'}} type='primary' size='small' onClick={readBook}>
                  读取书籍
                </Button>

                <Form.Item
                  label="书籍封面"
                >
                  {cover?<img src={cover} style={{width:'9rem',height:'12rem'}} alt='封面'></img>:null}
                  
                </Form.Item>

                <Form.Item
                  label="书籍名称"
                  name='title'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="书籍作者"
                  name='author'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="书籍分类"
                  name='tags'
                >
                  {
                    tags.map((item,index)=><Tag key={index}>{item}</Tag>)
                  }
                </Form.Item>
                <Form.Item
                  label="书籍语言"
                  name='language'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="出版社"
                  name='publish_by'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="借阅权限"
                  name='permission'
                >
                  <Input disabled style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>

                <Form.Item wrapperCol={{offset:4}}>
                  <Popconfirm
                      placement="topRight"
                      title={'是否删除该会员'}
                      onConfirm={()=>form.submit()}
                      okText="确认"
                      cancelText="取消"
                    >
                    <Button type="primary">新增</Button>
                  </Popconfirm>
                </Form.Item>
            </Form>
    </div>
  )
}
