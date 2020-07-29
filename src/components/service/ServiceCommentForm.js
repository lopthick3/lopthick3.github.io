import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Form, Row, Col } from 'react-bootstrap'
import { handleFormValue } from '../../utils/service/ServiceFunction'
import $ from 'jquery'

function ServiceBookingForm(props) {
  const [comment, setComment] = useState({})
  //備註最大字數限制
  const remarkMaxLengthLimit = 300
  const [remarkLength, setRemarkLength] = useState(0)
  useEffect(() => {
    //顯示評論項目文字
    $('.starrating').on('click', 'input', function (e) {
      let title = $(e.target).next('label').attr('title')
      $('.rating-title').text(title)
    })
    //初始化訂單資料
    setComment({
      orderId: props.sOrder[0].orderId,
      orderStsId: 'o04',
      mId: props.sOrder[0].mId,
      sId: props.sOrder[0].sId,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    //設定回傳父元件資料
    props.parentCommentData(comment)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment])
  return (
    <>
      <h5>評論內容</h5>
      <hr className="title" />
      <Form.Group as={Row}>
        <Col>
          <div className="starrating risingstar d-flex justify-content-end flex-row-reverse align-items-center">
            <span className="rating-title"></span>
            <input
              type="radio"
              id="star5"
              name="rating"
              value="5"
              required
              onClick={(e) => handleFormValue(e, comment)}
            />
            <label htmlFor="star5" title="非常滿意"></label>
            <input
              type="radio"
              id="star4"
              name="rating"
              value="4"
              required
              onClick={(e) => handleFormValue(e, comment)}
            />
            <label htmlFor="star4" title="滿意"></label>
            <input
              type="radio"
              id="star3"
              name="rating"
              value="3"
              required
              onClick={(e) => handleFormValue(e, comment)}
            />
            <label htmlFor="star3" title="普通"></label>
            <input
              type="radio"
              id="star2"
              name="rating"
              value="2"
              required
              onClick={(e) => handleFormValue(e, comment)}
            />
            <label htmlFor="star2" title="不滿意"></label>
            <input
              type="radio"
              id="star1"
              name="rating"
              value="1"
              required
              onClick={(e) => handleFormValue(e, comment)}
            />
            <label htmlFor="star1" title="非常不滿意"></label>
            <Form.Control.Feedback type="invalid">
              請選擇評分
            </Form.Control.Feedback>
          </div>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col>
          <Form.Group controlId="sRemark">
            <Form.Control
              as="textarea"
              name="commentTxt"
              rows="5"
              required
              maxLength={remarkMaxLengthLimit}
              placeholder={`最多${remarkMaxLengthLimit}個字`}
              onChange={(e) => {
                setRemarkLength(e.target.value.length)
                handleFormValue(e, comment)
              }}
            />
            <Form.Control.Feedback type="invalid">
              請填入評論內容
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Group>
      <div>
        {remarkLength
          ? '還可輸入' + (remarkMaxLengthLimit - remarkLength) + '個字'
          : ''}
      </div>
    </>
  )
}

export default withRouter(ServiceBookingForm)
