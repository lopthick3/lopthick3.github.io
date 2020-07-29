import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Button, Card } from 'react-bootstrap'
import { FaCheck, FaTimes } from 'react-icons/fa'
import ServiceGoBack from '../../../components/service/ServiceGoBack'
import Swal from 'sweetalert2'
import {
  SctollToTop,
  getDataFromServer,
  calcTimeDiff,
} from '../../../utils/service/ServiceFunction'
//引入自己的scss
import '../../../css/service/style.scss'

function ServiceAdminOrderDetail(props) {
  const [member, setMember] = useState([])
  const [ordersts, setOrdersts] = useState([])
  const [type, setType] = useState([])
  const [size, setSize] = useState([]) //狗狗體型(service_size的資料)
  const [extra, setExtra] = useState([]) //額外服務(service_extra的資料)
  const [order, setOrder] = useState([])
  const [isSend, setIsSend] = useState(false) //防止重複點選

  //改變訂單狀態
  const handleSubmit = (orderStsId) => {
    setIsSend(true)
    //設定彈跳訊息狀態
    let title, text, icon
    if (orderStsId === 'o02') {
      title = '確認接受預約'
      text = '確認以進行後續服務'
    } else if (orderStsId === 'o05') {
      title = '確認取消預約?'
      text = '取消後將無法再進行服務'
    }
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#cea160',
      cancelButtonColor: '#8f8f8f',
      confirmButtonText: '確認',
      cancelButtonText: '返回',
    }).then((result) => {
      if (result.value) {
        fetch(
          `http://localhost:6001/service/orderdetail/ordersts/${props.match.params.orderId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ordersts: orderStsId,
            }),
          }
        )
          .then((r) => r.json())
          .then((obj) => {
            if (orderStsId === 'o02') {
              title = '已接受預約'
              icon = 'success'
            } else if (orderStsId === 'o05') {
              title = '已取消預約'
              icon = 'error'
            }
            Swal.fire({
              title: title,
              icon: icon,
              showConfirmButton: false,
              timer: 1500,
            }).then((result) => {
              window.location.reload()
            })
          })
      } else {
        setIsSend(false)
      }
      return false
    })
  }

  useEffect(() => {
    //返回最頂端
    SctollToTop()
    //取得訂單狀態定義
    const orderState = getDataFromServer(
      'http://localhost:6001/service/ordersts'
    )
    Promise.resolve(orderState).then((data) => {
      setOrdersts(data)
    })
    //取得服務類型資料
    const sTypeData = getDataFromServer('http://localhost:6001/service/type')
    Promise.resolve(sTypeData).then((data) => {
      setType(data)
    })
    //取得狗狗體型資料
    const dogSize = getDataFromServer('http://localhost:6001/service/size')
    Promise.resolve(dogSize).then((data) => {
      setSize(data)
    })
    //取得額外服務
    const sExtra = getDataFromServer('http://localhost:6001/service/extra')
    Promise.resolve(sExtra).then((data) => {
      //額外項目
      setExtra(data)
    })
    //取得所有訂單資料
    const orderList = getDataFromServer(
      `http://localhost:6001/service/orderdetail/${props.match.params.orderId}`
    )
    Promise.resolve(orderList).then((data) => {
      setOrder(data)
      // //取得會員
      if (data.length !== 0) {
        const memberData = getDataFromServer(
          `http://localhost:6001/service/member?mId=${data[0].mId}`
        )
        Promise.resolve(memberData).then((data) => {
          setMember(data)
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {order.length ? (
        order.map((v, i) => (
          <div className="ServiceAdminOrderDetail" key={i}>
            <ServiceGoBack prevUrl="/service/admin/order/" />
            <Card className="border-0">
              <Card.Body>
                <h5>訂單資訊</h5>
                <hr className="title" />
                <div className="pb-4 px-0">
                  <Row className="py-2 px-3">
                    <Col sm="auto">訂單編號：</Col>
                    <Col>{v.orderId}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">訂單狀態：</Col>
                    <Col
                      className={v.orderStsId === 'o05' ? 'text-danger' : ''}
                    >
                      {ordersts
                        .map((o) => o.orderStsId)
                        .indexOf(v.orderStsId) >= 0
                        ? ordersts[
                            ordersts
                              .map((o) => o.orderStsId)
                              .indexOf(v.orderStsId)
                          ].stsName
                        : ''}
                    </Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">應收金額：</Col>
                    <Col>${v.sPrice}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">訂單成立時間：</Col>
                    <Col>{v.created_at.slice(0, 16)}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">狀態更新時間：</Col>
                    <Col>{v.update_at.slice(0, 16)}</Col>
                  </Row>
                </div>
                <h5>服務內容</h5>
                <hr className="title" />
                <div className="pb-4 px-0">
                  <Row className="py-2 px-3">
                    <Col sm="auto">服務項目：</Col>
                    <Col>
                      {type.map((t) => t.sTypeId).indexOf(v.sTypeId) >= 0
                        ? type[type.map((t) => t.sTypeId).indexOf(v.sTypeId)]
                            .sTypeName
                        : ''}
                    </Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">起始時間：</Col>
                    <Col>{v.sTimeStart.slice(0, 16)}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">結束時間：</Col>
                    <Col>{v.sTimeEnd.slice(0, 16)}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">時間總計：</Col>
                    <Col>
                      {calcTimeDiff(
                        new Date(v.sTimeStart),
                        new Date(v.sTimeEnd)
                      )}
                    </Col>
                  </Row>
                </div>
                <h5>會員基本資料</h5>
                <hr className="title" />
                <div className="pb-4 px-0">
                  <Row className="py-2 px-3">
                    <Col sm="auto">姓名：</Col>
                    <Col>{member.map((v, i) => v.mName)}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">地址：</Col>
                    <Col>
                      {v.mCity}
                      {v.mDist}
                      {v.mAddr}
                    </Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">電話：</Col>
                    <Col>{v.mPhone}</Col>
                  </Row>
                </div>
                <h5>狗狗資料</h5>
                <hr className="title" />
                <div className="pb-4 px-0">
                  <Row className="py-2 px-3">
                    <Col sm="auto">名稱：</Col>
                    <Col>{v.dName}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">品種：</Col>
                    <Col>{v.dBreed}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">年齡：</Col>
                    <Col>{v.dAge}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">性別：</Col>
                    <Col>{v.dGender === 'm' || 'M' ? '公' : '母'}</Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">體型：</Col>
                    <Col>
                      {v.sizeId.split(',').map((x) => {
                        return size.map((e) => e.sizeId).indexOf(x) >= 0
                          ? size[size.map((e) => e.sizeId).indexOf(x)]
                              .sizeName + ' '
                          : ''
                      })}
                    </Col>
                  </Row>
                </div>
                <h5>其他</h5>
                <hr className="title" />
                <div className="pb-4 px-0">
                  <Row className="py-2 px-3">
                    <Col sm="auto">額外需求：</Col>
                    <Col>
                      {v.extraId.split(',').map((x) => {
                        return extra.map((e) => e.extraId).indexOf(x) >= 0
                          ? extra[extra.map((e) => e.extraId).indexOf(x)]
                              .extraName + ' '
                          : ''
                      })}
                    </Col>
                  </Row>
                  <Row className="py-2 px-3">
                    <Col sm="auto">備註：</Col>
                    <Col>{v.sRemark}</Col>
                  </Row>
                </div>
                <div className="mt-">
                  <Row>
                    <Col className="d-flex justify-content-center">
                      {order[0].orderStsId === 'o01' ? (
                        <Button
                          variant="primary"
                          type="button"
                          className="mr-3"
                          disabled={isSend}
                          onClick={() => handleSubmit('o02')}
                        >
                          <FaCheck />
                          接受預約
                        </Button>
                      ) : (
                        ''
                      )}

                      {order[0].orderStsId === 'o01' ||
                      order[0].orderStsId === 'o02' ? (
                        <Button
                          variant="secondary"
                          type="button"
                          disabled={isSend}
                          onClick={() => handleSubmit('o05')}
                        >
                          <FaTimes />
                          取消預約
                        </Button>
                      ) : (
                        ''
                      )}
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <h5 className="text-center mt-3">查無此筆訂單資料</h5>
      )}
    </>
  )
}

export default withRouter(ServiceAdminOrderDetail)
