import React, { useState, useEffect } from 'react'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getMemberData } from './actions/index'
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
import DogInfo from '../../components/member/member-info/dog-info'
import Memberinfo from '../../components/member/member-info/member-info'
const MemberInfo = (props) => {
  //會員基本資料

  var i = document.cookie + 1
  const mId = props.data[i] ? props.data[i].mId : ''
  const mName = props.data[i] ? props.data[i].mName : ''
  const mAccount = props.data[i] ? props.data[i].mAccount : ''
  const mPassword = props.data[i] ? props.data[i].mPassword : ''
  const mImg = props.data[i] ? props.data[i].mImg : ''
  const mGender = props.data[i] ? props.data[i].mGender : ''
  const mBday = props.data[i] ? props.data[i].mBday : ''
  const mPhone = props.data[i] ? props.data[i].mPhone : ''
  const mEmail = props.data[i] ? props.data[i].mEmail : ''
  const mAddress = props.data[i] ? props.data[i].mAddress : ''
  //狗狗基本資料
  // function clearAllCookie() {
  //   var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  //   if (keys) {
  //     for (var i = keys.length; i--; )
  //       document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  //   }
  // }
  //新增cookie
  function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + '; ' + expires
  }
  function clearCookie(name) {
    setCookie(name, '', -1)
  }
  function deleteAllCookies() {
    var cookies = document.cookie.split(';')

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i]
      var eqPos = cookie.indexOf('=')
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }
  //清除cookie
  function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (var i = keys.length; i--; )
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }

  useEffect(() => {
    props.getMemberData()
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
    $('#logout').click(function () {
      // clearAllCookie()
      // clearCookie('mId')
      // localStorage.clear()
      localStorage.setItem('mId', 0)
      localStorage.removeItem('mName')
      localStorage.setItem('cart', [])
      window.location.replace('http://localhost:3000/login/')
    })
    $('#loglog').click(function () {
      // clearCookie('mId')
      clearCookie('mId')
      // localStorage.clear()
    })
  }, [document.cookie])

  return (
    <>
      {localStorage.getItem('mId') === '0' ? (
        <h1>請登入</h1>
      ) : (
        <>
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
                        個人資訊
                      </Link>
                    </li>
                    <li class="nav-item" id="pokemon2" data-effect="show2">
                      <Link class="nav-link" to="#">
                        狗狗資訊
                      </Link>
                    </li>
                  </ul>
                  <Memberinfo />
                  <DogInfo />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
const mapStateToProps = (store) => {
  return { data: store.getMember }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMemberData }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberInfo)
