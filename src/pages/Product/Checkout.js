import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ProductReceipt from './components/ProductReceipt'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getMemberDetail } from '../member/actions/index'
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa'

const Checkout = (props) => {
  //設定驗證狀態
  const [validated, setValidated] = useState(false)
  // 設定mId的來源,抓到mId去檢索會員的最新訂單
  const mId = localStorage.getItem('mId')
  //表單資訊
  const buyerInfo = {
    lastName: '',
    firstName: '',
    county: '',
    address: '',
    detailedAddress: '',
    zip: '',
    email: '',
    mobile: '',
    card: '',
    cardNumber: '',
    owner: '',
    cart: localStorage.getItem('cart'),
    mId: mId,
  }
  //寫入表單資訊
  function getformInfo(e, info) {
    switch (info) {
      case 'lastName':
        buyerInfo.lastName =
          e.currentTarget.value || props.data[0].mName.slice(0, 1)
        break
      case 'firstName':
        buyerInfo.firstName = e.currentTarget.value
        break
      case 'county':
        buyerInfo.county = e.currentTarget.value
        break
      case 'address':
        buyerInfo.address = e.currentTarget.value
        break
      case 'detailedAddress':
        buyerInfo.detailedAddress = e.currentTarget.value
        break
      case 'zip':
        buyerInfo.zip = e.currentTarget.value
        break
      case 'email':
        buyerInfo.email = e.currentTarget.value
        break
      case 'mobile':
        buyerInfo.mobile = e.currentTarget.value
        break
      case 'card':
        buyerInfo.card = e.currentTarget.id
        break
      case 'cardNumber':
        buyerInfo.cardNumber += e.currentTarget.value
        break
      case 'owner':
        buyerInfo.owner = e.currentTarget.value
        break
      default:
        break
    }
  }

  //建立訂單
  async function postOrder(form) {
    const req = new Request('http://localhost:6001/order/post', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(form),
    })
    const res = await fetch(req)
    const order = await res.json()
    await console.log(order)
  }

  //卡號監聽事件
  function cardInput(e) {
    let length = $(e.currentTarget).val().length
    let maxlength = $(e.currentTarget).attr('maxlength')
    if (length == maxlength) {
      $(e.currentTarget).parent().next().find('.cardInput').focus() //要注意是不是同層
    } else {
      $(e.currentTarget).focus()
    }
  }
  //設定驗證方法
  function handleSubmit(e) {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else if (form.checkValidity() === true) {
      postOrder(buyerInfo)
      localStorage.setItem('cart', JSON.stringify([]))
      props.history.push(`/order/${mId}`)
    }
    setValidated(true)
  }

  //若有使用優惠券,將使用的優惠券狀態改成已使用
  async function updateCoupon(mmId, mId) {
    const req = new Request(
      `http://localhost:6001/order/updateCoupon/${mmId}/${mId}`,
      {
        method: 'POST',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const coupon = await res.json()
  }

  useEffect(() => {
    props.getMemberDetail(mId)
  }, [])
  console.log(props.couponId)
  return (
    <>
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
                className="rounded bg-primary position-absolute rounded-circle"
                style={{
                  width: 20 + 'px',
                  height: 20 + 'px',
                  left: (313.742 / 647.484) * 100 + '%',
                  top: -10,
                }}
              ></div>
              <div
                className="rounded bg-dark position-absolute rounded-circle"
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
                className="position-absolute font-weight-bold"
                style={{
                  left: (294.9375 / 647.484) * 100 + '%',
                  top: 10,
                }}
              >
                付款資料
              </div>
              <div
                className="position-absolute "
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
          <Col className="d-flex justify-content-between align-items-center">
            <h4>結帳</h4>
            <ProductReceipt />
          </Col>
        </Row>
        <hr className="mt-0" />
        <Row className="mt-5">
          <Col lg={{ span: 8, offset: 2 }}>
            <div className="d-flex justify-content-between align-items-center">
              <h3>輸入姓名與地址</h3>
              <Form.Check
                id="auto"
                type="checkbox"
                label="同會員資訊"
                onClick={(e) => {
                  if ($(e.currentTarget).prop('checked')) {
                    buyerInfo.lastName = props.detail[0].mName.slice(0, 1)
                    $('[name=lastName]').val(props.detail[0].mName.slice(0, 1))
                    buyerInfo.firstName = props.detail[0].mName.slice(1)
                    $('[name=firstName]').val(props.detail[0].mName.slice(1))
                    buyerInfo.county = props.detail[0].mAddress.slice(0, 3)
                    $('[name=county]').val(props.detail[0].mAddress.slice(0, 3))
                    buyerInfo.address = props.detail[0].mAddress.slice(3)
                    $('[name=address]').val(props.detail[0].mAddress.slice(3))
                    //會員資料庫無郵遞區號預設是地址欄位前三個
                    // buyerInfo.county = props.detail[0].mAddress.slice(0, 3)
                    // $('[name=zip]').val(props.detail[0].mAddress.slice(0, 3))
                    buyerInfo.email = props.detail[0].mEmail
                    $('[name=email]').val(props.detail[0].mEmail)
                    buyerInfo.mobile = props.detail[0].mPhone
                    $('[name=mobile]').val(props.detail[0].mPhone)
                  } else {
                    buyerInfo.lastName = ''
                    $('[name=lastName]').val('')
                    buyerInfo.firstName = ''
                    $('[name=firstName]').val('')
                    buyerInfo.county = ''
                    $('[name=county]').val('')
                    buyerInfo.address = ''
                    $('[name=address]').val('')
                    //會員資料庫無郵遞區號預設是地址欄位前三個
                    // buyerInfo.county = props.detail[0].mAddress.slice(0, 3)
                    // $('[name=zip]').val(props.detail[0].mAddress.slice(0, 3))
                    buyerInfo.email = ''
                    $('[name=email]').val('')
                    buyerInfo.mobile = ''
                    $('[name=mobile]').val('')
                  }
                }}
              />
            </div>
            <hr />
            <br />
            <Form
              name="checkout"
              noValidate
              validated={validated}
              onSubmit={(e) => {
                handleSubmit(e)
                props.couponId && updateCoupon(props.couponId, mId)
              }}
            >
              <Form.Row>
                <Form.Group as={Col} xs={12} sm={12} md={6}>
                  <Form.Control
                    required
                    name="lastName"
                    size="lg"
                    type="text"
                    placeholder="姓氏"
                    onChange={(e) => getformInfo(e, 'lastName')}
                  />
                  <Form.Control.Feedback>正確!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    請輸入姓氏
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} sm={12} md={6}>
                  <Form.Control
                    required
                    name="firstName"
                    size="lg"
                    type="text"
                    placeholder="名字"
                    onChange={(e) => getformInfo(e, 'firstName')}
                  />
                  <Form.Control.Feedback>正確!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    請輸入名字
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} xs={12} sm={12} md={2}>
                  <Form.Control
                    required
                    name="county"
                    as="select"
                    size="lg"
                    className="pr-0"
                    onChange={(e) => getformInfo(e, 'county')}
                  >
                    <option value="">縣/市</option>
                    <option value="基隆市">基隆市</option>
                    <option value="臺北市">臺北市</option>
                    <option value="新北市">新北市</option>
                    <option value="桃園市">桃園市</option>
                    <option value="新竹市">新竹市</option>
                    <option value="新竹縣">新竹縣</option>
                    <option value="苗栗縣">苗栗縣</option>
                    <option value="台中市">臺中市</option>
                    <option value="彰化縣">彰化縣</option>
                    <option value="南投縣">南投縣</option>
                    <option value="雲林縣">雲林縣</option>
                    <option value="嘉義市">嘉義市</option>
                    <option value="嘉義縣">嘉義縣</option>
                    <option value="臺南市">臺南市</option>
                    <option value="高雄市">高雄市</option>
                    <option value="屏東縣">屏東縣</option>
                    <option value="臺東縣">臺東縣</option>
                    <option value="花蓮縣">花蓮縣</option>
                    <option value="宜蘭縣">宜蘭縣</option>
                    <option value="澎湖縣">澎湖縣</option>
                    <option value="金門縣">金門縣</option>
                    <option value="連江縣">連江縣</option>
                  </Form.Control>
                  <Form.Control.Feedback>正確!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    請選擇縣市
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} sm={12} md={5}>
                  <Form.Control
                    required
                    name="address"
                    size="lg"
                    type="text"
                    placeholder="地址"
                    onChange={(e) => getformInfo(e, 'address')}
                  />
                  <Form.Control.Feedback>正確!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    請輸入地址
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} xs={12} sm={12} md={5}>
                  <Form.Control
                    name="detailedAddress"
                    size="lg"
                    type="text"
                    placeholder="附加詳細地址(選填)"
                    onChange={(e) => getformInfo(e, 'detailedAddress')}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Control
                  required
                  name="zip"
                  size="lg"
                  type="text"
                  placeholder="郵遞區號"
                  pattern="^[0-9]{3}|[0-9]{5}$"
                  onChange={(e) => getformInfo(e, 'zip')}
                />
                <Form.Control.Feedback>正確!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  請輸入郵遞區號,(123或者12345)
                </Form.Control.Feedback>
                <br />
                <Form.Control
                  readOnly
                  style={{ pointerEvents: 'none' }}
                  name="country"
                  size="lg"
                  type="text"
                  placeholder="台灣"
                />
              </Form.Group>
              <br />
              <br />
              <h3>輸入聯絡資訊</h3>
              <hr />
              <br />
              <Form.Group>
                <Form.Control
                  required
                  name="email"
                  size="lg"
                  type="email"
                  placeholder="電子郵件地址"
                  pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{3,6}(?:\.[a-z]{2})?)$"
                  onChange={(e) => getformInfo(e, 'email')}
                />
                <Form.Control.Feedback>正確!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  請輸入email
                </Form.Control.Feedback>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Control
                  required
                  name="mobile"
                  size="lg"
                  type="text"
                  placeholder="行動電話或家用電話"
                  pattern="^09[0-9]{2}-?[0-9]{3}-?[0-9]{3}$|^\(?\d{2,3}\)?-?\d{4}-?\d{4}$"
                  onChange={(e) => getformInfo(e, 'mobile')}
                />
                <Form.Control.Feedback>正確!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  請輸入電話號碼,(09xx-xxx-xxx、09xxxxxxxx、04-xxxx-xxxx或(04)xxxx-xxxx)
                </Form.Control.Feedback>
                <br />
              </Form.Group>
              <h3>輸入卡片資訊</h3>
              <hr />
              <br />
              <Form.Group>
                <Form.Check
                  required
                  inline
                  name="card"
                  label="MasterCard"
                  type="radio"
                  id="MasterCard"
                  onChange={(e) => {
                    getformInfo(e, 'card')
                    $('#master').fadeToggle()
                    $('#visa').fadeOut()
                  }}
                />
                <FaCcMastercard id="master" size="25px" display="none" />
                <Form.Check
                  required
                  inline
                  name="card"
                  label="VISA"
                  type="radio"
                  id="VISA"
                  onChange={(e) => {
                    getformInfo(e, 'card')
                    $('#visa').fadeToggle()
                    $('#master').fadeOut()
                  }}
                />
                <FaCcVisa id="visa" size="25px" display="none" />
              </Form.Group>
              <Form.Group>
                <Form.Row>
                  <Form.Group as={Col} xs={3} sm={3} md={2}>
                    <Form.Control
                      required
                      className="cardInput"
                      name="cardNumber"
                      size="lg"
                      type="text"
                      placeholder="0000"
                      maxlength="4"
                      pattern="[0-9]{4}"
                      onKeyUp={(e) => {
                        cardInput(e)
                      }}
                      onBlur={(e) => getformInfo(e, 'cardNumber')}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={3} sm={3} md={2}>
                    <Form.Control
                      required
                      className="cardInput"
                      name="cardNumber"
                      size="lg"
                      type="text"
                      placeholder="0000"
                      maxlength="4"
                      pattern="[0-9]{4}"
                      onKeyUp={(e) => {
                        cardInput(e)
                      }}
                      onBlur={(e) => getformInfo(e, 'cardNumber')}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={3} sm={3} md={2}>
                    <Form.Control
                      required
                      className="cardInput"
                      name="cardNumber"
                      size="lg"
                      type="text"
                      placeholder="0000"
                      maxlength="4"
                      pattern="[0-9]{4}"
                      onKeyUp={(e) => {
                        cardInput(e)
                      }}
                      onBlur={(e) => getformInfo(e, 'cardNumber')}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xs={3} sm={3} md={2}>
                    <Form.Control
                      required
                      className="cardInput"
                      name="cardNumber"
                      size="lg"
                      type="text"
                      placeholder="0000"
                      maxlength="4"
                      pattern="[0-9]{4}"
                      onKeyUp={(e) => {
                        cardInput(e)
                      }}
                      onBlur={(e) => getformInfo(e, 'cardNumber')}
                    />
                  </Form.Group>
                  <Form.Control.Feedback>正確!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    請輸入卡號
                  </Form.Control.Feedback>
                </Form.Row>
                <br />
                <Form.Row>
                  <Form.Group as={Col} xs={3} sm={4}>
                    <Form.Control
                      required
                      name="valid"
                      size="lg"
                      type="text"
                      maxlength="5"
                      placeholder="MM/YY"
                      pattern="^\d{2}\/\d{2}$"
                    />
                    <Form.Control.Feedback>正確!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      請輸入到期月年
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={3}>
                    <Form.Control
                      required
                      name="ccv"
                      size="lg"
                      type="text"
                      placeholder="安全碼"
                      maxlength="3"
                      pattern="^\d{3}$"
                    />
                    <Form.Control.Feedback>正確!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      請輸入安全碼
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} xs={6} sm={5} md={3}>
                    <Form.Control
                      required
                      name="owner"
                      size="lg"
                      type="text"
                      placeholder="卡片持有人"
                      pattern="^\D+$"
                      onChange={(e) => getformInfo(e, 'owner')}
                    />
                    <Form.Control.Feedback>正確!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      請輸入卡片持有人
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <hr />
                <Button variant="primary" size="lg" block type="submit">
                  確定結帳
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
const mapStateToProps = (store) => {
  return { detail: store.getMemberDetail, couponId: store.couponId }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMemberDetail }, dispatch)
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
)
