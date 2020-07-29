import React, { useState, useEffect } from 'react'
import '../../../css/marketing/coupon.scss'
import { Nav, Navbar, Form, Button, Col, Row, Table } from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'
import CouponDescription from '../../../pages/Marketing/CouponDescription'
import CouponEvent from '../../../pages/Marketing/CouponEvent'
import CouponNav from '../../../components/marketing/CouponNav'
import CouponInsert from '../../../components/marketing/CouponInsert'
import CouponList from '../../../components/marketing/CouponList'
import $ from 'jquery'
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import {
  formServerCouponsWE,
  formServerCouponsALL,
} from '../../../actions/marketingActions'

function Coupon(props) {
  const [couponList, setCouponList] = useState('')
  // console.log(props)
  // console.log(props.data)
  // console.log(props)
  let y = localStorage.getItem('mId')
  useEffect(() => {
    props.formServerCouponsWE(0, y)
    $('.CouponListNavAC1').on('click', function () {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
        .end()
        .parent()
        .parent()
        .parent()
        .siblings('.marketingcoupon')
        .children('.CouponList1')
        .addClass('active')
        .siblings()
        .removeClass('active')
    })
    $('.CouponListNavAC2').on('click', function () {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
        .end()
        .parent()
        .parent()
        .parent()
        .siblings('.marketingcoupon')
        .children('.CouponList2')
        .addClass('active')
        .siblings()
        .removeClass('active')
    })
    $('.CouponListNavAC3').on('click', function () {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
        .end()
        .parent()
        .parent()
        .parent()
        .siblings('.marketingcoupon')
        .children('.CouponList3')
        .addClass('active')
        .siblings()
        .removeClass('active')
    })
    $('.nav-item').click(function () {
      let effect = $(this).data('effect')
      console.log(effect)
      switch (effect) {
        case 'show1':
          $('#content1').fadeIn()
          $('#content2').fadeOut()
          $('#content3').fadeOut()
          break
        case 'show2':
          $('#content1').fadeOut()
          $('#content2').fadeIn()
          $('#content3').fadeOut()
          break
        case 'show3':
          $('#content1').fadeOut()
          $('#content2').fadeOut()
          $('#content3').fadeIn()
          break
      }
      $('.nav-link').removeClass('active')
      $(this).find('a').addClass('active')
    })
  }, [])
  // console.log(123456788, props)
  if (!props.data) return <></>
  // if (props.data) console.log(props.data)
  return (
    <>
      <div class="tab-content content couponListContainer" id="content2">
        <div>
          <h3>
            我的優惠
            <br />
          </h3>
          <div class="row">
            <div class="col-md-8">
              <div class="card card-width">
                <div class="card-body">
                  <form
                    name="myForm"
                    method="POST"
                    enctype="multipart/form-data"
                  >
                    <div className="container">
                      <div className="couponlistnav">
                        <head-nav className="border-bottom mb-3 ">
                          <Nav bg="white" variant="light" expand="md">
                            <Nav className="mr-auto nav-menu">
                              <Nav.Link
                                className="CouponListNavAC1 active"
                                onClick={() => {
                                  props.formServerCouponsWE(0, y)
                                }}
                              >
                                未使用
                              </Nav.Link>
                              <Nav.Link
                                className="CouponListNavAC2"
                                onClick={() => {
                                  props.formServerCouponsWE(1, y)
                                }}
                              >
                                已使用
                              </Nav.Link>
                              <Nav.Link
                                className="CouponListNavAC3"
                                onClick={() => {
                                  props.formServerCouponsALL(y)
                                }}
                              >
                                全部顯示
                              </Nav.Link>
                            </Nav>
                          </Nav>
                        </head-nav>
                      </div>
                    </div>
                    <CouponList data={props.data} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (store) => {
  return { data: store.getCoupons }
}

//action
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { formServerCouponsWE, formServerCouponsALL },
    dispatch
  )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coupon))
