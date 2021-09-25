import React from 'react'

const Notification = ({ notification }) => {
    const getNotificationStyle = () => {
        switch (notification.type.toLowerCase()) {
            case 'success':
                return 'notificationSuccess'
            case 'error':
                return 'notificationError'
            default:
                return null
        }
    }

    if (notification === null) {
        return null
    }
    return <div className={getNotificationStyle()}>{notification.message}</div>
}

export default Notification
