import React,{useState} from 'react'
import {Button,Divider,Form,Input,Radio,Upload,Switch} from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {cos} from '../../../../utils/cos-js-sdk'
import {book} from '../../../../type/type'


export default function Index() {
    // 禁止修改
    const [disabled,setDisabled]=useState(false)
    // 图片列表
    const [upFileList,setUpFileList]:[any,Function]=useState([])
    // 提交
    const handleSubmit= async (value:book)=>{
        let data={...value,cover:upFileList[0].url}
        console.log(data)
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
            }
          })
    }

    cos.getObject({
        Bucket: 'library-1313332868', /* 填入您自己的存储桶，必须字段 */
            Region: 'ap-chongqing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
            Key: "picture/1.png", /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
        }
    }, function(err, data) {
        console.log(err || data.Body);
    });
    
  return (
    <div className='add-book'>
        <span>新增图书信息</span>
        <Divider style={{marginTop:'1rem'}} />
        <Form
              className='form'
              name="basic"
              disabled={disabled}
              labelCol={{ span: 3}}
              wrapperCol= {{ span: 6 }}
              autoComplete="off"
            >
                <Form.Item
                  label="书籍录入ID"
                  name="id"
                  rules={[{ required: true, message: '此项不能为空！' }]}
                >
                  <Input />
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
                          fileList={upFileList} 
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
                <Form.Item wrapperCol={{offset:2,span:16}}>
                    <Button style={{marginRight:'2rem'}} size='small' type="primary" htmlType="submit">
                      保存
                    </Button>
                    <Button style={{marginLeft:'2rem'}} htmlType="reset" size='small' >
                        重置
                    </Button>
                    <Switch style={{margin:'0 1rem 0 5rem'}} checkedChildren="开启" unCheckedChildren="关闭" defaultChecked onChange={e=>console.log(e)} />
                    保存后自动进入下一本
                </Form.Item>
            </Form>
    </div>
  )
}
