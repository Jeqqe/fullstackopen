import React from 'react'
const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    switch (notification.type.toLowerCase()) {
        case 'success':
            return (
                <div className='notificationSuccess'>
                    {notification.message}
                </div>
            )
        case 'error':
            return (
                <div className='notificationError'>{notification.message}</div>
            )
        default:
            return null
    }
}

export default Notification
