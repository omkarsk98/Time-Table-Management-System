import { Button, notification } from 'antd';

const Notify = (type,message,desc) => {
  notification[type]({
    message: message,
    description: desc,
  });
};

export default Notify;