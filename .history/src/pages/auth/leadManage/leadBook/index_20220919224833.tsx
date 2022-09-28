import React,{useState} from 'react'
import {Button,Divider,Form,Input,Select,DatePicker,message} from 'antd';
import {useLeadOneBook} from './util'
import {bookLeadRecord} from '../../../../type/type'
import moment from 'moment';


const { Option } = Select;
export default function Index() {
    // 借阅人名字
    const [name,setName]=useState<string>('')
    // 选择日期
    const [state,setState]=useState<string>('2')
    // 表单是否可编辑
    const [disabled,setDisabled]=useState(false)
    // 新增突变
    const {mutateAsync:addVip}=useLeadOneBook(['leadmanage','leadrecordlist',-1])
    // 绑定表单
    const [form] = Form.useForm<any>();
    // 提交
    const handleSubmit= async (value:any)=>{
      console.log(any)
        form.setFieldValue('book_name','测试')
        // let data={
        //     ...value,
        //     // 根据moment属性获取时间戳
        //     power_expire_date:moment(value.expired_date).unix()*1000
        // }
        // addVip(data).then((res:any)=>{
        //     message.success('新增会员成功')
        //     setDisabled(true)
        // })
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
              wrapperCol= {{ span: 6 }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
                <Form.Item
                  label="会员手机"
                  name="phone"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="会员姓名"
                >
                  <span>{name}</span>
                </Form.Item>
                <Form.Item
                  label="借阅时长"
                  name="week"
                  initialValue={'1'}
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Select defaultValue={state} onChange={e=>setState(e)}  style={{ width: '14rem' }}>
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
                <Button style={{position:'relative',left:'40%',top:'-5rem'}} type='primary' size='small'>
                  读取书籍
                </Button>

                <Form.Item
                  label="书籍封面"
                >
                  <img src={require('../../../../assets/team.png')} style={{width:'10rem',height:'6rem'}}></img>
                </Form.Item>

                <Form.Item
                  label="书籍名称"
                  name='book_name'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="书籍作者"
                  name='book_auth'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="书籍分类"
                  name='book_tags'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="书籍语言"
                  name='language'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="出版社"
                  name='publice_by'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
                </Form.Item>
                <Form.Item
                  label="借阅权限"
                  name='permission'
                >
                  <Input disabled  style={{border:'0',backgroundColor:'white',color:'black'}}></Input>
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
