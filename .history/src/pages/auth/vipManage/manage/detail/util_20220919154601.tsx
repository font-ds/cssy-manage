import {useMutation,QueryKey} from '@tanstack/react-query'
import {request} from '../../../../../utils/http'
import {useEditConfig} from '../../../../../utils/use-optimistic-options'
// import {} from '../../../../../type/type'


// 修改会员信息 --待完善
export const useEditVip = (queryKey: QueryKey) => {
    // const client = useRequest();
    return useMutation(
      (params) =>
        request(`http://127.0.0.1:4523/m1/1513755-0-default/back/vip`, {
          method: "put",
          data: params,
        }),
      useEditConfig(queryKey,'vip_id')
    );
  };
