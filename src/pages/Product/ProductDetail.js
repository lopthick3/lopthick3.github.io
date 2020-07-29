import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getProducts,
  getProductDetail,
  count,
  getComments,
} from './actions/index'
import {
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  Button,
  Accordion,
  Card,
  Modal,
} from 'react-bootstrap'
import {
  MdAddShoppingCart,
  MdShoppingCart,
  MdPlaylistAdd,
} from 'react-icons/md'
import Breadcrumb from '../../components/Breadcrumbs'
import ProductSidebar from './components/ProductSidebar'
import ProductCardSmall from './components/ProductCardSmall'
import Swal from 'sweetalert2/src/sweetalert2.js'
import PrdouctComment from './components/ProductComment'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import $ from 'jquery'

const ProductDetail = (props) => {
  const [total, setTotal] = useState(1)
  const [mycart, setMycart] = useState([])
  //圖片Modal顯示狀態
  const [show, setShow] = useState(false)

  const pId = props.match.params.pId ? props.match.params.pId : ''

  //更新購物車
  function updateCartToLocalStorage(item) {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    if ([...currentCart].find((value) => value.pId === item.pId)) {
      Swal.fire({
        title: '已加入購物車',
        text: '前往購物車結帳?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#cea160',
        cancelButtonColor: '#cccccc',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.value) {
          props.history.push('/cart')
        }
      })
    } else {
      const newCart = [...currentCart, item]
      localStorage.setItem('cart', JSON.stringify(newCart))
      setMycart(newCart)
      Swal.fire({
        icon: 'success',
        title: '加入成功',
        showConfirmButton: false,
      })
    }
  }
  //即時更新商品數量
  useEffect(() => {
    props.getProductDetail(pId)
    props.getProducts()
    props.getComments(pId)
  }, [props.match.params.pId])

  //設定猜你喜歡只列出4項
  let arr = props.list.rows && props.list.rows.slice(0, 4)

  //加入願望清單的request
  async function postList(list) {
    console.log(list)
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
  // console.log('評論', props.comments)
  //刪除評論
  async function delComment(id, mId) {
    const req = new Request(
      `http://localhost:6001/productComment/del/${id}/${mId}`,
      {
        method: 'POST',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const result = await res.json()
  }
  //修改內容
  const comment = { content: '', rating: null }

  async function editComment(id, mId) {
    const req = new Request(
      `http://localhost:6001/productComment/edit/${id}/${mId}`,
      {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(comment),
      }
    )
    const res = await fetch(req)
    const result = await res.json()
  }

  return (
    <Container className="detail">
      <Row className="my-5 d-flex justify-content-center">
        <ProductSidebar />
        <Col md={10}>
          {/* <Row className="m-2">
            <Breadcrumb />
          </Row> */}
          <Row className="mb-5">
            <Col md={12} lg={5} className="text-center">
              {props.detail[0] ? (
                <>
                  <Image
                    className="image"
                    src={require('../../images/product/' +
                      props.detail[0].pImg +
                      '.jpg')}
                    thumbnail
                    onClick={() => setShow(true)}
                  />
                  <Modal
                    centered
                    size="md"
                    show={show}
                    onHide={() => setShow(false)}
                  >
                    <Image
                      className="image"
                      src={require('../../images/product/' +
                        props.detail[0].pImg +
                        '.jpg')}
                      thumbnail
                    />
                  </Modal>
                </>
              ) : (
                ''
              )}
            </Col>
            <Col md={12} lg={4}>
              <h3>{props.detail[0] ? props.detail[0].pName : ''}</h3>
              <br />
              <h6>{props.detail[0] ? props.detail[0].pInfo : ''}</h6>
              <br />
              <h4 className="text-danger">
                ${props.detail[0] ? props.detail[0].pPrice : ''}
              </h4>
              <br />
              <h6>
                庫存數量：{props.detail[0] ? props.detail[0].pQuantity : ''}
              </h6>
              <br />
              <div className="mt-3 d-flex justify-content-between">
                <Button
                  className="mb-md-2"
                  variant="outline-primary"
                  size="md"
                  onClick={() => {
                    if (
                      localStorage.getItem('mId') &&
                      localStorage.getItem('mId') !== '0'
                    ) {
                      props.count(mycart)
                      updateCartToLocalStorage({
                        pId: props.detail[0].pId,
                        pName: props.detail[0].pName,
                        pQuantity: total,
                        pPrice: props.detail[0].pPrice,
                        pImg: props.detail[0].pImg,
                      })
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
                  <MdAddShoppingCart className="mb-1" />
                  加入購物車
                </Button>
                <ButtonGroup className="mb-md-2" size="sm">
                  <Button
                    className="border-primary bg-transparent text-dark"
                    onClick={() => {
                      total > 1 && setTotal(total - 1)
                    }}
                  >
                    -
                  </Button>
                  <Button
                    className="border-primary bg-transparent text-dark font-weight-bold"
                    type="input"
                    min="1"
                  >
                    {total}
                  </Button>
                  <Button
                    className="border-primary bg-transparent text-dark"
                    onClick={() => {
                      total < props.detail[0].pQuantity && setTotal(total + 1)
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </div>
              <div className="my-3 d-flex justify-content-between">
                <Button
                  className="mb-md-2"
                  variant="outline-primary"
                  size="md"
                  onClick={() => {
                    if (
                      localStorage.getItem('mId') &&
                      localStorage.getItem('mId') !== '0'
                    ) {
                      let item = props.detail[0].pId
                      let mId = localStorage.getItem('mId')
                      let list = { item: item, mId: mId }
                      postList(list)
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
                  加入清單
                </Button>
                <Button
                  className="mb-md-2"
                  variant="outline-primary"
                  size="md"
                  onClick={() => {
                    if (
                      localStorage.getItem('mId') &&
                      localStorage.getItem('mId') !== '0'
                    ) {
                      let item = {
                        pId: props.detail[0].pId,
                        pName: props.detail[0].pName,
                        pQuantity: 1,
                        pPrice: props.detail[0].pPrice,
                        pImg: props.detail[0].pImg,
                      }
                      let cart = []
                      cart.push(item)

                      if (localStorage.getItem('cart') === null) {
                        localStorage.setItem('cart', JSON.stringify(cart))
                      } else {
                        let currentCart = JSON.parse(
                          localStorage.getItem('cart')
                        )
                        if (
                          [...currentCart].find(
                            (value) => value.pId === props.detail[0].pId
                          )
                        ) {
                          Swal.fire({
                            title: '已加入購物車',
                            text: '前往購物車結帳?',
                            icon: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#cea160',
                            cancelButtonColor: '#cccccc',
                            confirmButtonText: '確定',
                            cancelButtonText: '取消',
                          }).then((result) => {
                            if (result.value) {
                              props.history.push('/cart')
                            }
                          })
                        } else {
                          props.count(mycart)
                          const newCart = [...currentCart, item]
                          localStorage.setItem('cart', JSON.stringify(newCart))
                          Swal.fire({
                            title: '加入成功',
                            text: '前往購物車結帳?',
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonColor: '#cea160',
                            cancelButtonColor: '#cccccc',
                            confirmButtonText: '確定',
                            cancelButtonText: '取消',
                          }).then((result) => {
                            if (result.value) {
                              props.history.push('/cart')
                            }
                          })
                        }
                      }
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
                  <MdShoppingCart className="mb-md-1" />
                  快速結帳
                </Button>
              </div>
            </Col>
            <Col
              md={12}
              lg={3}
              className="d-flex flex-lg-column justify-content-around "
            >
              <div
                className="mb-3 border p-3"
                style={{
                  width: 100 + '%',
                  height: 100 + 'px',
                  overflow: 'hidden',
                }}
              >
                <h6 className="text-center border-bottom">為何選擇我們?</h6>
                <div>我們秉持著給消費者最好，提供最優質的商品</div>
              </div>
              <div
                className="mb-3 border p-3"
                style={{
                  width: 100 + '%',
                  height: 100 + 'px',
                  overflow: 'hidden',
                }}
              >
                <h6 className="text-center border-bottom">為何選擇此產品?</h6>
                <div>在各項評比獲得最高分，並廣受消費者好評</div>
              </div>
              <div
                className="mb-3 border p-3"
                style={{
                  width: 100 + '%',
                  height: 100 + 'px',
                  overflow: 'scroll',
                }}
              >
                <h6 className="text-center border-bottom">運貨與退貨通知</h6>
                <div>只須登入帳戶，或撥電話聯絡我們，即有專人服務</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="mt-md-3" md={12}>
              <Accordion className="mb-5" defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0" type="button">
                    商品說明
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body style={{ whiteSpace: 'pre-line' }}>
                      {props.detail[0] ? props.detail[0].pDes : ''}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1" type="button">
                    商品評論
                    {
                      <>
                        <AiFillLike
                          className="mx-2"
                          style={{ color: 'rgb(32, 120, 244)' }}
                        />
                        {props.comments.likes}
                        <AiFillDislike
                          className="mx-2"
                          style={{ color: 'rgb(243, 62, 88)' }}
                        />
                        {props.comments.dislikes}
                      </>
                    }
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      {props.comments.rows &&
                        props.comments.rows.map((value, index) => {
                          return (
                            <>
                              <div className="d-flex justify-content-between">
                                <Image
                                  roundedCircle
                                  width="50"
                                  src={
                                    value.mImg === '' || value.mImg === null
                                      ? require('../../images/member/member-img/m300.jpg')
                                      : require('../../images/member/member-img/' +
                                          value.mImg.toLowerCase() +
                                          '.jpg')
                                  }
                                />
                                <span>{index + 1 + 'F'}</span>
                              </div>
                              <p>
                                {'***' + value.mAccount.slice(0, 3) + '***'}
                              </p>
                              <div className="d-none">
                                <Button
                                  variant="outline-transparent"
                                  className="p-0 btn-transparent text-dark border-0 mr-1"
                                  onClick={(e) => {
                                    $(e.currentTarget)
                                      .children()
                                      .addClass('like')
                                      .parent()
                                      .siblings()
                                      .children()
                                      .removeClass('dislike')
                                    comment.rating = 1
                                  }}
                                >
                                  <div>
                                    <AiFillLike />
                                    <span>喜歡</span>
                                  </div>
                                </Button>
                                <Button
                                  variant="outline-transparent"
                                  className="p-0 btn-transparent text-dark border-0 ml-1"
                                  rating="0"
                                  onClick={(e) => {
                                    $(e.currentTarget)
                                      .children()
                                      .addClass('dislike')
                                      .parent()
                                      .siblings()
                                      .children()
                                      .removeClass('like')
                                    comment.rating = 0
                                  }}
                                >
                                  <div>
                                    <AiFillDislike />
                                    <span>不喜歡</span>
                                  </div>
                                </Button>
                              </div>
                              <textarea
                                readOnly="readOnly"
                                className="border-0"
                                style={{ resize: 'none' }}
                                defaultValue={value.comment}
                                onChange={(e) => {
                                  comment.content = e.currentTarget.value
                                }}
                              />
                              <div className="d-flex justify-content-between">
                                <span>{value.updated_at}</span>
                                {value.mId == localStorage.getItem('mId') ? (
                                  <div>
                                    <Button
                                      variant="link"
                                      className="p-0 text-decoration-none"
                                      onClick={(e) => {
                                        $(e.currentTarget)
                                          .parents('.d-flex')
                                          .prev()
                                          .removeAttr('readOnly')
                                          .attr('class', 'border')
                                        $(e.currentTarget)
                                          .next()
                                          .attr(
                                            'class',
                                            'p-0 text-decoration-none btn btn-link'
                                          )
                                        $(e.currentTarget)
                                          .next()
                                          .next()
                                          .attr(
                                            'class',
                                            'p-0 text-decoration-none btn btn-link'
                                          )
                                        $(e.currentTarget)
                                          .parents('.d-flex')
                                          .prev()
                                          .prev()
                                          .attr('class', 'd-block')
                                        $(e.currentTarget).attr(
                                          'class',
                                          'd-none'
                                        )
                                      }}
                                    >
                                      編輯評論
                                    </Button>
                                    <Button
                                      variant="link"
                                      className="p-0 text-decoration-none d-none"
                                      onClick={(e) => {
                                        $(e.currentTarget).attr(
                                          'class',
                                          'd-none'
                                        )
                                        $(e.currentTarget)
                                          .next()
                                          .attr('class', 'd-none')
                                        $(e.currentTarget)
                                          .parents('.d-flex')
                                          .prev()
                                          .attr('readOnly', 'readOnly')
                                          .attr('class', 'border-0')
                                        $(e.currentTarget)
                                          .parents('.d-flex')
                                          .prev()
                                          .prev()
                                          .attr('class', 'd-none')
                                        $(e.currentTarget)
                                          .prev()
                                          .attr(
                                            'class',
                                            'p-0 text-decoration-none btn btn-link'
                                          )
                                        editComment(value.id, value.mId)
                                        window.location.reload()
                                      }}
                                    >
                                      編輯完成 |{' '}
                                    </Button>
                                    <Button
                                      variant="link"
                                      className="p-0 text-decoration-none d-none"
                                      onClick={(e) => {
                                        $(e.currentTarget).attr(
                                          'class',
                                          'd-none'
                                        )
                                        $(e.currentTarget)
                                          .prev()
                                          .attr('class', 'd-none')
                                        $(e.currentTarget)
                                          .prev()
                                          .prev()
                                          .attr(
                                            'class',
                                            'p-0 text-decoration-none btn btn-link'
                                          )
                                        $(e.currentTarget)
                                          .parents('.d-flex')
                                          .prev()
                                          .attr('readOnly', 'readOnly')
                                          .attr('class', 'border-0')
                                        $(e.currentTarget)
                                          .parents('.d-flex')
                                          .prev()
                                          .prev()
                                          .attr('class', 'd-none')
                                      }}
                                    >
                                      編輯取消 |{' '}
                                    </Button>
                                    <Button
                                      variant="link"
                                      className="p-0 text-decoration-none"
                                      onClick={() => {
                                        delComment(value.id, value.mId)
                                        Swal.fire({
                                          icon: 'success',
                                          title: '成功刪除1筆評論',
                                          showConfirmButton: false,
                                          timer: 1500,
                                        })
                                        setTimeout(() => {
                                          window.location.reload(
                                            '/productdetail/' +
                                              props.detail[0].pId
                                          )
                                        }, 1800)
                                      }}
                                    >
                                      刪除評論
                                    </Button>
                                  </div>
                                ) : (
                                  ''
                                )}
                              </div>
                              <hr />
                            </>
                          )
                        })}
                      <PrdouctComment />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="mt-5 d-flex justify-content-between">
                <p>猜你喜歡</p>
                <Link
                  to={
                    props.detail[0]
                      ? '/products?cId=' + props.detail[0].pCategoryId
                      : ''
                  }
                >
                  查看更多>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            {props.list.rows &&
              arr.map((value, index) => {
                return (
                  <ProductCardSmall key={index} data={props.list.rows[index]} />
                )
              })}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (store) => {
  return {
    list: store.getProducts,
    detail: store.getProductDetail,
    comments: store.showComments,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getProducts, getProductDetail, count, getComments },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
)
