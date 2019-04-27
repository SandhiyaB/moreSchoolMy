import React from 'react';
import { askForPermissioToReceiveNotifications } from './push-notification';
const NotificationButton = () => (
    <button onClick={askForPermissioToReceiveNotifications} >
     Click Here For Notification
    </button>
);
export default NotificationButton;