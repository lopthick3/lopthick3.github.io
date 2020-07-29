import React from 'react'
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ServiceAdminBreadcrumb from '../../../components/service/admin/ServiceAdminBreadcrumb'
import { MdReply } from 'react-icons/md'
//引入自己的scss
import '../../../css/service/style.scss'

function ServiceAdminMessage(props) {
  return (
    <>
      <div className="ServiceAdminMessage">
        <ServiceAdminBreadcrumb pagename="訊息" />
        <ListGroup>
          <ListGroup.Item className="d-flex justify-content-between">
            <div className="message">
              <h6 className="member">
                會員1<span className="badge badge-danger ml-3">新訊息</span>
              </h6>
              <small>2020/02/02</small>
              <div className="message-content">
                訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息
              </div>
            </div>
            <div className="flex-grow">
              <Link
                to="/service/admin/message/m202003170001"
                className="btn btn-sm btn-primary ml-auto"
              >
                <MdReply />
              </Link>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <div className="message">
              <h6 className="member">會員1</h6>
              <small>2020/02/02</small>
              <div className="message-content">
                訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息
              </div>
            </div>
            <div className="flex-grow">
              <Link
                to="/service/admin/message/m202003170001"
                className="btn btn-sm btn-primary ml-auto"
              >
                <MdReply />
              </Link>
            </div>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <div className="message">
              <h6 className="member">會員1</h6>
              <small>2020/02/02</small>
              <div className="message-content">
                訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息訊息
              </div>
            </div>
            <div className="flex-grow">
              <Link
                to="/service/admin/message/m202003170001"
                className="btn btn-sm btn-primary ml-auto"
              >
                <MdReply />
              </Link>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  )
}

export default ServiceAdminMessage
