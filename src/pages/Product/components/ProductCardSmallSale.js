import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Col, Card, Nav, Button, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { count } from '../actions/index'
import $ from 'jquery'
import '../../../css/product/productCard.scss'
import Swal from 'sweetalert2/src/sweetalert2.js'

const ProductCardSmallSale = (props) => {
  return (
    <Col md={6} lg={3} className="mb-3 WNQsale">
      <Card className="shadow-sm text-center">
        <Link to={'/productdetail/' + props.data.pId}>
          <Image
            src={require('../../../images/product/' + props.data.pImg + '.jpg')}
            className="card-img-top mt-3"
            alt="..."
          />
        </Link>
        <Card.Body className="card-body">
          <Card.Title className="">{props.data.pName}</Card.Title>
          <Card.Text className="">{props.data.pInfo}</Card.Text>
          <div className="d-flex justify-content-around">
            <Card.Text className="text-danger  justify-content-between">
              <del>NTD {props.data.pPrice}元</del>
            </Card.Text>
            <Card.Text className="text-info  font-weight-bold">
              <u>NTD {Math.ceil(props.data.pPrice * 0.8)}元</u>
            </Card.Text>
          </div>
          <div className="d-flex justify-content-around">
            <Button
              className="p-1"
              onClick={() => {
                props.history.push('/productdetail/' + props.data.pId)
              }}
            >
              查看商品
            </Button>
            <Button
              className=" p-1"
              onClick={(e) => {
                if (
                  localStorage.getItem('mId') &&
                  localStorage.getItem('mId') !== '0'
                ) {
                  let item = {
                    pId: props.data.pId,
                    pName: props.data.pName,
                    pQuantity: 1,
                    pPrice: Math.ceil(props.data.pPrice * 0.8),
                    pImg: props.data.pImg,
                  }
                  let cart = []
                  cart.push(item)

                  if (localStorage.getItem('cart') === null) {
                    localStorage.setItem('cart', JSON.stringify(cart))
                  } else {
                    let currentCart = JSON.parse(localStorage.getItem('cart'))
                    if (
                      [...currentCart].find(
                        (value) => value.pId === props.data.pId
                      )
                    ) {
                      Swal.fire({
                        title: '已加入購物車',
                        icon: 'info',
                        showConfirmButton: true,
                      })
                    } else {
                      const newCart = [...currentCart, item]
                      props.count(newCart)
                      localStorage.setItem('cart', JSON.stringify(newCart))
                      // $(e.currentTarget).parentsUntil('.WNQsale').fadeOut()
                      Swal.fire({
                        icon: 'success',
                        title: '加入成功',
                        showConfirmButton: false,
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
              快速結帳
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ count }, dispatch)
}
export default withRouter(
  connect(null, mapDispatchToProps)(ProductCardSmallSale)
)
