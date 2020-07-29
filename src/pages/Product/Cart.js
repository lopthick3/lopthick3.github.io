import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Image,
} from 'react-bootstrap'
import { MdPlaylistAdd, MdDelete } from 'react-icons/md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import $ from 'jquery'
import ProductCardSmallSale from './components/ProductCardSmallSale'
import { getProducts, count, useCoupon, couponId } from './actions/index'
import { bindActionCreators } from 'redux'
import { formServerCouponsWE } from '../../actions/marketingActions'
import Swal from 'sweetalert2/src/sweetalert2.js'

const Cart = (props) => {
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  // const [test, setTest] = useState('')
  // const [test2, setTest2] = useState('')
  // const [test3, setTest3] = useState('')

  //跳轉Cart頁先抓localStorage的key是否有cart,有就抓沒有就設立空陣列;否則頁面會無法render
  localStorage.getItem('cart')
    ? localStorage.getItem('cart')
    : localStorage.setItem('cart', JSON.stringify([]))

  //提取購物車資料
  function getCartFromLocalStorage() {
    const newCart = localStorage.getItem('cart') || []
    setMycart(JSON.parse(newCart))
  }

  //更新商品數量
  function updateQuantityToLocalStorage(e, index, quantity) {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || []
    if (e.target.id === '-') {
      if (currentCart[index].pQuantity - quantity === 0) {
        currentCart[index].pQuantity = 1
      } else {
        currentCart[index].pQuantity = currentCart[index].pQuantity - quantity
      }
    } else {
      currentCart[index].pQuantity = currentCart[index].pQuantity + quantity
    }

    const newCart = currentCart
    localStorage.setItem('cart', JSON.stringify(newCart))
    setMycart(newCart)
  }

  //刪除商品
  function deleteItem(index) {
    console.log(index)
    let currentCart = JSON.parse(localStorage.getItem('cart')) || []
    currentCart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(currentCart))
    setMycart(currentCart)
  }

  //從localStorage取得購物車資料;從server讀取此會員未使用的優惠券
  useEffect(() => {
    getCartFromLocalStorage()
    props.getProducts(Math.floor(Math.random() * 18) + 1)
    props.formServerCouponsWE(0, localStorage.getItem('mId'))
  }, [props.qty])

  //購物車有變動即更改
  useEffect(() => {
    let newMycartDisplay = []
    for (let i = 0; i < mycart.length; i++) {
      const index = newMycartDisplay.findIndex(
        (item) => item.pId === mycart[i].pId
      )
      if (index !== -1) {
        newMycartDisplay[index].pQuantity += mycart[i].pQuantity
      } else {
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }
    setMycartDisplay(newMycartDisplay)
  }, [mycart])

  //計算總價
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].pQuantity * items[i].pPrice
    }
    return total
  }
  //設定猜你喜歡只列出4項商品
  let random = Math.floor(Math.random() * 20) - 5
  let arr = props.list.rows && props.list.rows.slice(random, random + 4)

  //加入願望清單的request
  async function postList(list) {
    const req = new Request('http://localhost:6001/list/post', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(list),
    })
    const res = await fetch(req)
    const listContent = await res.json()
    await console.log(listContent)
    if (listContent.success) {
      Swal.fire({
        icon: 'success',
        title: '收藏成功',
        showConfirmButton: false,
      })
    } else {
      Swal.fire({
        title: '已加入清單',
        text: '前往清單查看?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#cea160',
        cancelButtonColor: '#cccccc',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          props.history.push('/list/' + localStorage.getItem('mId'))
        }
      })
    }
  }

  return (
    <Container className="cart">
      <Row className="mt-5">
        <Col md={12}>
          {mycartDisplay.length === 0 ||
          localStorage.getItem('mId') === '0' ||
          localStorage.getItem('mId') === null ? (
            <>
              <Row className="mt-5">
                <Col>
                  <h3 className="text-sm-center text-md-left">
                    購物車內沒有任何商品
                  </h3>
                  <hr />
                  <Image
                    className="ad"
                    src={require('../../images/product/dog-ad.jpg')}
                    alt="..."
                  />
                  <Link to="/products">
                    <Button variant="outline-primary" size="lg">
                      前往選購
                    </Button>
                  </Link>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row>
                <Col md={12} className="d-flex justify-content-center">
                  <Col md={7} className="border position-relative">
                    <div
                      className="rounded bg-primary position-absolute rounded-circle"
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
              <Row className="mb-5">
                <Col md={12} className="d-flex justify-content-center">
                  <Col md={7} className="position-relative">
                    <div
                      className="position-absolute font-weight-bold"
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
                    </div>{' '}
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
                <Col>
                  <h3 className="text-sm-center text-md-left">
                    以下是你購物車內的商品 NT${sum(mycartDisplay)}
                  </h3>
                  <hr />
                </Col>
              </Row>
              {mycartDisplay.map((value, index) => {
                return (
                  <>
                    <Row className="item align-items-center" key={value.pId}>
                      <Col md={4} className="text-center">
                        <Link
                          to={'/productdetail/' + value.pId}
                          className="p-0"
                        >
                          <Image
                            src={require('../../images/product/' +
                              value.pImg +
                              '.jpg')}
                            className="card-img-top"
                            alt="..."
                          />
                        </Link>
                      </Col>
                      <Col md={3} lg={2}>
                        <h4 className="font-weight-bold">{value.pName}</h4>
                        <h4>數量:{value.pQuantity}</h4>
                        <h4>價格:{value.pPrice}</h4>
                      </Col>
                      <Col sm={6} md={2} lg={2}>
                        <ButtonGroup className="mb-sm-2">
                          <Button
                            className="border-dark bg-transparent text-dark"
                            id="-"
                            onClick={(e) => {
                              updateQuantityToLocalStorage(e, index, 1)
                            }}
                          >
                            -
                          </Button>
                          <Button
                            className="border-dark bg-transparent text-dark font-weight-bold"
                            value={value.pQuantity}
                            type="input"
                          >
                            {value.pQuantity}
                          </Button>
                          <Button
                            className="border-dark bg-transparent text-dark"
                            id="+"
                            onClick={(e) => {
                              value.pQuantity < 10 &&
                                updateQuantityToLocalStorage(e, index, 1)
                            }}
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </Col>
                      <Col sm={6} md={2} lg={2} className="ml-md-auto">
                        <h4 className="text-center text-sm-right text-md-center font-weight-bold">
                          NT${value.pQuantity * value.pPrice}
                        </h4>
                      </Col>
                      <Col
                        md={4}
                        lg={2}
                        className="d-md-flex flex-md-column d-sm-flex justify-content-sm-between ml-auto"
                      >
                        <Button
                          className="mb-2"
                          variant="outline-primary"
                          size="md"
                          onClick={(e) => {
                            if (
                              localStorage.getItem('mId') &&
                              localStorage.getItem('mId') !== '0'
                            ) {
                              let item = value.pId
                              let mId = localStorage.getItem('mId')
                              let list = { item: item, mId: mId }
                              postList(list)
                              setTimeout(() => {
                                deleteItem(index)
                                $(e.currentTarget)
                                  .parentsUntil('.item')
                                  .fadeOut()
                              }, 1000)
                            } else {
                              Swal.fire({
                                title: '尚未登入',
                                text: '前往登入頁面?',
                                icon: 'info',
                                showCancelButton: true,
                                confirmButtonColor: '#cea160',
                                cancelButtonColor: '#cccccc',
                                confirmButtonText: '確定',
                                cancelButtonText: '取消',
                              }).then((result) => {
                                if (result.value) {
                                  props.history.push('/login')
                                }
                              })
                            }
                          }}
                        >
                          <MdPlaylistAdd className="mb-md-1" />
                          下次再買
                        </Button>
                        <Button
                          className="mb-2"
                          variant="outline-primary"
                          size="md"
                          onClick={(e) => {
                            Swal.fire({
                              title: '確定刪除?',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#cea160',
                              cancelButtonColor: '#cccccc',
                              confirmButtonText: '確定',
                              cancelButtonText: '取消',
                            }).then((result) => {
                              if (result.value) {
                                props.count(mycart)
                                deleteItem(index)
                                Swal.fire({
                                  icon: 'success',
                                  title: '成功刪除1筆商品',
                                  showConfirmButton: false,
                                  timer: 1500,
                                })
                                $(e.currentTarget)
                                  .parentsUntil('.item')
                                  .fadeOut()
                              }
                            })
                          }}
                        >
                          <MdDelete className="mb-md-1" />
                          刪除商品
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr />
                      </Col>
                    </Row>
                  </>
                )
              })}
            </>
          )}
        </Col>
      </Row>
      {mycartDisplay.length === 0 ||
      localStorage.getItem('mId') === '0' ||
      localStorage.getItem('mId') === null ? (
        ''
      ) : (
        <>
          <Row className="mt-1">
            <Col md={{ offset: 6 }} className="d-flex justify-content-between">
              <div>小計</div>
              <div>NT${sum(mycart)}</div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={{ offset: 6 }} className="d-flex justify-content-between">
              <div>運費</div>
              <div>免額外運費</div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={{ offset: 6 }}>
              <span className="d-flex justify-content-between">
                <span>
                  促銷代碼或優惠券
                  <select
                    id="coupon"
                    onChange={(e) => {
                      let test2 = e.currentTarget.value.slice(-1)
                      let test3 = e.currentTarget.value.substring(
                        0,
                        e.currentTarget.value.length - 1
                      )
                      if (test2 == '%') {
                        $('#discount').text(e.currentTarget.value)
                        $('#sum').text(
                          'NT$' + (sum(mycartDisplay) * (100 - test3)) / 100
                        )
                      } else {
                        $('#discount').text(e.currentTarget.value)
                        $('#sum').text(
                          'NT$' + (sum(mycartDisplay) - e.currentTarget.value)
                        )
                      }

                      props.useCoupon(e.currentTarget.value)
                      // console.log(
                      //   $('#coupon').find('option:selected').attr('id')
                      // )

                      let mmId = $('#coupon').find('option:selected').attr('id')
                      props.couponId(mmId)
                    }}
                  >
                    <option value="">請選擇</option>
                    {props.coupons &&
                      props.coupons.map((value) => (
                        <option
                          id={value.mmId}
                          key={value.mmId}
                          value={
                            value.mtDiscountP
                              ? value.mtDiscountP
                              : value.mtDiscount
                          }
                        >
                          {value.mmId + '.' + value.mtName}
                        </option>
                      ))}
                  </select>
                </span>
                <span id="discount"></span>
              </span>
              <hr />
            </Col>
          </Row>
          <Row className="mt-1">
            <Col md={{ offset: 6 }} className="d-flex justify-content-between">
              <div className="font-weight-bold">你的總金額</div>
              <div className="font-weight-bold" id="sum">
                NT${sum(mycartDisplay)}
              </div>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col md={{ offset: 9 }}>
              <Link to="/checkout">
                <Button variant="primary" size="lg" block>
                  前往結帳
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      )}

      <Row className="mt-5">
        <Col>
          <h3>追加購買</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        {props.list.rows &&
          arr.map((value, index) => {
            return <ProductCardSmallSale key={index} data={arr[index]} />
          })}
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>運貨與退貨通知</h3>
          <hr />
          <p className="px-3">
            如果你需要退貨，可以辦理免額外付費運送退貨商品。如果是符合退貨條件的產品，你可在收到訂單商品的14
            天內開始辦理退貨。只須登入你的帳戶，或撥打電話聯絡我們：0800-020-021。寄送時間：
            預計訂單成立後 7
            個工作天內送達不含週六日及國定假日。如廠商有約定日將於約定日期內送達，約定日期需於訂單成立後
            14天內。 送貨方式： 透過宅配或是郵局送達。
            消費者訂購之商品若經配送兩次無法送達，再經本公司以電話與 E-mail
            均無法聯繫逾三天者，本公司將取消該筆訂單，並且全額退款。 送貨範圍：
            限台灣本島地區。注意！收件地址請勿為郵政信箱。若有台灣本島以外地區送貨需求，收貨人地址請填台灣本島親友的地址。
            產品責任險：
            本產品已投保新光產物產品責任保險$250,000,000元。(保險證號：130008AKP0000930)
          </p>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (store) => {
  return {
    list: store.getProducts,
    qty: store.getQuantity,
    coupons: store.getCoupons,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getProducts, count, formServerCouponsWE, useCoupon, couponId },
    dispatch
  )
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
