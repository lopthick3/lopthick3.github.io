import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { FiAlertTriangle } from 'react-icons/fi'

function ServiceNoUser(props) {
  return (
    <>
      <div className="Service ServiceLoginChk">
        <div className="container pt-3 pb-5">
          <Row>
            <Col>
              <div className="p-5 text-center">
                <h4 className="mb-3 text-danger">
                  <FiAlertTriangle /> 沒有保姆資料
                </h4>
                <h6 className="mb-3 text-muted">嘗試尋找其他保姆?</h6>
                <Link className="btn btn-theme" to="/service/query">
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

export default ServiceNoUser
