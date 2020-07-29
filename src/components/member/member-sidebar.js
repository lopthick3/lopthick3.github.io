import React from 'react'

import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from 'react-bootstrap'

import { FiSearch, FiHeart } from 'react-icons/fi'
import { AiOutlineUser, AiOutlineShopping } from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import '../../css/member/member-info.css '
import MemberInfo from '../../pages/member/member-info'
import MemberItem from '../../pages/member/member-item'
import MemberService from '../../pages/member/member-service'
function Member(props) {
  return (
    <>
      <Route path="/member/member-info">
        <MemberInfo />
      </Route>
      <Route path="/member/member-service">
        <MemberService />
      </Route>
      <Route path="/member/member-item">
        <MemberItem />
      </Route>

      <div className="member-content d-flex ">
        <div className="member-sidebar">
          <Nav>
            <Nav.Link className="member-sidebar-text" href="/member">
              <img
                src={require('../../images/member/paws-m.png')}
                alt="Background"
              />
              首頁
            </Nav.Link>
            <Nav.Link
              className="member-sidebar-text"
              href="/member/member-info"
            >
              <img
                src={require('../../images/member/paws-m.png')}
                alt="Background"
              />
              個人資訊
            </Nav.Link>

            <Nav.Link
              className="member-sidebar-text"
              href="/member/member-item"
            >
              <img
                src={require('../../images/member/paws-m.png')}
                alt="Background"
              />
              商品查詢
            </Nav.Link>
            <Nav.Link
              className="member-sidebar-text"
              href="/member/member-item"
            >
              <img
                src={require('../../images/member/paws-m.png')}
                alt="Background"
              />
              服務查詢
            </Nav.Link>
          </Nav>
        </div>
      </div>
    </>
  )
}

export default Member
