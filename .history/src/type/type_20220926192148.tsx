// 登录
export interface loginConfig{
    username:string,
    password:string
}

// 用户
export interface vipUser{
    username:string,
    phone:string,
    identity_number?:string,
    power:any,
    expired_date:any
}

// 预约记录
export interface appointRecord{
    type:string,
    name:string,
    reserve_id:string,
    user_name:string,
    phone:string,
    reserve_date:string,
    state:string|number,
    record_date:string,
    reserve_time:string
}

// 优惠券
export interface coupon{
    coupon_id:string,
    coupon_name:string,
    amount:number,
    expired_date:string,
    issued:any,
    max:string,
    state:string
}

// 优惠券记录
export interface couponRecord{
    coupon_id:string,
    vip_name:string,
    coupon_name:string,
    amount:number,
    expired_date:string,
    phone:string,
    state:string
}

// 新增优惠券
export interface addCoupon{
    coupon_name:string,
    amount:number,
    expired_date:any,
    max:number
}

// 书籍信息
export interface book{
    id?:string,
    introduction?:string,
    isbn?:string,
    title?:string,
    cover?:string,
    author?:string,
    tags?:Array<string>,
    language?:string,
    publish_by?:string,
    permission?:any,
    state?:any,
}

// 书籍借阅记录
export interface bookLeadRecord {
    /**
     * 借阅日期
     */
    borrow_date: string;
    /**
     * 借阅id
     */
    borrow_id: string;
    /**
     * 手机号
     */
    phone: string;
    /**
     * 借阅状态
     */
    state: string|number;
    /**
     * 标题
     */
    title: string;
    /**
     * 用户名
     */
    user_name: string;
}

// 借阅书籍请求参数
export interface leadBookParams{
    book_id:string,
    phone:string,
    week:string
}

// 预约记录
export interface appointListRecord {
    /**
     * 活动名
     */
    name: string;
    /**
     * 手机号
     */
    phone: string;
    /**
     * 记录产生日期
     */
    record_date: string;
    /**
     * 活动日期
     */
    reserve_date: string;
    /**
     * 预约记录id
     */
    reserve_id: string;
    /**
     * 活动时间
     */
    reserve_time: string;
    /**
     * 预约状态，0:已预约 1:已完成 2:已取消
     */
    state: string;
    /**
     * 预约类型， 0:功能阅读 1:特色内容 2:金牌讲师
     */
    type: string;
    /**
     * 用户名
     */
    user_name: string;
}

// 特色内容
export interface contentList {
    /**
     * 内容
     */
    content: string;
    /**
     * 封面
     */
    cover: string;
    /**
     * 日期
     */
    date: string;
    /**
     * 特色内容id
     */
    id: number;
    /**
     * 最大人数
     */
    maximum: number;
    /**
     * 已预约人数
     */
    reserved: number;
    /**
     * 时间
     */
    time: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 分类
     */
    type: string;
}

// 新增特色内容
export interface addContent{
    title:string,
    type:string,
    cover:string,
    content:string,
    date:string,
    begin_time:string,
    end_time:string,
    maximum:number,
    state:string
}

// 导读师列表
export interface teacherList {
    /**
     * 头像key
     */
    avatar: string;
    /**
     * 天数，长度为7，索引0为今天，1为明天
     */
    day: Array<boolean[]>;
    /**
     * 简介
     */
    introduction: string;
    /**
     * 标签
     */
    label: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 状态，0:下班 1:上班
     */
    state: number;
    /**
     * 导读师id
     */
    tutor_id: string;
}


// 新增导读师
export interface addTeacherConfig {
    /**
     * 头像，key
     */
    avatar: string;
    /**
     * 介绍
     */
    introduction: string;
    /**
     * 标签
     */
    label: string;
    /**
     * 姓名
     */
    name: string;
}

 // 修改导读师
export interface editTeacherConfig{
    /**
     * 头像，key
     */
    avatar: string;
    /**
     * 介绍
     */
    introduction: string;
    /**
     * 标签
     */
    label: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * 导师id
     */
    tutor_id: string;
}

// 修改上下班时间
export interface changeTimeConfig{
    date:string,
    peirod:number,
    to_state:string,
    tutor_id:string,

}

// 电子图书列表
export interface onlineList {
    /**
     * 对象存储中的key
     */
    key: string;
    /**
     * 封面对象存储中的key
     */
    cover: string;
    /**
     * 状态，0:上架 1:下架
     */
    state: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 电子书id
     */
    video_id: string;
}

export interface addOnline {
    /**
     * 视频key
     */
    key: string;
    /**
     * 状态
     */
    state: number;
    /**
     * 标题
     */
    title: string;
    /**
     * 封面
     */
    cover: string;
    /**
     * 
     */
    vedio: string;
}
