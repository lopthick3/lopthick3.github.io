import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { MdShoppingCart, MdBookmarkBorder } from 'react-icons/md'
//redux
import { connect } from 'react-redux'

const Order = (props) => {
  //設定訂單狀態
  const [order, setOrder] = useState([])
  //設定mId的來源,抓到mId去檢索會員的最新訂單(未完成)
  const mId = localStorage.getItem('mId')
  //設定從資料庫抓取訂單細節的方法
  async function getOrderDetail(mId) {
    const req = new Request(`http://localhost:6001/order/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const detail = await res.json()
    console.log(detail)
    setOrder(detail)
  }
  //設定生命週期方法useEffect===ComponnentDidMount
  useEffect(() => {
    getOrderDetail(mId)
  }, [])

  //計算總價
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].pQuantity * items[i].pPrice
    }
    return total
  }
  const [price, setPrice] = useState('')

  useEffect(() => {
    if (props.discount) {
      let test2 = props.discount.slice(-1)
      let test3 = props.discount.substring(0, props.discount.length - 1)
      if (test2 == '%') {
        setPrice(
          (sum(order[0] ? JSON.parse(order[0].cart) : 0) * (100 - test3)) / 100
        )
      } else {
        setPrice(sum(order[0] ? JSON.parse(order[0].cart) : 0) - props.discount)
      }
      console.log(123, test2)
      console.log(456, test3)
    }
  }, [order])
  useEffect(() => {
    console.log('price-order', price)
  }, [price])
  return (
    <Container>
      <Row>
        <Col xs={12} className="mt-5 d-flex justify-content-center">
          <Col xs={7} className="border position-relative">
            <div
              className="rounded bg-dark position-absolute rounded-circle"
              style={{
                width: 20 + 'px',
                height: 20 + 'px',
                left: (-10 / 647.484) * 100 + '%',
                top: -10,
              }}
            ></div>
            <div
              className="rounded bg-dark position-absolute rounded-circle"
              style={{
                width: 20 + 'px',
                height: 20 + 'px',
                left: (313.742 / 647.484) * 100 + '%',
                top: -10,
              }}
            ></div>
            <div
              className="rounded bg-primary position-absolute rounded-circle"
              style={{
                width: 20 + 'px',
                height: 20 + 'px',
                left: (637.484 / 647.484) * 100 + '%',
                top: -10,
              }}
            ></div>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="d-flex justify-content-center">
          <Col xs={7} className="position-relative">
            <div
              className="position-absolute "
              style={{
                left: (-21.6015 / 647.484) * 100 + '%',
                top: 10,
              }}
            >
              購物車
            </div>
            <div
              className="position-absolute "
              style={{
                left: (294.9375 / 647.484) * 100 + '%',
                top: 10,
              }}
            >
              付款資料
            </div>
            <div
              className="position-absolute font-weight-bold"
              style={{
                right: (-28.805 / 647.484) * 100 + '%',
                top: 10,
              }}
            >
              訂單資料
            </div>
          </Col>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="d-flex justify-content-between align-items-end">
          <h4>你的訂單明細</h4>
          <div>
            <div>訂單編號:{order[0] ? order[0].id : ''}</div>
            <div>
              訂單下達日期:
              {order[0] ? order[0].created_at : ''}
            </div>
          </div>
        </Col>
      </Row>
      <hr className="mt-1" />

      {order[0]
        ? JSON.parse(order[0].cart).map((value, index) => {
            return (
              <>
                <Row key={index} className="align-items-center">
                  <Col xs={6} sm={6} md={6} lg={3}>
                    <img
                      src={require('../../images/product/' +
                        value.pImg +
                        '.jpg')}
                      className="card-img-top"
                      alt="..."
                    />
                  </Col>
                  <Col xs={6} sm={6} md={6} lg={9}>
                    <Row className="justify-content-around align-items-center">
                      <Col xs={12} sm={12} md={12} lg={3} className="pl-5 pr-0">
                        <h3>{value.pName}</h3>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={3} className="pl-5 pr-0">
                        <h4>數量:{value.pQuantity}</h4>
                        <h4>價格:${value.pPrice}</h4>
                      </Col>
                      <Col xs={12} sm={12} md={12} lg={3} className="pl-5 pr-0">
                        <h4>小計:{value.pQuantity * value.pPrice}</h4>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr />
              </>
            )
          })
        : ''}
      <Row className="mt-5">
        <Col>
          <h4>收件人明細</h4>
        </Col>
      </Row>
      <hr className="mt-1" />
      <Row>
        <Col xs={4} sm={4} md={8}>
          <Row className="justify-content-around">
            <Col xs={12} sm={12} md>
              <p>收件人</p>
              <p className="ml-4 font-weight-bold">
                {order[0] ? order[0].name : ''}
              </p>
            </Col>
            <Col xs={12} sm={12} md>
              <p>收件地址</p>
              <p className="ml-4 font-weight-bold">
                {order[0] ? order[0].zip : ''}
                {order[0] ? order[0].address : ''}
              </p>
            </Col>
          </Row>
        </Col>
        <Col xs={8} sm={8} md={4}>
          <p>聯絡資訊</p>
          <p className="ml-4 font-weight-bold">
            信箱：{order[0] ? order[0].email : ''}
          </p>
          <p className="ml-4 font-weight-bold">
            手機：{order[0] ? order[0].mobile : ''}
          </p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h4>付款摘要</h4>
        </Col>
      </Row>
      <hr className="mt-1" />
      <Row>
        <Col xs={12} sm={12} md={5} className="d-flex justify-content-between">
          <p>付款人</p>
          <p>以下列方式支付全額</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={5} className="d-flex justify-content-between">
          <p className="ml-4 font-weight-bold">
            {order[0] ? order[0].owner : ''}
          </p>
          <p className="font-weight-bold">
            {order[0] ? order[0].card : ''}{' '}
            {order[0] ? '****' + order[0].cardNumber.slice(12, 16) : ''}
          </p>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={5}
          className="mt-3 d-flex justify-content-between"
        >
          <span>小計</span>
          <span>NT${sum(order[0] ? JSON.parse(order[0].cart) : 0)}</span>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={5}
          className="mt-3 d-flex justify-content-between"
        >
          <span>{props.discount ? '使用優惠' : '未用優惠'}</span>
          <span>NT${props.discount ? props.discount : 0}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={12} md={5} className="mt-3">
          <hr className="my-0" />
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          sm={12}
          md={5}
          className="mt-3 d-flex justify-content-between"
        >
          <p className="font-weight-bold">總計</p>
          <p className="font-weight-bold">
            NT$
            {props.discount
              ? price
              : sum(order[0] ? JSON.parse(order[0].cart) : 0)}
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="my-5 d-flex justify-content-around">
          <Button
            className="mb-md-2"
            variant="primary"
            size="lg"
            onClick={() => {
              props.history.push('/member/member-item')
            }}
          >
            <MdBookmarkBorder className="mb-md-1" />
            檢視訂單
          </Button>
          <Button
            className="mb-md-2"
            variant="primary"
            size="lg"
            onClick={() => {
              props.history.push('/products')
            }}
          >
            <MdShoppingCart className="mb-md-1" />
            繼續選購
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
const mapStateToProps = (store) => {
  return { discount: store.useCoupon }
}
export default withRouter(connect(mapStateToProps, null)(Order))
