import React, { useState } from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import Carousel from './ServiceDetailCarousel'
import ServiceDetailMainComment from './ServiceDetailMainComment'
import {
  starRating,
  checkIcon,
  getDataFromServer,
} from '../../utils/service/ServiceFunction'

function ServiceDetailMain(props) {
  const [comment, setComment] = useState(props.sComment)
  const [loadComment, setLoadComment] = useState(false)
  const handleLoadComment = () => {
    //取得評價資料
    const commentData = getDataFromServer(
      'http://localhost:6001/service/comment/' +
        props.match.params.userId +
        '?order=created_at'
    )
    Promise.resolve(commentData).then((data) => {
      setLoadComment(true)
      setComment(data)
    })
  }

  return (
    <>
      <Row>
        <Col>
          <Card className="card-light">
            <Card.Body>
              <Row>
                <Col>
                  {/* 圖片輪播 */}
                  <Carousel sUsers={props.sUsers} sMId={props.sMId} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>
                    關於我
                    {props.sUsers.isConfirmed ? checkIcon('身分已認證') : ''}
                  </h4>
                  <hr className="title" />
                  <div className="mb-4">
                    <h6 className="mb-3">
                      {props.sUsers.sYear ? props.sUsers.sYear + '年經驗' : ''}
                    </h6>
                    <h5 className="mb-3">{props.sUsers.sTitle}</h5>
                    <div className="user-info">{props.sUsers.sInfo}</div>
                  </div>
                  <div className="mb-4">
                    <h5>額外服務</h5>
                    {props.sUsers.sExtra ? (
                      <ul>
                        {props.sUsers.sExtra.split(',').map((v, i) => (
                          <li key={i}>
                            -
                            {props.sExtra.map((s) => s.extraId).indexOf(v) >= 0
                              ? props.sExtra[
                                  props.sExtra.map((s) => s.extraId).indexOf(v)
                                ].extraName
                              : ''}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      '無'
                    )}
                  </div>
                  <h4>
                    保姆評價
                    <span className="inline-block-icon ml-3">
                      {starRating(props.sRating)}
                      <span className="icon-text">
                        (
                        {props.sCommentTotal
                          ? '共' + props.sCommentTotal + '則評價'
                          : '尚未有任何評價'}
                        )
                      </span>
                    </span>
                  </h4>
                  <hr className="title" />
                  <ul className="comment mb-3" id="serviceDetailComment">
                    {props.sMember.length !== 0
                      ? comment.length
                        ? comment.map((v, i) => {
                            let index = props.sMember
                              .map((m) => m.mId)
                              .indexOf(parseInt(v.mId))
                            //取得會員
                            return (
                              <ServiceDetailMainComment
                                sComment={v}
                                sMemberId={props.sMember[index].mId}
                                sMemberName={props.sMember[index].mName}
                                sMemberImg={props.sMember[index].mImg}
                                sUsers={props.sUsers}
                                key={i}
                              />
                            )
                          })
                        : '尚未有任何評價'
                      : ''}
                  </ul>
                  <div className="text-center">
                    {props.sCommentTotal ? (
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={handleLoadComment}
                        className={loadComment ? 'd-none' : ''}
                      >
                        載入所有評論
                      </Button>
                    ) : (
                      ''
                    )}
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <Modal show={show} onHide={handleClose} size="lg" id="modalCommentAll">
        <Modal.Header closeButton>
          <Modal.Title>所有評論</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  )
}

export default withRouter(ServiceDetailMain)
