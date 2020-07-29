import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { FiAlertTriangle } from 'react-icons/fi'

function ServiceNoOrder(props) {
  return (
    <>
      <div className="Service ServiceLoginChk">
        <div className="container pt-3 pb-5">
          <Row>
            <Col>
              <div className="p-5 text-center">
                <h4 className="mb-3 text-danger">
                  <FiAlertTriangle /> 無法評價
                </h4>
                <h6 className="mb-3 text-muted">沒有這筆資料</h6>
                <Link className="btn btn-theme" to="/service">
                  返回列表
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default ServiceNoOrder
