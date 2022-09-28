import React,{useState} from 'react'
import {Button,Divider,Form,Input,FormInstance,Radio,Upload,UploadProps} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useLocation } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import RecordTable from './recordTable/index';

// import {useEditVip} from './util'

export default function Index() {
    // 获取传递过来的数据
    const {state}:{state:any} = useLocation()
    // 控制表单是否可填写
    const [formDisable,setFormDisable]=useState(true)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' 
      }])
    // 绑定表单
    const [form] = Form.useForm<FormInstance>();

    // 提交
    const handleSubmit= async ()=>{
        console.log(111)
        const data=await form.validateFields()
        console.log(data)
        
    }

    // 取消修改
    const concelModify=()=>{
        form.setFieldsValue(state);
        setUpFileList([{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' 
          }])
        setFormDisable(true);

    }

    // 修改图片
    const uoloadFileChange:UploadProps['onChange']=({fileList:newFileList})=>{
        console.log(newFileList)
        setUpFileList(newFileList);
    }
    
  return (
    <div className='vip-detail'>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <span>书籍信息</span>
            {
                formDisable?<Button size='small' type='primary' onClick={()=>setFormDisable(false)}>修改信息</Button>:
                <div>
                    <Button size='small' type='default' onClick={concelModify}>取消</Button>
                    <Button style={{marginLeft:'1rem'}} size='small' type='primary' onClick={handleSubmit}>保存</Button>
                </div>
            }
        </div>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              form={form}
              className='form'
              name="basic"
              disabled={formDisable}
              labelCol={{ span: 3}}
              wrapperCol= {{ span: 6 }}
              initialValues={state}
              autoComplete="off"
            >
                <Form.Item
                  label="书籍录入ID"
                  name="id"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item
                  label="图书ISBN"
                  name="isbn"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="书籍封面"
                  name="cover"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <ImgCrop>
                        <Upload 
                          defaultFileList={upFileList} 
                          fileList={upFileList} 
                          onChange={uoloadFileChange}
                          maxCount={1} 
                          action="/upload.do" 
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
                  label="书籍名称"
                  name="title"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                  label="书籍作者"
                  name="author"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                  label="书籍分类"
                  name="tags"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                  label="书籍语言"
                  name="language"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                  label="出版社"
                  name="publish_by"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                  label="借阅权限"
                  name="permission"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                    <Radio.Group>
                        <Radio value="0"> 默认 </Radio>
                        <Radio value="1"> 精品 </Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
            <div>书籍借阅历史</div>
            <Divider style={{marginTop:'1rem'}} />
            <RecordTable id={state.id}></RecordTable>
    </div>
  )
}
