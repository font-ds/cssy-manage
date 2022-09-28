// 书籍借阅记录
export interface bookLead{
    borrow_id:string,
    title:string,
    user_name:string,
    phone:string,
    borrow_date:string,
    state:string|number,
}