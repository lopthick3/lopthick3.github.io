import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Col, Card, Image, Button } from 'react-bootstrap'
import '../../../css/product/productCard.scss'
import Swal from 'sweetalert2/src/sweetalert2.js'
import { FiClock } from 'react-icons/fi'

const ProductCard = (props) => {
  return (
    <Col xs={12} sm={12} md={6} lg={4} className="mb-3 WNQ">
      <Card className="text-center">
        <Link to={'/productdetail/' + props.data.pId} className="p-0">
          <Image
            src={require('../../../images/product/' + props.data.pImg + '.jpg')}
            className="card-img-top mt-3"
            alt="..."
          />
        </Link>
        <Card.Body className="card-body">
          <Card.Title>{props.data.pName}</Card.Title>
          <Card.Text>{props.data.pInfo}</Card.Text>
          <Card.Text as="h4" className="text-danger font-weight-bold">
            NTD {props.data.pPrice}元
          </Card.Text>
          <p>
            <FiClock />
            上架時間 {props.data.created_at}
          </p>
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
              className="p-1"
              onClick={() => {
                if (
                  localStorage.getItem('mId') &&
                  localStorage.getItem('mId') !== '0'
                ) {
                  let item = {
                    pId: props.data.pId,
                    pName: props.data.pName,
                    pQuantity: 1,
                    pPrice: props.data.pPrice,
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
              快速結帳
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default withRouter(ProductCard)
