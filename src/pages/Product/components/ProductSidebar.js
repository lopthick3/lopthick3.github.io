import React from 'react'
import { Row, Col, Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getProducts, getCategory, getVendor } from '../actions/index'
import $ from 'jquery'
const ProductSidebar = (props) => {
  const productCategory = [
    '飼料',
    '零食',
    '犬用保健食品',
    '狗罐頭/鮮食/餐盒',
    '美容/清潔用品',
    '犬用玩具',
    '狗籠/狗屋',
    '床組',
    '狗衣服',
    '牽繩',
    '胸帶',
    '項圈',
    '名牌/吊牌',
    '外出提籠/推車',
    '其他犬用品',
  ]
  const productBrand = [
    'EZDOG',
    '飛萊希',
    'SPUTNIK-EX',
    'tails&me',
    'IBIYAYA',
    'pet gear',
    '希爾思',
    'Furhaven',
    'BigBarker',
    'PETMAKER',
    'Pawhut',
    'Petmate',
    'MidWestHom',
    'Petsfit',
    'Ruff Ruff',
    'ALLSTARDOG',
    'Vetri Scie',
    'NOW PETS',
    'Lintbells',
    'Holistic B',
    'CANIDAE 卡比',
    'HALO 嘿囉',
    'Farmina法米納',
    'Nutram 紐頓',
    'arrr',
  ]

  const productCategorysidebar = productCategory.map((value, index) => (
    <Nav.Link
      key={value}
      className="class"
      onClick={(e) => {
        props.history.push('/products?cId=' + eval(index + 1))
        props.getCategory(props.match.params.page || '')
        $(e.currentTarget)
          .addClass('bg-primary text-dark text-right font-weight-bold selected')
          .siblings()
          .removeClass(
            'bg-primary text-dark text-right font-weight-bold selected'
          )
      }}
    >
      {value}
    </Nav.Link>
  ))

  const productBrandSidebar = productBrand.map((value, index) => (
    <Nav.Link
      key={value}
      className="brand"
      onClick={(e) => {
        props.history.push('/products?vId=' + eval(index + 1))
        props.getVendor(props.match.params.page || '')
        $(e.currentTarget)
          .addClass('bg-primary text-dark text-right font-weight-bold selected')
          .siblings()
          .removeClass(
            'bg-primary text-dark text-right font-weight-bold selected'
          )
      }}
    >
      {value}
    </Nav.Link>
  ))
  return (
    <Col sm={12} md={12} lg={2} className="sidebar">
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav order-1" />
        <Navbar.Collapse id="basic-navbar-nav" className="order-4 order-md-3">
          <Nav className="nav-menu mr-auto flex-column">
            <Row>
              <Col md={6} lg={12}>
                <Nav.Link
                  as="h4"
                  className="mt-1 p-0"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    props.history.push('/products')
                    props.getProducts(props.match.params.page || '')
                    $(e.currentTarget)
                      .addClass(
                        'bg-primary text-dark text-right font-weight-bold selected'
                      )
                      .siblings()
                      .removeClass(
                        'bg-primary text-dark text-right font-weight-bold selected'
                      )
                  }}
                >
                  全部商品
                </Nav.Link>
                {productCategorysidebar}
              </Col>
              <Col md={6} lg={12}>
                <h4 className="mt-1">品牌</h4>
                {productBrandSidebar}
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Col>
  )
}

//若不在此元件儲存狀態得放置null
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProducts, getCategory, getVendor }, dispatch)
}
export default withRouter(connect(null, mapDispatchToProps)(ProductSidebar))
