import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

import css from './ShowNotification.module.scss';

export const showNotification = (obj: ArgsProps) => {
  return notification.open({ ...obj, className: css.notification });
};
