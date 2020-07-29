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
import '../../css/member/member.scss'
import MemberInfo from './member-info'
import MemberItem from './member-item'
import MemberService from './member-service'
import MemberActivity from './member-activity'
import Pokemon from '../../components/member/pokemon'

function Member() {
  if (
    localStorage.getItem('mImg') === null ||
    localStorage.getItem('mImg') === ''
  ) {
    localStorage.setItem('mImg', 'm300')
  }
  return (
    <>
      {localStorage.getItem('mId') === '0' ? (
        <div className="d-flex">
          <img
            // src={require('../../images/member/member-img/m004.jpg')}
            src={require('../../images/member/nologin.png')}
            alt="Background"
          ></img>
          <h1 className="fastLogin">趕緊去登入</h1>
        </div>
      ) : (
        <Switch>
          <Route path="/member/member-info">
            <MemberInfo />
          </Route>
          <Route path="/member/member-item">
            <MemberItem />
          </Route>
          <Route path="/member/member-service">
            <MemberService />
          </Route>
          <Route path="/member/member-activity">
            <MemberActivity />
          </Route>
          <div className="Member">
            <div className="member-bg">
              <div className="head">
                <img
                  // src={require('../../images/member/member-img/m004.jpg')}
                  src={require('../../images/member/member-img/' +
                    localStorage.getItem('mImg').toLowerCase() +
                    '.jpg')}
                  alt="Background"
                ></img>
              </div>
              {/* <div className="head-text">
                {localStorage.getItem('mName')}，歡迎使用HugDog會員頁面
              </div> */}
            </div>
            <div className="full-body">
              <div className="member-content d-flex row ">
                <div className="member-sidebar w120 member-sidebar-home">
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
                  </Nav>
                </div>

                <div className="member-form-container  container">
                  <div className="member-form-2">
                    <div className="member-form">
                      <div className="title-box">
                        <p>個人資訊</p>
                      </div>
                      <ul>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-info"
                        >
                          個人資訊修改
                        </Nav.Link>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-info"
                        >
                          狗狗資訊修改
                        </Nav.Link>
                      </ul>
                    </div>
                    <div className="member-form">
                      <div className="title-box">
                        <p>商品查詢</p>
                      </div>
                      <ul>
                        {' '}
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-item"
                        >
                          我的優惠
                        </Nav.Link>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-item"
                        >
                          我的訂單
                        </Nav.Link>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-item"
                        >
                          我的最愛
                        </Nav.Link>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-item"
                        >
                          購物車
                        </Nav.Link>
                      </ul>
                    </div>
                  </div>
                  <div className="member-form-2">
                    <div className="member-form">
                      <div className="title-box">
                        <p>服務查詢</p>
                      </div>
                      <ul>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-activity"
                        >
                          保姆訂單查詢
                        </Nav.Link>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-activity"
                        >
                          評論紀錄
                        </Nav.Link>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-activity"
                        >
                          最愛保姆
                        </Nav.Link>
                      </ul>
                    </div>
                    <div className="member-form">
                      <div className="title-box">
                        <p>活動查詢</p>
                      </div>
                      <ul>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-activity"
                        >
                          已報名活動
                        </Nav.Link>
                        <Nav.Link
                          className="member-sidebar-text-content"
                          href="/member/member-activity"
                        >
                          最愛活動
                        </Nav.Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Switch>
      )}
      {localStorage.getItem('mId') === '0' ? '' : <Pokemon />}
    </>
  )
}

export default Member
