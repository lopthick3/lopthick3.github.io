import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { FiAlertTriangle } from 'react-icons/fi'

function ServiceAdminApplyChk(props) {
  return (
    <>
      <div className="Service ServiceLoginChk">
        <div className="container pt-3 pb-5">
          <Row>
            <Col>
              <div className="p-5 text-center">
                <h4 className="mb-3 text-danger">
                  <FiAlertTriangle /> 您尚未開通保姆服務
                </h4>
                <h6 className="mb-3 text-muted">請先申請以使用保姆服務</h6>
                <Link className="btn btn-theme" to="/service/apply">
                  前往申請
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default ServiceAdminApplyChk
