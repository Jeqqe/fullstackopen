import React from 'react'

const Notification = ({ announcement }) => {
	if (announcement === null) {
		return null
	}

	switch(announcement.type.toLowerCase()) {
		case 'success':
			return (
				<div className='notificationSuccess'>
					{announcement.message}
				</div>
			)
		case 'error':
			return (
				<div className='notificationError'>
					{announcement.message}
				</div>
			)
		default:
			return null
	}
}

export default Notification