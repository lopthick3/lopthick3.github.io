import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ServiceHomeContent() {
  return (
    <>
      <section className="banner">
        <div className="container-fluid h-100">
          <Row className="h-100">
            <Col className="text-center m-auto" md="8" lg="6" xl="4">
              <h1 className="mb-3">保姆照顧服務</h1>
              <p className="mb-4">
                輕鬆預約，享受服務。HugDog專門設計為您的狗狗服務，當您的狗狗有需要時，保姆可以隨時隨地幫您照顧，讓您出門不必擔憂家裡寶貝狀況。
              </p>
              <Link to="/service/query" className="btn btn-primary">
                尋找保姆
              </Link>
            </Col>
          </Row>
        </div>
      </section>
      <section className="type">
        <div className="container">
          <Row>
            <Col className="text-center mb-3">
              <h3 className="mb-3">服務項目</h3>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-center" sm="3">
              <img
                src={require('../../images/service/icon/images/service-icon_07.png')}
                alt=""
              />
              <h5>安親托育</h5>
              <p>狗狗白天安置保姆家照顧</p>
            </Col>
            <Col className="text-center" sm="3">
              <img
                src={require('../../images/service/icon/images/service-icon_05.png')}
                alt=""
              />
              <h5>寄宿照顧</h5>
              <p>將狗狗留置保姆家過夜照顧</p>
            </Col>
            <Col className="text-center" sm="3">
              <img
                src={require('../../images/service/icon/images/service-icon_08.jpg')}
                alt=""
              />
              <h5>到府陪伴</h5>
              <p>在您的住所照顧狗狗</p>
            </Col>
            <Col className="text-center" sm="3">
              <img
                src={require('../../images/service/icon/images/service-icon_06.png')}
                alt=""
              />
              <h5>到府遛狗</h5>
              <p>到府帶您的狗狗出門散步</p>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>我們提供全方位的狗狗照顧服務，讓您出門在外也能安心</Col>
          </Row>
        </div>
      </section>
      <section className="process bg-light">
        <div className="container">
          <Row>
            <Col className="text-center mb-3">
              <h3 className="mb-3">預約流程</h3>
            </Col>
          </Row>
          <Row className="mb-4 d-none d-md-block">
            <div className="stepwizard">
              <div className="stepwizard-row">
                <div className="stepwizard-step">
                  <button type="button" className="btn bg-white btn-circle">
                    1
                  </button>
                </div>
                <div className="stepwizard-step">
                  <button type="button" className="btn bg-white btn-circle">
                    2
                  </button>
                </div>
                <div className="stepwizard-step">
                  <button type="button" className="btn bg-white btn-circle">
                    3
                  </button>
                </div>
              </div>
            </div>
          </Row>
          <Row className="mb-3">
            <Col className="text-center mb-4 mb-md-0" md="4">
              <img
                src={require('../../images/service/icon/research.svg')}
                alt=""
              />
              <h5>尋找保姆</h5>
              <p>依照條件尋找合適的狗狗保姆</p>
            </Col>
            <Col className="text-center mb-4 mb-md-0" md="4">
              <img src={require('../../images/service/icon/app.svg')} alt="" />
              <h5>進行預約</h5>
              <p>填寫申請表單, 系統將自動計算費用</p>
            </Col>
            <Col className="text-center mb-4 mb-md-0" md="4">
              <img src={require('../../images/service/icon/dog.svg')} alt="" />
              <h5>享受服務</h5>
              <p>狗狗安心交給保母照顧</p>
            </Col>
          </Row>
        </div>
      </section>
      <section className="story">
        <div className="container">
          <Row className="mb-5">
            <Col md="6">
              <h5 className="mt-md-3">擔心寶貝獨自在家嗎?</h5>
              <p>
                您是否因為工作的因素，無法陪伴與照顧狗寶貝，但又擔心牠因為沒人陪伴產生憂鬱呢?
              </p>
            </Col>
            <Col md="6">
              <img
                src={require('../../images/service/pic/story01.jpg')}
                alt=""
                className="img-fluid"
              />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md="6" className="order-md-1">
              <h5 className="mt-md-3">安親托育&寄宿照顧</h5>
              <p>
                預訂保姆讓狗狗到保姆家寄養。家庭式寄養提供24小時服務，讓毛孩有家的感覺。
              </p>
            </Col>
            <Col md="6">
              <img
                src={require('../../images/service/pic/story02.jpg')}
                alt=""
                className="img-fluid"
              />
            </Col>
          </Row>
          <Row className="mb-5">
            <Col md="6">
              <h5 className="mt-md-3">到府陪伴&遛狗</h5>
              <p>
                您無法預測在工作忙碌的一天，但您可以預測您的狗的需求。與其趕回家不如預訂一位保姆來幫忙您遛狗。
              </p>
            </Col>
            <Col md="6">
              <img
                src={require('../../images/service/pic/story03.jpg')}
                alt=""
                className="img-fluid"
              />
            </Col>
          </Row>
          <Row>
            <Col md="6" className="order-md-1">
              <h5 className="mt-md-3">提供額外服務</h5>
              <p>
                保姆可另外提供洗澡、基礎美容、行為訓練及專業照護的額外服務項目，讓您不必再帶著寶貝出遠門找店面。(依照保姆設定項目，價格有所不同)
              </p>
            </Col>
            <Col md="6">
              <img
                src={require('../../images/service/pic/story04.jpg')}
                alt=""
                className="img-fluid"
              />
            </Col>
          </Row>
        </div>
      </section>
      <section className="promise bg-light">
        <div className="container">
          <Row>
            <Col className="text-center mb-3">
              <h3 className="mb-3">我們的承諾</h3>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-center mb-4 mb-md-0" md="4">
              <img src={require('../../images/service/icon/user.svg')} alt="" />
              <h5>專業合格</h5>
              <p>我們擁有超過一千多位的合格認證保姆</p>
            </Col>
            <Col className="text-center mb-4 mb-md-0" md="4">
              <img
                src={require('../../images/service/icon/best-price.svg')}
                alt=""
              />
              <h5>價格透明</h5>
              <p>所有服務價格項目公開透明</p>
            </Col>
            <Col className="text-center mb-4 mb-md-0" md="4">
              <img
                src={require('../../images/service/icon/shield.svg')}
                alt=""
              />
              <h5>滿意保證</h5>
              <p>我們提供公開的評價機制與申訴制度</p>
            </Col>
          </Row>
        </div>
      </section>
      <section className="apply">
        <div className="container-fluid h-100">
          <Row className="h-100">
            <Col className="text-center m-auto text-light" md="8" lg="6" xl="4">
              <h1 className="mb-3">加入保姆行列</h1>
              <p className="mb-4">
                您喜歡照顧狗狗嗎?歡迎加入HugDog行列，這裡有超過數十萬名的會員，每天都有需求，您可以與心愛的狗狗一起工作。
              </p>
              <Link to="/service/apply" className="btn btn-theme">
                申請保姆
              </Link>
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default ServiceHomeContent
