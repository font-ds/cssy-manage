// 用户
export interface vipUser{
    username:string,
    phone:string,
    identity_number:string,
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
    expired_date:string,
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
    state: string;
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