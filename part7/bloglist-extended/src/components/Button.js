import React from 'react'

import { Button } from 'react-bootstrap'

const CustomButton = ({ name, variant, clickHandler }) => {
  return (
    <Button variant={variant} onClick={clickHandler}>
      {name}
    </Button>
  )
}

export default CustomButton
