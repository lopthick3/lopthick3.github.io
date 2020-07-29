import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../images/logo-dark.svg'
import { FiHeart } from 'react-icons/fi'
import { AiOutlineUser, AiOutlineShopping } from 'react-icons/ai'
import { FaDog } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDataFromServer, linkTo } from '../utils/service/ServiceFunction'
function Header(props) {
  $('#logout').click(function () {
    // clearAllCookie()
    localStorage.removeItem('mName')
    localStorage.setItem('mId', '0')
    localStorage.setItem('mImg', 'M030')
    window.location.replace('http://localhost:3000/login/')
  })
  //-----保姆管理介面-----
  const [sUserData, setsUserData] = useState([]) //保姆資料
  const [sOrderNum, setsOrderNum] = useState() //訂單數量資料
  useEffect(() => {
    const sUser = getDataFromServer(
      `http://localhost:6001/service/user/getmId?mId=${localStorage.getItem(
        'mId'
      )}&dataSts=Y`
    )
    Promise.resolve(sUser).then((data) => {
      //如果查詢有使用者資料則帶入資料
      setsUserData(data)
    })
    //----------
  }, [])
  //-----登出-----
  function logout() {
    // clearAllCookie()
    localStorage.removeItem('mName')
    localStorage.setItem('mId', '0')
    localStorage.setItem('mImg', 'M030')
    linkTo(props.location.pathname)
  }

  useEffect(() => {}, [props.qty || props.data])
  return (
    <>
      <header className="sticky-top">
        <Navbar bg="white" variant="light" expand="md">
          <Navbar.Toggle aria-controls="basic-navbar-nav order-1" />
          <Navbar.Brand href="/" className="mx-auto ml-md-0 mr-md-5 order-2">
            <Logo className="App-logo" alt="logo" />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className="order-4 order-md-3">
            <Nav className="mr-auto nav-menu">
              <Nav.Link href="#news">最新消息</Nav.Link>
              <Nav.Link href="/products">找商品</Nav.Link>
              <NavDropdown title="找服務" id="basic-nav-dropdown">
                <NavDropdown.Item href="/service">
                  保姆照顧服務
                </NavDropdown.Item>
                <NavDropdown.Item href="/service/query">
                  尋找狗狗保姆
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/service/apply">
                  成為狗狗保姆
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/activity">找活動</Nav.Link>
              <NavDropdown title="找知識">
                <NavDropdown.Item href="/knowledge/blog">
                  找文章
                </NavDropdown.Item>
                <NavDropdown.Item href="/knowledge/partner">
                  找夥伴
                </NavDropdown.Item>
                <NavDropdown.Item href="/knowledge/question">
                  找答案
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#qa">常見Q&A</Nav.Link>
              {/* <Nav.Link href="/coupon">Test Coupon</Nav.Link> */}
              {/* <h3 className="text-right">
                {localStorage.getItem('mName')}你好
              </h3> */}
            </Nav>
          </Navbar.Collapse>
          <Nav className="nav-icon order-3 order-md-4">
            {sUserData.map((v, i) => {
              const sOrder = getDataFromServer(
                `http://localhost:6001/service/order/${v.id}?orderStsId='o01'`
              )
              Promise.resolve(sOrder).then((data) => {
                //如果查詢有使用者資料則帶入資料
                setsOrderNum(data.length)
              })
              return (
                <div className="nav-link" key={i}>
                  <div className={`icon ${sOrderNum ? 'icon-unread' : ''}`}>
                    <IconContext.Provider value={{ size: '1.5rem' }}>
                      <FaDog />
                    </IconContext.Provider>
                  </div>

                  <div className="dropdown-menu">
                    <Link
                      to="/service/admin/"
                      className="dropdown-item nav-link"
                    >
                      主頁
                    </Link>
                    <Link
                      to="/service/admin/profile/"
                      className="dropdown-item nav-link"
                    >
                      資料修改
                    </Link>
                    <Link
                      to="/service/admin/order/"
                      className="dropdown-item nav-link"
                    >
                      訂單查詢
                      {sOrderNum ? (
                        <span className="badge badge-danger ml-1">
                          {sOrderNum}
                        </span>
                      ) : (
                        ''
                      )}
                    </Link>
                  </div>
                </div>
              )
            })}

            <div className="nav-link">
              <IconContext.Provider
                value={{ size: '1.5rem', className: 'user' }}
              >
                <AiOutlineUser />
              </IconContext.Provider>
              <div className="dropdown-menu">
                {localStorage.getItem('mId') === null ||
                localStorage.getItem('mId') === '0' ? (
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: props.location.pathname },
                    }}
                    className="dropdown-item nav-link"
                  >
                    登入
                  </Link>
                ) : (
                  <Link
                    to="#"
                    className="dropdown-item nav-link logout"
                    onClick={() => logout()}
                  >
                    登出
                  </Link>
                )}
                <Link to="/member" className="dropdown-item nav-link">
                  會員首頁
                </Link>
                {localStorage.getItem('mId') === '0' ? (
                  ''
                ) : (
                  <Link to="/coupon" className="dropdown-item nav-link logout">
                    優惠券
                  </Link>
                )}
              </div>
            </div>
            <Nav.Link
              onClick={() => {
                props.history.push('/list/' + localStorage.getItem('mId'))
              }}
            >
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <FiHeart />
              </IconContext.Provider>
            </Nav.Link>
            <Nav className="nav-icon order-3 order-md-4">
              <div className="nav-link">
                {JSON.parse(localStorage.getItem('cart')) === null ||
                JSON.parse(localStorage.getItem('cart')).length === 0 ||
                localStorage.getItem('mId') === '0' ||
                localStorage.getItem('mId') === null ? (
                  <div className="icon">
                    <IconContext.Provider value={{ size: '1.5rem' }}>
                      <AiOutlineShopping />
                    </IconContext.Provider>
                  </div>
                ) : (
                  <div className="icon icon-unread">
                    <IconContext.Provider value={{ size: '1.5rem' }}>
                      <AiOutlineShopping />
                    </IconContext.Provider>
                  </div>
                )}

                <div className="dropdown-menu">
                  <Link to="/cart" className="dropdown-item text-center">
                    您的購物車
                  </Link>
                  <div className="dropdown-divider" role="separator"></div>

                  <Link className="dropdown-item nav-link">
                    {JSON.parse(localStorage.getItem('cart')) === null ||
                    JSON.parse(localStorage.getItem('cart')).length === 0 ||
                    localStorage.getItem('mId') === '0' ||
                    localStorage.getItem('mId') === null ? (
                      <div className="text-center">
                        <span>購物車沒有商品</span>
                        <br />
                        <Link to="/products" className="p-0">
                          <Button className="text-center p-1">去選購吧</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span>有</span>
                        <span className="badge badge-danger m-0">
                          {JSON.parse(localStorage.getItem('cart')).length}
                        </span>
                        <span>項商品</span>
                        <br />
                        <br />
                        <Link to="/cart" className="p-0">
                          <Button className="text-center p-1">去結帳吧</Button>
                        </Link>
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </Nav>
          </Nav>
        </Navbar>
      </header>
    </>
  )
}
const mapStateToProps = (store) => {
  return {
    qty: store.getQuantity,
    data: store.getMember,
  }
}
export default withRouter(connect(mapStateToProps, null)(Header))
