import { QueryKey, useQueryClient } from "@tanstack/react-query";

// queryKey需要修改的那个key
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any) => any
) => {
  const queryClient = useQueryClient();
  return {
    //默认乐观返回，去设置传入的目标值，当失败时回退状态
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 突变过程 target需要进行操作的一个 old原来的数据列表
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    // 失败之后返回之前
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};
//对象修改
export const useSingleEditConfig = (queryKey: QueryKey, key: string = "id") =>
  useConfig(queryKey, (target, old) => target);

export const useEditConfig = (queryKey: QueryKey, key: string = "id") =>
  useConfig(queryKey, (target, old) => {
    if (!old?.length)
      return (
        old?.data?.map((item: any) =>
          item[key] === target[key] ? { ...item, ...target } : item
        ) || []
      );
    else
      return (
        old?.map((item: any) =>
          item[key] === target[key] ? { ...item, ...target } : item
        ) || []
      );
  });

//数组删除
export const useDeleteConfig = (queryKey: QueryKey, key: string = "id") =>
  useConfig(queryKey, (target, old) => {
    //数组删除
    if (target instanceof Array) {
      let set = new Set(target.map((item: any) => item[key]));
      if (!old?.length)
        return old?.data?.filter((item: any) => !set.has(item[key])) || [];
      else return old?.filter((item: any) => !set.has(item[key])) || [];
    } else {
      if (!old?.length)
        return (
          old?.data?.filter((item: any) => item[key] !== target[key]) || []
        );
      else return old?.filter((item: any) => item[key] !== target[key]) || [];
    }
  });

// 增加
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    if (!old?.length) return old?.data ? [target, ...old?.data] : [];
    else return old ? [target, ...old] : [];
  });
