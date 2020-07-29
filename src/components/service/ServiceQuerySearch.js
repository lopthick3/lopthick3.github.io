import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
// import $ from 'jquery'
import { Button, Form, Row, Col, Card, Collapse } from 'react-bootstrap'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { getDataFromServer } from '../../utils/service/ServiceFunction'
import $ from 'jquery'

function ServiceQuerySearch(props) {
  const [open, setOpen] = useState(false)
  const [sqlArr, setSqlArr] = useState([])
  const [onChangeChk, SetOnChangeChk] = useState(0) //偵測勾選時變動

  const handleQuery = () => {
    const sort = document.getElementsByName('sort')
    const sCity = document.getElementsByName('sCity')
    const sType = document.getElementsByName('sType')
    // const sExtra = document.getElementsByName('sExtra')
    const sExtra = $(":checkbox[name='sExtra']")
    //服務地區
    if (sCity[0].value) {
      sqlArr[0] = `${sCity[0].value}`
    } else {
      sqlArr[0] = ''
    }
    //選擇服務
    if (sType[0].value) {
      sqlArr[1] = `${sType[0].value}`
    } else {
      sqlArr[1] = ''
    }
    //選擇體型
    sqlArr[2] = ''
    let checked = $(":checked[name='sExtra']")
    if (checked.length) {
      for (let i = 0; i < checked.length; i++) {
        if (i === 0) {
          sqlArr[2] += `${checked[i].value}`
        } else if (i === 1) {
          sqlArr[2] += `,${checked[i].value}`
        } else {
          sqlArr[2] += `,${checked[i].value}`
        }
      }
    }
    //排序條件
    if (sort[0].value) {
      sqlArr[3] = `${sort[0].value}`
    } else {
      sqlArr[3] = ''
    }
    setSqlArr(sqlArr)
    SetOnChangeChk(onChangeChk + 1)
  }

  useEffect(() => {
    //設定回傳父元件資料
    const nowPageData = getDataFromServer(
      `http://localhost:6001/service/query/${props.sPage}?sCity=${sqlArr[0]}&sType=${sqlArr[1]}&sExtra=${sqlArr[2]}&sSort=${sqlArr[3]}`
    )
    Promise.resolve(nowPageData).then((data) => {
      props.parentUserData(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChangeChk])

  return (
    <>
      <Row className="mb-3">
        <Col className="d-flex justify-content-between">
          <Form.Control
            as="select"
            name="sort"
            className="w-auto"
            onChange={handleQuery}
          >
            <option value="">排序條件</option>
            <option value="sCity_DESC">依縣市排序 (筆劃多至少)</option>
            <option value="sCity_ASC">依縣市排序 (筆劃少至多)</option>
            <option value="sYear_DESC">依年資排序 (高至低)</option>
            <option value="sYear_ASC">依年資排序 (低至高)</option>
          </Form.Control>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            {open ? (
              <FaChevronUp className="mr-1" />
            ) : (
              <FaChevronDown className="mr-1" />
            )}
            搜尋條件
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Collapse in={open}>
            <Card className="card-shadow" id="example-collapse-text">
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="search-col mb-4" md={4}>
                      <label className="title">服務地區</label>
                      <hr className="title" />
                      <Form.Control
                        as="select"
                        name="sCity"
                        required
                        onChange={handleQuery}
                      >
                        <option value="">縣市</option>
                        {props.sCity.length !== 0
                          ? props.sCity.map((v, i) => (
                              <option key={i} value={v.City}>
                                {v.City}
                              </option>
                            ))
                          : ''}
                      </Form.Control>
                    </Col>
                    <Col className="search-col mb-4" md={4}>
                      <label className="title">選擇服務</label>
                      <hr className="title" />
                      <Form.Control
                        as="select"
                        name="sType"
                        onChange={handleQuery}
                      >
                        <option value="">請選擇</option>
                        {props.sType.length !== 0
                          ? props.sType.map((v, i) => (
                              <option key={i} value={v.sTypeId}>
                                {v.sTypeName}
                              </option>
                            ))
                          : ''}
                      </Form.Control>
                    </Col>
                    {/* <Col className="search-col mb-4" md={4}>
                      <label className="title">狗狗體型</label>
                      <hr className="title" />
                      <Row>
                        {props.sSize.length !== 0
                          ? props.sSize.map((v, i) => (
                              <Col lg={6} key={i}>
                                <Form.Check
                                  custom
                                  name="sSize"
                                  type="checkbox"
                                  value={v.sizeId}
                                  id={`sSize${i}`}
                                  label={v.sizeName}
                                  onChange={handleQuery}
                                />
                              </Col>
                            ))
                          : ''}
                      </Row>
                    </Col> */}
                    {/* <Col className="search-col mb-4" md={4}>
                      <label className="title">評價分數</label>
                      <hr className="title" />
                      <Form.Control
                        as="select"
                        name="rating"
                        onChange={handleQuery}
                      >
                        <option value="">請選擇</option>
                        <option value="5">非常滿意(5)</option>
                        <option value="4">滿意(4)</option>
                        <option value="3">普通(3)</option>
                        <option value="2">不滿意(2)</option>
                        <option value="1">非常不滿意(1)</option>
                      </Form.Control>
                    </Col> */}
                    {/* <Col className="search-col" md={4}>
                 <label className="title">價格區間</label>
                 <hr className="title" />
                 <input type="range" className="form-control-range" />
                 <Range />
               </Col> */}
                    <Col className="search-col mb-4" md={4}>
                      <label className="title">其他服務</label>
                      <hr className="title" />
                      <Row>
                        {props.sExtra.length !== 0
                          ? props.sExtra.map((v, i) => (
                              <Col lg={6} key={i}>
                                <Form.Check
                                  custom
                                  name="sExtra"
                                  type="checkbox"
                                  value={v.extraId}
                                  id={`sExtra${i + 1}`}
                                  label={v.extraName}
                                  onChange={handleQuery}
                                />
                              </Col>
                            ))
                          : ''}
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Collapse>
        </Col>
      </Row>
    </>
  )
}

export default withRouter(ServiceQuerySearch)
