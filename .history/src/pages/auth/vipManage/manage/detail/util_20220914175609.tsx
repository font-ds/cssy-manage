import {useMutation,QueryKey} from '@tanstack/react-query'
import {useRequest,request} from '../../../../../utils/http'
import {useEditConfig} from '../../../../../utils/use-optimistic-options'
// import {} from '../../../../../type/type'

export const useEditVip = (queryKey: QueryKey) => {
    // const client = useRequest();
    return useMutation(
      (params) =>
        request(`/employee/addEmployee`, {
          method: "POST",
          data: params,
        }),
      useEditConfig(queryKey)
    );
  };