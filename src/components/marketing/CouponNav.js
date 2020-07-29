import React from 'react'
import { Nav, Navbar, Form, Button, Col, Row } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import { FiSearch, FiHeart } from 'react-icons/fi'
import { GiTicket } from 'react-icons/gi'
import { IconContext } from 'react-icons'
import '../../css/marketing/coupon.scss'
function CouponNav(props) {
  return (
    <>
      <div className="marketing">
        <div className="border-bottom mb-3 justify-content-center d-flex">
          <Nav bg="white" variant="light" expand="md">
            <Nav className="mr-auto nav-menu">
              <Nav.Link href="/coupon">優惠券輸入</Nav.Link>
              <Nav.Link href="/coupon/event">取得優惠券</Nav.Link>
              <Nav.Link href="/coupon/description">優惠券說明</Nav.Link>
              <Nav></Nav>
              <div className="marketing-nav"></div>
            </Nav>
          </Nav>
        </div>
      </div>
    </>
  )
}

export default CouponNav
