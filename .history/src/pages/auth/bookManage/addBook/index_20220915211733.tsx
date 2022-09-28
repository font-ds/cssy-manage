import React,{useState} from 'react'
import {Button,Divider,Form,Input,FormInstance,Radio,Upload,UploadProps} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {cos} from '../../../../utils/cos-js-sdk'
import {book} from '../../../../type/type'

// import {useEditVip} from './util'

export default function Index() {
    // 获取传递过来的数据
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
    const handleSubmit= async (value:book)=>{
        console.log(value)
    }

    // 取消修改
    const concelModify=()=>{
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

    // 图片上传
    const uploadImage=(params:any)=>{
        cos.putObject({
            Bucket: 'library-1313332868', /* 填入您自己的存储桶，必须字段 */
            Region: 'ap-chongqing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
            Key: "picture/"+params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
            StorageClass: 'STANDARD',
            Body: params.file, // 上传文件对象
            onProgress: (progressData) => {
              console.log(JSON.stringify(progressData))
            //   this.percent = progressData.percent * 100
            }
          }, (err, data) => {
            console.log('腾讯工具库上传完毕')
            console.log(err || data)
            if (!err) {
              // 手动处理 fileList
              let obj={url:'http://' + data.Location,status:'done'}
              setUpFileList([obj])
              console.log(obj)
            }
          })
        
    }
    
  return (
    <div className='add-book'>
        <span>新增图书信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              className='form'
              name="basic"
              disabled={formDisable}
              labelCol={{ span: 3}}
              wrapperCol= {{ span: 6 }}
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
                          customRequest={uploadImage}
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
    </div>
  )
}
