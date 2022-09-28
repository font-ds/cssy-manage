import {useQuery} from '@tanstack/react-query';

import {request} from '../../../../utils/http';

const getVipList=()=>{
    request('http://127.0.0.1:4523/m1/1513755-0-default/back/vip')
}