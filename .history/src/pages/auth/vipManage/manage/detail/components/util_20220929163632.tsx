import { useQuery } from "@tanstack/react-query";
import { useRequest } from "../../../../../../utils/http";

// 获取书籍借阅
export const useGetBookLead = (phone: any) => {
  const request = useRequest();
  return useQuery(["vipmanage", "detail", "booklead", phone], async () => {
    const res = await request("/back/vip/borrow?phone=" + phone);
    return res.data;
  });
};

// 获取预约记录
export const useGetAppoint = (phone: any) => {
  const request = useRequest();
  return useQuery(["vipmanage", "detail", "appoint", phone], async () => {
    const res = await request("/back/vip/reserve?phone=" + phone);
    return res.data;
  });
};
