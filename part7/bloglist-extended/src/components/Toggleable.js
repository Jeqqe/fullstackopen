import React, { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import { Container } from 'react-bootstrap'

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      {visible ? (
        <div>
          <Container style={{ padding: '10px' }}>{props.children}</Container>
          <Button
            variant='danger'
            name='Close'
            clickHandler={toggleVisibility}
          />
        </div>
      ) : (
        <div>
          <Button name={props.buttonLabel} clickHandler={toggleVisibility} />
        </div>
      )}
    </>
  )
})

Toggleable.displayName = 'Toggleable'
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Toggleable
