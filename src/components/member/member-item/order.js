import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ReactDOM } from 'react-dom'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getMemberOrderDataDetail } from '../../../pages/member/actions/index'
import orderDetail from './orderDetail'
import { Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../../../css/member/member-info.scss'
//點擊可以按照id顯示
const MemberOrderInfo = (props) => {
  const [order, setOrder] = useState([])
  //設定mId的來源,抓到mId去檢索會員的最新訂單(未完成)
  const mId = localStorage.getItem('mId')
  // const orderId = props.match.params.orderId ? props.match.params.orderId : ''
  async function getOrderDetail(orderId) {
    const req = new Request(`http://localhost:6001/member/order/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const detail = await res.json()
    console.log(detail)
    setOrder(detail)
  }
  // console.log('mId: ', mId)

  var orderData = []
  var total = []
  const orderDetail = (props) => {}
  for (let i = 0; i <= props.data.length; i++) {
    const name = props.data[i] ? props.data[i].name : ''
    const address = props.data[i] ? props.data[i].address : ''
    const card = props.data[i] ? props.data[i].card : ''
    const cart = props.data[i] ? props.data[i].cart : ''
    const mobile = props.data[i] ? props.data[i].mobile : ''
    orderData.push({
      name,
      address,
      card,
      mobile,
    })
    const orderDataTotal = orderData.map((a) => a)
    total = orderDataTotal
    // console.log('total: ', total)
    // console.log('data: ', orderData)
    // console.log('dataTotal', orderDataTotal)
    // console.log('name: ', name)
    // console.log('address: ', address)
    // console.log('card: ', card)
    // console.log('mobile: ', mobile)
    // console.log('cart', cart)
    // console.log('length', props.data.length)
  }
  // console.log('data: ', orderData)
  // const totalData = [
  //   props.data ? props.data.name : '',
  //   props.data ? props.data.address : '',
  //   props.data ? props.data.card : '',
  //   props.data ? props.data.mobile : '',
  // ]
  // console.log('totalData', totalData)
  // console.log('Total', total)
  // console.log('dataTotal', total[0].name)
  // console.log('dataTotal', props.data[1] ? props.data[1].mobile : '')
  // console.log('dataTotal', total[1].mobile)
  // console.log('dataTotal: ', orderDataTotal.name)
  // console.log('mId: ', mId)
  useEffect(() => {
    props.getMemberOrderDataDetail(mId)
    // getOrderDetail(orderId)
  }, [])
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].pQuantity * items[i].pPrice
    }
    return total
  }
  let orderList = []
  for (let i = 0; i < props.data.length; i++) {
    orderList.push(
      <tr>
        <th scope="row">{i + 1}</th>
        <td className="order_show" onClick={show} id={i} name={i}>
          {props.data[i] ? props.data[i].name : ''}
        </td>
        <td>
          {' '}
          {props.data[i] ? props.data[i].zip : ''}
          {props.data[i] ? props.data[i].address : ''}
        </td>
        {/* <td>{props.data[i] ? props.data[i].cart : ''}</td> */}
        <td>{props.data[i] ? props.data[i].created_at : ''}</td>
        <td>{sum(props.data[i] ? JSON.parse(props.data[i].cart) : 0)}</td>
      </tr>
    )
  }
  let orderListDetail = []
  for (let i = 0; i < props.data.length; i++) {
    orderListDetail.push(
      <Container className="order_none order_detail" data-name={i}>
        <button className="detail_hide" onClick={hide}>
          返回
        </button>
        <Row className="mt-5">
          <Col className="d-flex justify-content-between align-items-end">
            <h4>訂單明細</h4>
            <div>
              <div>訂單編號:{props.data[i] ? props.data[i].id : ''}</div>
              <div>
                訂單下達日期:
                {props.data[i] ? props.data[i].created_at : ''}
              </div>
            </div>
          </Col>
        </Row>
        <hr className="mt-1" />

        {props.data[i]
          ? JSON.parse(props.data[i].cart).map((value, index) => {
              return (
                <>
                  <Row key={index} className="align-items-center">
                    <Col xs={6} sm={6} md={6} lg={3}>
                      <img
                        className="sm_cart_img"
                        // src={require('../../../images/product/' +
                        //   value.pImg +
                        //   '.jpg')}
                        src={require('../../../images/product/' +
                          'C1' +
                          '.jpg')}
                        alt="..."
                      />
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={9}>
                      <Row className="justify-content-around align-items-center">
                        <Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={3}
                          className="pl-5 pr-0"
                        >
                          <h3>{value.pName}</h3>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={3}
                          className="pl-5 pr-0"
                        >
                          <h4>數量:{value.pQuantity}</h4>
                          <h4>價格:${value.pPrice}</h4>
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={3}
                          className="pl-5 pr-0"
                        >
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
                  {props.data[i] ? props.data[i].name : ''}
                </p>
              </Col>
              <Col xs={12} sm={12} md>
                <p>收件地址</p>
                <p className="ml-4 font-weight-bold">
                  {props.data[i] ? props.data[i].zip : ''}
                  {props.data[i] ? props.data[i].address : ''}
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={8} sm={8} md={4}>
            <p>聯絡資訊</p>
            <p className="ml-4 font-weight-bold">
              信箱：{props.data[i] ? props.data[i].email : ''}
            </p>
            <p className="ml-4 font-weight-bold">
              手機：{props.data[i] ? props.data[i].mobile : ''}
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
          <Col
            xs={12}
            sm={12}
            md={5}
            className="d-flex justify-content-between"
          >
            <p>付款人</p>
            <p>以下列方式支付全額</p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={5}
            className="d-flex justify-content-between"
          >
            <p className="ml-4 font-weight-bold">
              {props.data[i] ? props.data[i].owner : ''}
            </p>
            <p className="font-weight-bold">
              {props.data[i] ? props.data[i].card : ''}
            </p>
            <p className="font-weight-bold">
              {props.data[i] ? props.data[i].cardNumber : ''}
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
            <span>
              NT${sum(props.data[i] ? JSON.parse(props.data[i].cart) : 0)}
            </span>
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
              NT${sum(props.data[i] ? JSON.parse(props.data[i].cart) : 0)}
            </p>
          </Col>
        </Row>
      </Container>
    )
  }

  function show(e) {
    let n = e.currentTarget.id
    let p = n

    console.log('n:' + e.currentTarget.id)
    console.log('p:' + $('.order_detail').attr('name'))

    $('.order_detail').eq(n).show()
    $('.list-container').hide()

    // if (n === $('.order_detail').attr('data-name')) {
    //   $('.order_detail')
    //     .attr('data-name')
    //     .removeClass('order_none')

    //   $('.member-info').css('height', '800px')
    //   $('footer').addClass('tr400')
    // }
  }
  function hide() {
    $('.order_detail').hide()
    $('.list-container').show()
    // $('.order_detail').addClass('order_none')
    // $('footer').removeClass('tr400')
  }
  return (
    <div class="tab-content content orderListContainer" id="content1">
      <div>
        <h3>
          訂單查詢
          <br />
        </h3>
        {orderListDetail}

        <div class="row list-container">
          <div class="col-md-8">
            <div class="card card-width">
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">訂購人姓名</th>
                      <th scope="col">收件地址</th>
                      {/* <th scope="col">信用卡</th> */}
                      <th scope="col">購買時間</th>
                      <th scope="col">總計</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* {orderDetail} */}
                    {orderList}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
      <div>
        <img src="images/001.png" alt="" />
      </div>
    </div>
  )
}
const mapStateToProps = (store) => {
  return { data: store.getMemberOrderDetail }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMemberOrderDataDetail }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberOrderInfo)
