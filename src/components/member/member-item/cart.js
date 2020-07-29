import React, { useState, useEffect } from 'react'
import $ from 'jquery'
//redux
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getProducts } from '../../../pages/Product/actions/index'
import { MdPlaylistAdd, MdDelete, MdAddShoppingCart } from 'react-icons/md'
import ProductCardSmall from '../../../pages/Product/components/ProductCardSmall'
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Image,
} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../../../css/member/member-info.scss'

const Cart = (props) => {
  //狗狗基本資料
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])

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
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

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
  //設定猜你喜歡只列出4項商品(未完成;無法重新render更新顯示數量;以及按了快速結帳會消失隱藏)
  let arr = props.list.rows && props.list.rows.slice(0, 4)
  return (
    <div class="tab-content content" id="content4">
      <div>
        <h3>
          購物車
          <br />
        </h3>
        <div class="row">
          <div class="col-md-8">
            <div class="card card-width">
              <div class="card-body">
                <Container>
                  <Row className="mt-5">
                    <Col md={12}>
                      <Row className="mt-5">
                        <Col>
                          {mycartDisplay.length === 0 ? (
                            <>
                              <h3>購物車內沒有任何商品</h3>
                              <hr />

                              <Link to="/products">
                                <Button
                                  variant="primary"
                                  size="md"
                                  className="pull-right"
                                >
                                  前往選購
                                </Button>
                              </Link>
                            </>
                          ) : (
                            <h3>
                              以下是你購物車內的商品 NT${sum(mycartDisplay)}
                            </h3>
                          )}
                          <hr />
                        </Col>
                      </Row>
                      {mycartDisplay.map((value, index) => {
                        return (
                          <Row className="align-items-center" key={value.pId}>
                            <Col md={4} className="text-center">
                              <Image
                                className="sm_cart_img"
                                src={require('../../../images/product/' +
                                  value.pImg +
                                  '.jpg')}
                                alt="..."
                              />
                            </Col>
                            <Col md={2}>
                              <h3 className="font-weight-bold">
                                {value.pName}
                              </h3>
                              <h4>數量:{value.pQuantity}</h4>
                              <h4>價格:{value.pPrice}</h4>
                            </Col>
                            <Col md={2}>
                              <ButtonGroup className="mb-md-2">
                                <Button
                                  className="border-dark bg-light text-dark"
                                  id="-"
                                  onClick={(e) => {
                                    updateQuantityToLocalStorage(e, index, 1)
                                  }}
                                >
                                  -
                                </Button>
                                <Button
                                  className="border-dark bg-light text-dark"
                                  value={value.pQuantity}
                                  type="input"
                                >
                                  {value.pQuantity}
                                </Button>
                                <Button
                                  className="border-dark bg-light text-dark"
                                  id="+"
                                  onClick={(e) => {
                                    updateQuantityToLocalStorage(e, index, 1)
                                  }}
                                >
                                  +
                                </Button>
                              </ButtonGroup>
                            </Col>
                            <Col md={2}>
                              <h4 className="text-center font-weight-bold">
                                NT${value.pQuantity * value.pPrice}
                              </h4>
                            </Col>
                            <Col md={2}>
                              <Button
                                className="mb-2"
                                variant="primary"
                                size="md"
                              >
                                <MdPlaylistAdd className="mb-md-1" />
                                下次再買
                              </Button>
                              <Button
                                className="mb-2"
                                variant="primary"
                                size="md"
                                onClick={() => {
                                  deleteItem(index)
                                }}
                              >
                                <MdDelete className="mb-md-1" />
                                刪除商品
                              </Button>
                            </Col>
                            <Col>
                              <hr />
                            </Col>
                          </Row>
                        )
                      })}
                    </Col>
                  </Row>
                  {mycartDisplay.length === 0 ? (
                    ''
                  ) : (
                    <>
                      <Row className="mt-1">
                        <Col
                          md={{ offset: 6 }}
                          className="d-flex justify-content-between"
                        >
                          <div>小計</div>
                          <div>NT${sum(mycart)}</div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col
                          md={{ offset: 6 }}
                          className="d-flex justify-content-between"
                        >
                          <div>運費</div>
                          <div>免額外運費</div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col md={{ offset: 6 }}>
                          <Button
                            className="bg-transparent border-0 text-dark p-0"
                            onClick={(e) => {
                              $('#coupon').toggle().focus()
                              if ($(e.target).hasClass('text-dark')) {
                                $(e.target)
                                  .removeClass('text-dark')
                                  .addClass('text-primary')
                              } else {
                                $(e.target)
                                  .removeClass('text-primary')
                                  .addClass('text-dark')
                              }
                            }}
                          >
                            促銷代碼或優惠券
                          </Button>
                          <input id="coupon" type="text" className="b-0" />
                          <hr />
                        </Col>
                      </Row>
                      <Row className="mt-1">
                        <Col
                          md={{ offset: 6 }}
                          className="d-flex justify-content-between"
                        >
                          <div className="font-weight-bold">你的總金額</div>
                          <div className="font-weight-bold">
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
                </Container>
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
  return {
    list: store.getProducts,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProducts }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
