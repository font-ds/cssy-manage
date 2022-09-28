import {useMutation,QueryKey} from '@tanstack/react-query';
import {useRequest} from '../../../../utils/http';
import {book} from '../../../../type/type';
import {useAddConfig} from '../../../../utils/use-optimistic-options';

export const useAddBook=(queryKey:QueryKey)=>{
    const request=useRequest()
    return useMutation((params:book)=>
        request('http://127.0.0.1:4523/m1/1513755-0-default/back/book',
        {
            method:'post',
            data:params
        }
        ),useAddConfig(queryKey)
    )
}