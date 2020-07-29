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
// import Header from '../components/Header'
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
    $('.show').click(function () {
      console.log('show')
      $('.show').addClass('active')
      $('.hide').removeClass('active')
      $('#exampleInputPassword1').attr('type', 'text')
    })
    $('.hide').click(function () {
      console.log('hide')
      $('.hide').addClass('active')
      $('.show').removeClass('active')
      $('#exampleInputPassword1').attr('type', 'password')
    })
  }, [])
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        登入跳出測試
      </Button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body>
          <ModalHeader></ModalHeader>
          <div className="login">
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
                <IconContext.Provider
                  value={{ size: '1.5rem', className: 'show' }}
                >
                  <AiOutlineEye />
                </IconContext.Provider>
                <IconContext.Provider
                  value={{ size: '1.5rem', className: 'hide' }}
                >
                  <AiOutlineEyeInvisible />
                </IconContext.Provider>
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

      <div className="home">
        <CarouselPage />
        <div className="container">
          <div className="product-collection my-4">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12 col-sm-12">
                <figure className="collection1 position-relative">
                  <img
                    src={require('../images/index/collection5.jpg')}
                    alt=""
                  />
                </figure>
                <div className="collection-info1">
                  <h3 className="">Fall Apparel</h3>
                  <div className="">
                    <button type="button" className="btn btn-outline-theme1">
                      立即選購
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 col-sm-12">
                <figure className="collection2 position-relative">
                  <img
                    src={require('../images/index/collection6.jpg')}
                    alt=""
                  />
                </figure>
                <div className="collection-info2">
                  <h3 className="">Fall Apparel</h3>
                  <div className="">
                    <button type="button" className="btn btn-outline-theme1">
                      立即選購
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-center mb-4">每日精選</h3>
            <div className="row product-list">
              <div className="col-lg-3 col-6 col-md-4">
                <Link>
                  <div className="position-relative">
                    <figure className="product product1">
                      <img
                        src={require('../images/index/daily1-1.jpg')}
                        alt=""
                      />
                    </figure>
                    <figure className="product product-hover">
                      <img src={require('../images/index/daily1.jpg')} alt="" />
                    </figure>
                  </div>
                </Link>
              </div>
              <div className=" col-lg-3 col-6 col-md-4">
                <Link>
                  <div className="position-relative">
                    <figure className=" product product2">
                      <img
                        src={require('../images/index/daily2-1.jpg')}
                        alt=""
                      />
                    </figure>
                    <figure className="product product-hover">
                      <img src={require('../images/index/daily2.jpg')} alt="" />
                    </figure>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6 col-md-4">
                <Link>
                  <div className="position-relative">
                    <figure className="product product3">
                      <img
                        src={require('../images/index/daily3-1.jpg')}
                        alt=""
                      />
                    </figure>
                    <figure className="product product-hover">
                      <img src={require('../images/index/daily3.jpg')} alt="" />
                    </figure>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6 col-md-4">
                <Link>
                  <div className="position-relative">
                    <figure className="product product4">
                      <img
                        src={require('../images/index/daily4-1.jpg')}
                        alt=""
                      />
                    </figure>
                    <figure className="product product-hover">
                      <img src={require('../images/index/daily4.jpg')} alt="" />
                    </figure>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6 col-md-4">
                <Link>
                  <div className="position-relative">
                    <figure className="product product5">
                      <img
                        src={require('../images/index/daily5-1.jpg')}
                        alt=""
                      />
                    </figure>
                    <figure className="product product-hover">
                      <img src={require('../images/index/daily5.jpg')} alt="" />
                    </figure>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6 col-md-4">
                <Link>
                  <div className="position-relative">
                    <figure className="product product6">
                      <img
                        src={require('../images/index/daily6-1.jpg')}
                        alt=""
                      />
                    </figure>
                    <figure className="product product-hover">
                      <img src={require('../images/index/daily6.jpg')} alt="" />
                    </figure>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6 col-md-4">
                <Link>
                  <div className="position-relative">
                    <figure className="product product7">
                      <img
                        src={require('../images/index/daily7-1.jpg')}
                        alt=""
                      />
                    </figure>
                    <figure className="product product-hover">
                      <img src={require('../images/index/daily7.jpg')} alt="" />
                    </figure>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 col-6 col-md-4">
                <Link>
                  <div className="position-relative">
                    <figure className="product product8">
                      <img
                        src={require('../images/index/daily8-1.jpg')}
                        alt=""
                      />
                    </figure>
                    <figure className="product product-hover">
                      <img src={require('../images/index/daily8.jpg')} alt="" />
                    </figure>
                  </div>
                </Link>
              </div>
            </div>
            <div align="center" className="my-3">
              <Link to="/products">
                <button type="button" className="btn btn-outline-theme">
                  全部商品
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="jumbotron jumbotron-fluid index-banner">
        <div className="container">
          <h1 className="mt-5">
            全館大特價
            <br /> 商品全面八折起
          </h1>
          <div className="mt-4">
            <button type="button" className="btn btn-theme">
              立即選購
            </button>
          </div>
        </div>
      </div>
      <div className="container home2 mb-4">
        <div className="">
          <h3 className="text-center mb-4">Pet Supplies</h3>
          <div className="row pet-supplies d-flex justify-content-between">
            <div className="col-12 col-sm-12 col-md-6">
              <figure className="supply supply1 position-relative">
                <img src={require('../images/index/sup1.jpg')} alt="" />
              </figure>
              <div className="supply-info">
                <h2 className="text-center">PARK TIME</h2>
                <div className="">
                  <button type="button" className="btn btn-outline-theme1">
                    立即前往選購
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6">
              <figure className="supply supply2 position-relative">
                <img src={require('../images/index/sup2.jpg')} alt="" />
              </figure>
              <div className="supply-info">
                <h2 className="text-center">LEAD ME</h2>
                <div className="">
                  <button type="button" className="btn btn-outline-theme1">
                    立即前往選購
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <figure className="supply-2 supply3">
                <img src={require('../images/index/sup8.jpg')} alt="" />
              </figure>
              <div className="supply-info-top">
                <h2>PARK TIME</h2>
              </div>
              <div className="supply-info2">
                <div className="">
                  <button type="button" className="btn btn-outline-theme1">
                    立即前往選購
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <figure className="supply-2 supply4">
                <img src={require('../images/index/sup7.jpg')} alt="" />
              </figure>
              <div className="supply-info-top">
                <h2>PARK TIME</h2>
              </div>
              <div className="supply-info2">
                <div className="">
                  <button type="button" className="btn btn-outline-theme1">
                    立即前往選購
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <figure className="supply-2 supply5">
                <img src={require('../images/index/sup13.jpg')} alt="" />
              </figure>
              <div className="supply-info-top">
                <h2>PARK TIME</h2>
              </div>
              <div className="supply-info2">
                <div className="">
                  <button type="button" className="btn btn-outline-theme1">
                    立即前往選購
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-center my-4">Our Blog</h3>
        <div className="row blog-card">
          <div className="col-md-4">
            <Link>
              <figure className="blog-pic">
                <img src={require(`../images/index/blog1.jpg`)} alt="" />
              </figure>
            </Link>
            <div className="card-body">
              <figure className="card-icon-clock d-flex align-items-center">
                <img
                  src={require('../images/activity/activity-clock.svg')}
                  alt=""
                />
                <span className="ml-2 text-muted card-date">2020-02-22</span>
              </figure>
              <h5 className="card-title mt-2">
                毛孩有口臭並不是理所當然，該重視口腔保健了！
              </h5>
              <p>
                口腔問題大概是最常被獸醫師提起的犬貓疾病之一，
                原因在於很多毛爸媽都以為口臭是自然而然產生的。
              </p>
              <Link>閱讀更多</Link>
            </div>
          </div>
          <div className="col-md-4">
            <Link>
              <figure className="blog-pic">
                <img src={require(`../images/index/blog2.jpeg`)} alt="" />
              </figure>
            </Link>
            <div className="card-body">
              <figure className="card-icon-clock d-flex align-items-center">
                <img
                  src={require('../images/activity/activity-clock.svg')}
                  alt=""
                />
                <span className="ml-2 text-muted card-date">2020-02-22</span>
              </figure>
              <h5 className="card-title mt-2">
                毛孩有口臭並不是理所當然，該重視口腔保健了！
              </h5>
              <p>
                口腔問題大概是最常被獸醫師提起的犬貓疾病之一，
                原因在於很多毛爸媽都以為口臭是自然而然產生的。
              </p>
              <Link>閱讀更多</Link>
            </div>
          </div>
          <div className="col-md-4">
            <Link>
              <figure className="blog-pic">
                <img src={require(`../images/index/blog3.jpg`)} alt="" />
              </figure>
            </Link>
            <div className="card-body">
              <figure className="card-icon-clock d-flex align-items-center">
                <img
                  src={require('../images/activity/activity-clock.svg')}
                  alt=""
                />
                <span className="ml-2 text-muted card-date">2020-02-22</span>
              </figure>
              <h5 className="card-title mt-2">
                毛孩有口臭並不是理所當然，該重視口腔保健了！
              </h5>
              <p>
                口腔問題大概是最常被獸醫師提起的犬貓疾病之一，
                原因在於很多毛爸媽都以為口臭是自然而然產生的。
              </p>
              <Link>
                <div className="text-right">閱讀更多</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
