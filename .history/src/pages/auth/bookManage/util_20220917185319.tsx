import {uploadImage,getImage} from '../../../utils/cos-js-sdk'

// 图片上传
export const uploadImageBtn=(params:any,func:Function,coverFunc:Function)=>{
    uploadImage(params.file.name,params.file,function(url:any){
        let obj={
            status:'done',
            url:url.replace('http','https')
        }
        coverFunc(params.file.name)
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