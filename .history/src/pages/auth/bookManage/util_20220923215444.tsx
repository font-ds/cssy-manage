import {uploadImage,getImage} from '../../../utils/cos-js-sdk'

// 图片上传
export const uploadImageBtn=(params:any,func:Function,coverFunc:Function,form:any)=>{
    uploadImage(params.file.name,params.file,function(url:any){
        let obj={
            status:'done',
            url:url.replace('http','https')
        }
        // 修改验证
        form.setFieldValue('cover','has')
        // 保存cover地址
        coverFunc(params.file.name)
        // 修改setUpFileList
        func([obj])
    })
}

// 视频上传
export const uploadVedioBtn=(params:any,func:Function,coverFunc:Function,form:any)=>{
  uploadImage(params.file.name,params.file,function(url:any){
      let obj={
          status:'done',
          url:url.replace('http','https')
      }

      // 修改验证
      if(type) form.setFieldValue('key','has')
      else form.setFieldValue('cover','has')
      // 保存cover地址
      coverFunc(params.file.name)
      // 修改setUpFileList
      func([obj])
  })
}

// 图片地址处理
export const handleImgUrl=(key:string,func:Function)=>{
  if(key.substring(0,4)!='http') {
    getImage(key,(url:string)=>{
        func([{state:'done',url}])
    })
  }
  else func([{state:'done',url:key}])
}