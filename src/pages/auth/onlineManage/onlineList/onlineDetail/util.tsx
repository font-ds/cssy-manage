import {useMutation,QueryKey} from '@tanstack/react-query'
import {useRequest} from '../../../../../utils/http'
import {useEditConfig} from '../../../../../utils/use-optimistic-options'
import {onlineList} from '../../../../../type/type'


export const useEditOnline = (queryKey: QueryKey) => {
    const request = useRequest();
    return useMutation(
      (params:onlineList) =>
        request(`/back/vip`, {
          method: "put",
          data: params,
        }),
      useEditConfig(queryKey,'vip_id')
    );
  };
