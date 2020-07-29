import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Card, Button, Row, Col, Image, Collapse, Badge } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { FaRegCalendarAlt, FaRegHeart, FaHeart } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import { MdLocationOn } from 'react-icons/md'
import $ from 'jquery'
import { getMemberDetail } from '../member/actions/index'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import PartnerPlus from './PartnerPlus'

function PartnerNowon(props) {
  //設定參加狀態
  const [open, setOpen] = useState(false)

  const reSign = () => {
    return sAlert()
  }

  //sweetalert
  const Swal = require('sweetalert2')
  function mAlert() {
    Swal.fire({
      icon: 'success',
      title: '報名成功',
    })
  }
  function sAlert() {
    Swal.fire({
      icon: 'warning',
      title: '您是發起人',
    })
  }

  //設定加入最愛愛心切換
  const [heart, setHeart] = useState(true)

  $('.trun').click(function () {
    document.getElementById('trun').innerHTML = <FaHeart />
  })

  //寫入
  const mId = localStorage.mId
  const pId = props.data.id ? props.data.id : ''
  const PlusInfo = {
    pId: pId,
    pJoin: '1',
    mId: mId,
    pJoinName: localStorage.mName,
  }

  //建立參加
  async function postPlus() {
    const req = new Request('http://localhost:6001/knowledge/partner/plus', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(PlusInfo),
    })
    const res = await fetch(req)
    const order = await res.json()
    await console.log(order)
  }

  return (
    <>
      <Card
        className="partnercard m-3"
        // style={{ width: '33rem' }}
      >
        <Card.Header className="justify-content-between d-flex">
          <IconContext.Provider value={{ size: '1.2rem' }}>
            <div className="d-inlined-inline-block">
              <FaRegCalendarAlt />
              <span className="carddate mr-3 text-danger">
                {' '}
                {props.data.pDate}
              </span>
              <FiClock />
              <span className="cardtime text-danger"> {props.data.pTime}</span>
            </div>

            <div className="d-inline-block">
              <MdLocationOn />
              <span className="cardtime ">
                活動地點：
                <span className="text-danger ">
                  {props.data.pLocation}
                </span>{' '}
              </span>
            </div>
          </IconContext.Provider>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <div>
                <Card.Img
                  className="partnerImg"
                  variant="top"
                  src={require('../../images/knowledge/partner/' +
                    props.data.id +
                    '.jpg')}
                  alt=""
                />
              </div>
            </Col>
            <br />
            <Col>
              <div className=" d-flex align-items-center ">
                <p>
                  <strong>活動發起人：</strong>
                </p>
                <div className=" align-self-center ml-3">
                  <div className="">
                    <Image
                      className="partnerMemberImg m-1"
                      src={require('../../images/knowledge/question/q019.jpeg')}
                      alt=""
                      roundedCircle
                    />
                  </div>
                </div>
                <p className=" ml-3">{props.data.mName}</p>
              </div>
              <div className="d-flex mt-3 justify-content-between">
                <p className="">
                  <strong> 主題：</strong>
                  {props.data.pTitle}
                </p>
              </div>
              <hr />
              <div>
                <p className="">
                  <strong>活動內容：</strong>
                </p>
                <h6>{props.data.pDes}</h6>
              </div>
            </Col>
          </Row>

          <Row className=" pt-4">
            <Col>
              <div>
                <div className="p-1">
                  <strong>成團人數：</strong> {props.data.pNumberLimit}
                  <strong>人</strong>
                </div>
                <div>
                  <strong className="p-1">已報名人數：</strong>
                  {props.data.pNumber}
                  <strong>人</strong>
                </div>
              </div>
            </Col>
            <Col className="">
              <div className="text-right align-items-end justify-content-end mt-2 d-flex">
                {props.data.pNumberLimit == props.data.pNumber ? (
                  <Button
                    variant="primary"
                    size="sm"
                    aria-controls="example-collapse-text"
                    aria-expanded
                    className="mr-2"
                    disabled
                  >
                    已滿團
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    aria-controls="example-collapse-text"
                    aria-expanded
                    className="mr-2"
                    onClick={(e) => {
                      if (localStorage.mId !== props.data.mId) {
                        mAlert()
                        $(e.currentTarget).addClass('disabled').text('已報名')
                      } else {
                        sAlert()
                      }
                      postPlus()
                      setTimeout(() => {
                        window.location.reload()
                      }, 1500)
                    }}
                  >
                    我要參加
                  </Button>
                )}

                {/* <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="text-danger btn-white"
                  onClick={() => {
                    if (
                      localStorage.getItem('mId') &&
                      localStorage.getItem('mId') !== '0'
                    ) {
                      setHeart(!heart)
                    } else {
                      mAlert()
                    }
                  }}
                  id="heart"
                >
                  加入最愛{heart ? <FaRegHeart /> : <FaHeart />}
                </Button> */}
              </div>
            </Col>
          </Row>
          <Row>
            <Collapse>
              <Col
                id="example-collapse-text "
                className="mt-2 p-2 bg-light"
                md={{ span: 6, offset: 6 }}
              >
                <div> 已報名：</div>
                <div>
                  <PartnerPlus />
                </div>
              </Col>
            </Collapse>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

const mapStateToProps = (store) => {
  return { mPost: store.getMemberDetail }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMemberDetail }, dispatch)
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PartnerNowon)
)
