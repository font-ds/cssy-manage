import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { vipUser } from "../../../../type/type";
import { useDeleteConfig } from "../../../../utils/use-optimistic-options";
import { useRequest } from "../../../../utils/http";

// 获取会员列表
export const useGetVipList = (
  page: any,
  state: any,
  keyword: any,
  type: any
) => {
  console.log(type);

  const request = useRequest();
  return useQuery(
    ["vipmanage", "viplist", page, state, keyword, type],
    async () => {
      const res = await request(
        `/back/vip?power=${state}&page=${page}&limit=20&keyword=${
          keyword || ""
        }&type=${type}`
      );
      let data = {
        pagination: { totle: res.page * 20, pageSize: 20 },
        data: res.data,
      };
      return data;
    },
    { keepPreviousData: true }
  );
};

// 删除会员
export const useDelVip = (queryKey: QueryKey) => {
  const request = useRequest();
  return useMutation((params: vipUser) => {
    return request("/back/vip?phone=" + params.phone, { method: "delete" });
  }, useDeleteConfig(queryKey, "phone"));
};
