import React, { useState, useEffect, useCallback } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Modal, Button } from 'react-bootstrap'
import ModalHeader from 'react-bootstrap/ModalHeader'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import $ from 'jquery'
import { IconContext } from 'react-icons'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getMemberData, getMemberDetail } from '../pages/member/actions/index'
//引入自己的css
import '../css/index/index.scss'
import CarouselPage from '../components/index/carousel'

function Home(props) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = function () {
    handleClose2()
    setShow(true)
  }
  const [show2, setShow2] = useState(false)
  const handleClose2 = () => setShow2(false)
  const handleShow2 = function () {
    handleClose()
    setShow2(true)
  }
  useEffect(() => {
    // props.getMemberDetail(mId)
    // props.getMemberData()
    // window.location.reload()
    //第一种只刷新一次
    function show() {
      console.log('show')
      $('.show').addClass('active')
      $('.hide').removeClass('active')
      $('#exampleInputPassword1').attr('type', 'text')
    }
    function hide() {
      console.log('hide')
      $('.hide').addClass('active')
      $('.show').removeClass('active')
      $('#exampleInputPassword1').attr('type', 'password')
    }
  }, [])
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        登入跳出測試
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          <ModalHeader></ModalHeader>
          <div className="login home_login">
            <div
              className="alertBox alert alert-danger disappear"
              role="alert"
            ></div>
            <figure className="modal-logo text-center">
              <img
                src={require('../images/logo-dark.svg')}
                alt="Background"
                className="img-fluid"
              />
            </figure>
            <hr />
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAccount1"
                  aria-describedby="accountHelp"
                  placeholder="帳號"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control position-relative"
                  id="exampleInputPassword1"
                  placeholder="密碼"
                />
                {/* <IconContext.Provider
          value={{ size: '1.5rem', className: 'show ,active' }}
        >
          <AiOutlineEye />
        </IconContext.Provider>
        <IconContext.Provider
          value={{ size: '1.5rem', className: 'hide' }}
        >
          <AiOutlineEyeInvisible />
        </IconContext.Provider> */}
                <img
                  src={require('../images/member/hide_password.png')}
                  alt="Background"
                  className="show"
                  onClick={show}
                />
                <img
                  src={require('../images/member/show_hide_password.png')}
                  alt="Background"
                  className="hide active"
                />
              </div>
              <Link className="form-group text-left">
                <p>忘記密碼?</p>
              </Link>
              <Link type="submit" className="btn btn-theme btn-block login-btn">
                登入
              </Link>
              <Link
                type="button"
                className="btn btn-light btn-block login-btn"
                onClick={(handleClose, handleShow2)}
                // to="/register"
              >
                <span className="">立即註冊</span>
              </Link>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2} animation={false}>
        <Modal.Body>
          <div className="login">
            <div
              className="alertBox alert alert-danger disappear"
              role="alert"
            ></div>
            <div className="d-flex justify-content-center">
              <IconContext.Provider
                value={{
                  color: 'black',
                  size: '5rem',
                  className: 'signIn',
                  style: { textAlign: 'center' },
                }}
              >
                <FaRegEdit />
              </IconContext.Provider>
            </div>

            <hr />
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAccount1"
                  aria-describedby="accountHelp"
                  placeholder="信箱"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control position-relative"
                  id="exampleInputPassword1"
                  placeholder="密碼"
                />
                <IconContext.Provider
                  value={{ size: '1.5rem', className: 'show2' }}
                >
                  <AiOutlineEye />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{ size: '1.5rem', className: 'hide2' }}
                >
                  <AiOutlineEyeInvisible />
                </IconContext.Provider>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control position-relative"
                  id="exampleInputPassword2"
                  placeholder="再次確認密碼"
                />
                <IconContext.Provider
                  value={{ size: '1.5rem', className: 'show3' }}
                >
                  <AiOutlineEye />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{ size: '1.5rem', className: 'hide3' }}
                >
                  <AiOutlineEyeInvisible />
                </IconContext.Provider>
              </div>
              <Link className="form-group text-left" to="/register">
                <p>前往完整註冊</p>
              </Link>
              <Link type="submit" className="btn btn-theme btn-block login-btn">
                註冊
              </Link>
              <Link
                type="button"
                className="btn btn-light btn-block login-btn"
                onClick={handleShow}
              >
                <span className="">返回登入頁</span>
              </Link>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

const mapStateToProps = (store) => {
  return { data: store.getMember, detail: store.getMemberDetail }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMemberData, getMemberDetail }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
