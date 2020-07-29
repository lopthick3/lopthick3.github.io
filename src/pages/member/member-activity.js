import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../../css/member/member-info.scss'
import FavoriteActivity from '../../components/member/member-activity/favoriteActivity'
import ActivityOrder from '../../components/member/member-activity/activityOrder'
const MemberInfo = (props) => {
  useEffect(() => {
    //需要搭配箭頭函式才能使用list
    $('.nav-item').click(function () {
      let effect = $(this).data('effect')
      console.log(effect)
      switch (effect) {
        case 'show1':
          $('#content1').fadeIn()
          $('#content2').fadeOut()

          break
        case 'show2':
          $('#content1').fadeOut()
          $('#content2').fadeIn()

          break

          break
      }
      $('.nav-link').removeClass('active')
      $(this).find('a').addClass('active')
    })
  }, [])
  return (
    <div className="Member container">
      <div className="member-info d-flex">
        <div className="member-content d-flex row ">
          <div className="member-sidebar w120">
            <Nav>
              <Nav.Link className="member-sidebar-text" href="/member">
                首頁
              </Nav.Link>
              <Nav.Link
                className="member-sidebar-text"
                href="/member/member-info"
              >
                個人資訊
              </Nav.Link>

              <Nav.Link
                className="member-sidebar-text"
                href="/member/member-item"
              >
                商品查詢
              </Nav.Link>
              <Nav.Link
                className="member-sidebar-text"
                href="/member/member-service"
              >
                服務查詢
              </Nav.Link>
              <Nav.Link
                className="member-sidebar-text"
                href="/member/member-activity"
              >
                活動查詢
              </Nav.Link>
              <button
                className="member-sidebar-text logout"
                href="/login"
                id="logout"
                // onClick={() => clearAllCookie()}
              >
                登出
              </button>
            </Nav>
          </div>
          <div className="member-sidebar-RWD">
            <Nav>
              <Nav.Link className="member-sidebar-text" href="/member">
                首頁
              </Nav.Link>
              <Nav.Link
                className="member-sidebar-text"
                href="/member/member-info"
              >
                個人資訊
              </Nav.Link>

              <Nav.Link
                className="member-sidebar-text"
                href="/member/member-item"
              >
                商品查詢
              </Nav.Link>
              <Nav.Link
                className="member-sidebar-text"
                href="/member/member-service"
              >
                服務查詢
              </Nav.Link>
              <Nav.Link
                className="member-sidebar-text"
                href="/member/member-activity"
              >
                活動查詢
              </Nav.Link>
              <button
                className="member-sidebar-text logout"
                href="/login"
                id="logout"
                // onClick={() => clearAllCookie()}
              >
                登出
              </button>
            </Nav>
          </div>
          <div class=" wrapper">
            <ul class="nav nav-tabs">
              <li class="nav-item" id="pokemon1" data-effect="show1">
                <Link class="nav-link active" to="#">
                  活動訂單查詢
                </Link>
              </li>
              <li class="nav-item" id="pokemon2" data-effect="show2">
                <Link class="nav-link" to="#">
                  最愛活動
                </Link>
              </li>
            </ul>

            <ActivityOrder />
            <FavoriteActivity />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberInfo
