// 用户
export interface vipUser{
    username:string,
    phone:string,
    identity_number:string,
    power:any,
    power_expire_date:any
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