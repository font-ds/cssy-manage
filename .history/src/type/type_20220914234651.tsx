// 用户
export interface vipUser{
    username:string,
    phone:string,
    identity_number:string,
    power:any,
    expired_date:any
}

// 书籍借阅记录
export interface bookLead{
    borrow_id:string,
    title:string,
    user_name:string,
    phone:string,
    borrow_date:string,
    state:string|number,
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
    issued:number,
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