import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { MdCheck } from 'react-icons/md'

function ServiceRegistered(props) {
  return (
    <>
      <div className="Service ServiceRegistered">
        <div className="container pt-3 pb-5">
          <Row>
            <Col>
              <div className="p-5 text-center">
                <h4 className="mb-3 text-success">
                  <MdCheck /> 您已註冊成為狗狗保姆
                </h4>
                <h6 className="mb-3 text-muted">立即前往保姆中心看看吧！</h6>
                <Link className="btn btn-theme" to="/service/admin/">
                  前往保姆中心
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default ServiceRegistered
