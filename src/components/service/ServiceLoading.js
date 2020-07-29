import React from 'react'
import { Spinner } from 'react-bootstrap'

function ServiceLoading(props) {
  return (
    <>
      <div className="loading-spinner">
        <Spinner animation="border" variant="secondary" />
      </div>
    </>
  )
}

export default ServiceLoading
