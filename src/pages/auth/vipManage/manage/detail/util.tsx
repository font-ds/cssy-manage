import {useMutation,QueryKey} from '@tanstack/react-query'
import {useRequest} from '../../../../../utils/http'
import {useEditConfig} from '../../../../../utils/use-optimistic-options'
// import {} from '../../../../../type/type'


export const useEditVip = (queryKey: QueryKey) => {
    const request = useRequest();
    return useMutation(
      (params) =>
        request(`/back/vip`, {
          method: "put",
          data: params,
        }),
      useEditConfig(queryKey,'vip_id')
    );
  };
