import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import {
  SctollToTop,
  getDataFromServer,
} from '../../../utils/service/ServiceFunction'
import { MdLibraryBooks, MdComment, MdAttachMoney } from 'react-icons/md'
import ServiceAdminHomeChart from '../../../components/service/ServiceAdminHomeChart'
//引入自己的scss
import '../../../css/service/style.scss'

function ServiceAdminHome(props) {
  const userId = props.sUserId
  const [orderO01, setOrderO01] = useState([])
  const [amt, setAmt] = useState(0)
  const [comment, setComment] = useState([])
  //設定載入狀態
  useEffect(() => {
    // console.log(props.sUserId)
    //返回最頂端
    SctollToTop()
    //取得未審核訂單資料
    const orderList = getDataFromServer(
      `http://localhost:6001/service/order/${userId}?orderStsId='o01'`
    )
    Promise.resolve(orderList).then((data) => {
      setOrderO01(data)
    })
    //取得評論
    const commentData = getDataFromServer(
      `http://localhost:6001/service/comment/${userId}`
    )
    Promise.resolve(commentData).then((data) => {
      setComment(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])
  const callbackAmtData = (child) => {
    setAmt(child)
  }
  return (
    <>
      <div className="ServiceAdminHome">
        <h3 className="my-3">{props.sUserName} 您好</h3>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">訂單總覽</h5>
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md="4" className="d-flex align-items-center mb-3">
                    <div className="bg-danger text-white rounded-circle icon p-3">
                      <MdLibraryBooks size={24} />
                    </div>
                    <h6 className="ml-2 mb-0">待處理訂單</h6>
                    <h1 className="ml-auto mb-0">{orderO01.length}</h1>
                  </Col>
                  <Col md="4" className="d-flex align-items-center mb-3">
                    <div className="bg-warning text-white rounded-circle icon p-3">
                      <MdAttachMoney size={24} />
                    </div>
                    <h6 className="ml-2 mb-0">總收入</h6>
                    <h1 className="ml-auto mb-0">${amt}</h1>
                  </Col>
                  <Col md="4" className="d-flex align-items-center mb-3">
                    <div className="bg-success text-white rounded-circle icon p-3">
                      <MdComment size={24} />
                    </div>
                    <h6 className="ml-2 mb-0">評論數</h6>
                    <h1 className="ml-auto mb-0">{comment.length}</h1>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="chart">
                    <ServiceAdminHomeChart
                      sUserId={userId}
                      parentAmtData={callbackAmtData}
                    />
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col className="text-center">
                    <Link
                      to="/service/admin/order/"
                      className="btn btn-sm btn-theme"
                    >
                      查看所有訂單
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default withRouter(ServiceAdminHome)
