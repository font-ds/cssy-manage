import {useQuery,QueryKey,useMutation} from '@tanstack/react-query';
import {useEditConfig,useDeleteConfig} from '../../../../../utils/use-optimistic-options'
import {request} from '../../../../../utils/http';
import {teacherList} from '../../../../../type/type'