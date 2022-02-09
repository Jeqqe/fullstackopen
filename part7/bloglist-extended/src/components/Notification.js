import React from 'react'
import { connect } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  return props.notification === '' ? '' : <Alert>{props.notification}</Alert>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notification)
export default ConnectedNotifications
