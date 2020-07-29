import React from 'react'
import { Nav, Navbar, Form, Button, Col, Row } from 'react-bootstrap'
import '../../css/marketing/coupon.scss'
function BonusPointsNav(props) {
  console.log(props)
  return (
    <>
      <div className="bonuspoints">
        <div className="border-bottom mb-3 justify-content-center d-flex">
          <Nav bg="white" variant="light" expand="md">
            <Nav className="mr-auto nav-menu">
              <Nav.Link href="/bonuspoints">紅利商品</Nav.Link>
              <Nav.Link href="/bonuspoints/event">紅利折抵</Nav.Link>
              <Nav.Link href="/bonuspoints/description">紅利說明</Nav.Link>
              <Nav></Nav>
              <div className="bonuspoints-nav bonuspoints">
                <div className="bonuspoints-value">
                  現在紅利點數 : {props.bonusPoints} 點
                </div>
              </div>
            </Nav>
          </Nav>
        </div>
      </div>
    </>
  )
}

export default BonusPointsNav
