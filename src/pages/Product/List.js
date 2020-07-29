import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { MdAddShoppingCart, MdDelete } from 'react-icons/md'
import $ from 'jquery'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { count } from './actions/index'
import Swal from 'sweetalert2/src/sweetalert2.js'

const List = (props) => {
  //清單狀態
  const [list, setList] = useState([])
  const [mycart, setMycart] = useState([])
  const [show, setShow] = useState(false)

  //從server拿清單
  async function getList() {
    const req = new Request(
      `http://localhost:6001/list/${props.match.params.mId}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const data = await res.json()
    console.log(data)
    setList(data)
  }
  //return完後呼叫清單function;如果沒有監聽狀態,刪除商品後無法使商品列完整消失只會消失按鈕,相比cart少了showCart狀態;因此如果是根據list,前端會一直發出請求
  useEffect(() => {
    getList()
  }, [show])
  //刪除清單項目
  async function delList(itemId) {
    let mId = props.match.params.mId
    const req = new Request(`http://localhost:6001/list/${mId}/del/${itemId}`, {
      method: 'POST',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    if (data.success) {
      Swal.fire({
        icon: 'success',
        title: '成功刪除' + data.result + '筆商品',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      alert('刪除失敗')
    }
  }
  return (
    <>
      <Container className="list">
        <Row className="mt-5">
          <Col md={12}>
            <Row className="mt-5">
              <Col>
                {list.length === 0 ? (
                  <>
                    <h3 className="text-sm-center text-md-left">
                      清單內沒有任何商品
                    </h3>
                    <hr />
                    <Image
                      className="ad"
                      src={require('../../images/product/dog-ad.jpg')}
                      alt="..."
                    />
                    <Link to="/products">
                      <Button variant="primary" size="lg">
                        前往選購
                      </Button>
                    </Link>
                  </>
                ) : (
                  <h3 className="text-sm-center text-md-left">
                    以下是你清單內的商品 共{list.length}件
                  </h3>
                )}
                <hr />
              </Col>
            </Row>
            {list.map((value, index) => {
              return (
                <Row className="item align-items-center" key={value.pId}>
                  <Col md={4} className="text-center">
                    <Link to={'/productdetail/' + value.pId} className="p-0">
                      <Image
                        src={require('../../images/product/' +
                          value.pImg +
                          '.jpg')}
                        className="card-img-top"
                        alt="..."
                      />
                    </Link>
                  </Col>
                  <Col md={2}>
                    <h4 className="font-weight-bold">{value.pName}</h4>
                  </Col>
                  <Col md={2} className="text-center">
                    <h4>庫存數量:{value.pQuantity}</h4>
                    <h4>價格:{value.pPrice}</h4>
                  </Col>
                  <Col md={2}>
                    <h4 className="text-center font-weight-bold">
                      NT${value.pPrice}
                    </h4>
                  </Col>
                  <Col
                    md={2}
                    className="d-md-flex flex-md-column d-sm-flex justify-content-sm-between"
                  >
                    <Button
                      className="mb-2"
                      variant="outline-primary"
                      size="md"
                      onClick={() => {
                        let item = {
                          pId: value.pId,
                          pName: value.pName,
                          pQuantity: 1,
                          pPrice: value.pPrice,
                          pImg: value.pImg,
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
                              (currentValue) => currentValue.pId === value.pId
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
                            localStorage.setItem(
                              'cart',
                              JSON.stringify(newCart)
                            )
                            Swal.fire({
                              title: '加入成功',
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
                          }
                        }
                      }}
                    >
                      <MdAddShoppingCart className="mb-md-1" />
                      加入購物車
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
                            delList(value.itemId)
                            setShow(!show)
                            $(e.currentTarget).parentsUntil('.item').fadeOut()
                          }
                        })
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
              均無法聯繫逾三天者，本公司將取消該筆訂單，並且全額退款。
              送貨範圍：
              限台灣本島地區。注意！收件地址請勿為郵政信箱。若有台灣本島以外地區送貨需求，收貨人地址請填台灣本島親友的地址。
              產品責任險：
              本產品已投保新光產物產品責任保險$250,000,000元。(保險證號：130008AKP0000930)
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ count }, dispatch)
}
export default withRouter(connect(null, mapDispatchToProps)(List))
