import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

// 限制日期 (今天可选)
export const disabledDate: RangePickerProps['disabledDate'] = current => {
    return current && current <moment().subtract(1, "days");
  };