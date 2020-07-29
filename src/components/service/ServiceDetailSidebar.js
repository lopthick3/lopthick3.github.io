import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Button, Modal, Table } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { starRating, checkIcon } from '../../utils/service/ServiceFunction'
import { FaRegCalendarCheck, FaRegHeart } from 'react-icons/fa'
import { getDataFromServer } from '../../utils/service/ServiceFunction'
import Swal from 'sweetalert2'

function ServiceDetailSidebar(props) {
  const [avatar, setAvatar] = useState('') //大頭貼(service_photo的資料)
  //類型與價格資料轉為json
  const sTypePrice = JSON.parse(props.sUsers.sTypePrice)
  const sType = props.sType
  const sSize = props.sSize
  let sExtra =
    props.sUsers.sExtra !== null ? props.sUsers.sExtra.split(',') : []

  //Modal
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //加入收藏/取消收藏
  const [likeSts, setLikeSts] = useState(0)
  // const [likeStsTxt, setLikeStsTxt] = useState('')
  //加入收藏/取消收藏切換
  const switchLike = (likeSts) => {
    //如果有登入
    if (!!props.sMemberId) {
      //如果已加入收藏
      if (likeSts) {
        Promise.resolve(
          getDataFromServer(
            `http://localhost:6001/service/like/del/${props.sUserId}/${props.sMemberId}`
          )
        ).then(() => {
          setLikeSts(0)
          Swal.fire({
            title: '已移除收藏',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
        })
      } else {
        //如果尚未加入收藏
        Promise.resolve(
          getDataFromServer(
            `http://localhost:6001/service/like/insert/${props.sUserId}/${props.sMemberId}`
          )
        ).then(() => {
          setLikeSts(1)
          Swal.fire({
            title: '已加入收藏',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          })
        })
      }
    } else {
      Swal.fire({
        title: '請先登入會員',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
      })
    }
    return
  }
  //是否加入收藏判斷
  const chkLike = () => {
    //取得會員是否對保姆收藏
    const like = getDataFromServer(
      `http://localhost:6001/service/like/${props.sUserId}/${props.sMemberId}`
    )
    Promise.resolve(like).then((data) => {
      setLikeSts(data.length)
    })
  }
  useEffect(() => {
    console.log(props.sMemberId)
    //檢查是否加入收藏
    chkLike()
    //取得照片資料
    const sPhoto = getDataFromServer(
      `http://localhost:6001/service/photo/${props.sMId}?category=1`
    )
    Promise.resolve(sPhoto).then((data) => {
      if (data.length) {
        setAvatar(
          `http://localhost:6001/uploads/service/avatar/${data[0].fileName}.${data[0].fileType}`
        )
      } else {
        setAvatar(
          'http://localhost:6001/uploads/service/avatar/placeholder.png'
        )
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Row>
        <Col md={6} lg={12}>
          <Row className="mb-3">
            {/* 保姆資料 */}
            <Col md={12}>
              <figure className="avatar mx-auto mb-3">
                <img className="rounded-circle" src={avatar} alt="" />
              </figure>
            </Col>
            <Col md={12}>
              <ul className="user-data text-center mb-3">
                <li>
                  <h5>
                    {props.sUsers.sName}
                    {props.sUsers.isConfirmed ? checkIcon() : ''}
                  </h5>
                </li>
                <li>{props.sUsers.sTitle}</li>
                <li>
                  {props.sUsers.sCity} {props.sUsers.sDist}
                </li>
                <li>
                  {starRating(props.sRating)} ({props.sCommentTotal})
                </li>
                {/* <li>
                  <h6 className="text-info text-center">
                    <FaUserAlt className="mr-1 text-info" />
                    上線中
                  </h6>
                </li> */}
              </ul>
            </Col>
            {/* <Col md={12} className="d-flex justify-content-center mb-3">
              <ul>
                <li>
                  <FaRegCommentDots className="mr-1" />
                  回覆率：{props.sUsers.replyRatio}%
                </li>
                <li>
                  <FaRegClock className="mr-1" />
                  回覆速度：{props.sUsers.replySpeed}
                </li>
              </ul>
            </Col> */}
            <Col md={12} className="d-flex justify-content-center">
              {parseInt(props.sMId) !== parseInt(props.sMemberId) ? (
                <>
                  <Link
                    className="btn btn-primary mr-3"
                    to={'/service/booking/' + props.sUsers.id}
                  >
                    <FaRegCalendarCheck className="mr-1" />
                    預約
                  </Link>
                  <Button
                    variant={`${likeSts ? '' : 'outline-'}danger`}
                    onClick={() => switchLike(likeSts)}
                  >
                    <FaRegHeart className="mr-1" />
                    {likeSts ? '已收藏' : '加入收藏'}
                  </Button>
                </>
              ) : (
                ''
              )}
            </Col>
          </Row>
        </Col>
        <Col md={6} lg={12}>
          <Row>
            <Col>
              {/* 服務資料 */}
              <Card className="card-light">
                <Card.Body>
                  <h4>服務內容</h4>
                  <hr className="title" />
                  <div className="mb-4">
                    <h5 className="mb-3">項目</h5>
                    {sTypePrice.map((v, i) => (
                      <div
                        key={i}
                        className={`d-flex px-3 ${
                          sTypePrice.length - 1 === i ? '' : 'mb-3'
                        }`}
                      >
                        <div className="text-center">
                          {/* 服務項目 */}
                          <h6>
                            {sType.map((s) => s.sTypeId).indexOf(v.sTypeId) >= 0
                              ? sType[
                                  sType.map((s) => s.sTypeId).indexOf(v.sTypeId)
                                ].sTypeName
                              : ''}
                          </h6>
                          {/* 項目說明 */}
                          {sType.map((s) => s.sTypeId).indexOf(v.sTypeId) >= 0
                            ? sType[
                                sType.map((s) => s.sTypeId).indexOf(v.sTypeId)
                              ].sTypeInfo
                            : ''}
                        </div>
                        <div className="text-center ml-auto">
                          <h5 className="text-info">{v.sPrice}</h5>
                          <small className="text-muted">每小時</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-2">
                    <h5>接待體型</h5>
                    <Row className="p-2 dog-size">
                      {sSize.map((v, i) => (
                        <Col
                          className={`d-flex flex-column justify-content-center dog-size-${
                            v.sizeId
                          }  ${
                            props.sUsers.sSizeId.split(',').indexOf(v.sizeId) <
                            0
                              ? 'muted'
                              : ''
                          }`}
                          key={i}
                        >
                          <div className="icon">
                            <img
                              src={require('../../images/service/icon/dog-size-' +
                                v.sizeId +
                                '.svg')}
                              alt=""
                            />
                          </div>
                          <h6 className={`my-2 text-center`}>{v.sizeName}</h6>
                          <div className={`my-2 text-center`}>
                            {v.sizeWeight}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <div className="text-center">
                    <Link
                      to="#"
                      className="text-primary font-weight-bold"
                      onClick={handleShow}
                    >
                      詳細服務內容
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-secondary text-white">
          <Modal.Title>詳細服務內容</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>服務項目與費用</h5>
          <Table responsive bordered className="text-center" size="sm">
            <thead>
              <tr className="bg-light">
                <th className="align-middle">服務項目</th>
                <th className="align-top">
                  費用
                  <br />
                  <small className="text-muted">(每小時)</small>
                </th>
                <th className="align-top">
                  基本服務費
                  <br />
                  <small className="text-muted">(每趟)</small>
                </th>
              </tr>
            </thead>
            <tbody>
              {sTypePrice.map((v, i) => (
                <tr key={i}>
                  <td>
                    {sType.map((s) => s.sTypeId).indexOf(v.sTypeId) >= 0
                      ? sType[sType.map((s) => s.sTypeId).indexOf(v.sTypeId)]
                          .sTypeName
                      : ''}
                  </td>
                  <td>${v.sPrice}</td>
                  <td>
                    $
                    {sType.map((s) => s.sTypeId).indexOf(v.sTypeId) >= 0
                      ? sType[sType.map((s) => s.sTypeId).indexOf(v.sTypeId)]
                          .sPrice
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h5>額外服務項目</h5>
          {sExtra.length !== 0 ? (
            <Table responsive bordered className="text-center" size="sm">
              <thead>
                <tr className="bg-light">
                  <th className="align-middle">服務項目</th>
                  <th className="align-top">
                    費用
                    <br />
                    <small className="text-muted">(每次)</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sExtra.map((v, i) => (
                  <tr key={i}>
                    <td>
                      {props.sExtra.map((x) => x.extraId).indexOf(v) >= 0
                        ? props.sExtra[
                            props.sExtra.map((x) => x.extraId).indexOf(v)
                          ].extraName
                        : ''}
                    </td>
                    <td>
                      $
                      {props.sExtra.map((x) => x.extraId).indexOf(v) >= 0
                        ? props.sExtra[
                            props.sExtra.map((x) => x.extraId).indexOf(v)
                          ].extraPrice
                        : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center">沒有額外服務項目</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default withRouter(ServiceDetailSidebar)
