import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ServiceMessageDialog from '../../../components/service/bk/ServiceMessageDialog'
//引入自己的scss
import '../../css/service/style.scss'

function ServiceMessage(props) {
  return (
    <>
      <div className="ServiceMessage">
        <Row>
          <Col className="mb-5">
            <ServiceMessageDialog />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ServiceMessage
