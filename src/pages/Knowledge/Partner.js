import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Nav,
  Modal,
  Button,
  Form,
  Image,
} from 'react-bootstrap'
import $ from 'jquery'
import axios from 'axios'

//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getPartner, getPartnerPlus } from './actions/index'
import { getMemberDetail } from '../member/actions/index'
import '../../components/Knowledge/knowledge.scss'

import PartnerNowon from './PartnerNowon'
import PartnerClosed from './PartnerClosed'
// import { Container } from 'react-bootstrap/lib/Tab'

function Partner(props) {
  const mId = localStorage.getItem('mId')
  useEffect(() => {
    // console.log(props)
    props.getPartner()
    props.getMemberDetail(mId)
  }, [])

  const Swal = require('sweetalert2')
  function sAlert() {
    Swal.fire({
      icon: 'success',
      title: '舉辦成功',
    })
  }
  //sweetAlert 會員
  function mAlert() {
    Swal.fire({
      icon: 'warning',
      title: '尚未登入',
    }).then(function () {
      window.location.href = '/login'
    })
  }
  //發問視窗
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    if (localStorage.getItem('mId') && localStorage.getItem('mId') !== '0') {
      setShow(true)
    } else {
      return mAlert()
    }
  }

  //確認判斷
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    console.log(form)
    console.log('form.checkValidity()', form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    } else if (form.checkValidity() === true) {
      postOpen(openInfo)
      setShow(false)
      sAlert()
    }
    setValidated(true)
  }

  //-----圖片上傳-----
  //大頭貼單張圖片上傳
  const [selectedSingleFile, SetSelectedSingleFile] = useState(null)
  const addFileSingle = (event) => {
    // console.log(event.target.files[0])
    // if (checkMimeType(event)) {
    //   //檢查類型
    //   SetSelectedSingleFile(event.target.files[0])

    //即時預覽圖片
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader()
      reader.onload = function (e) {
        $('.avatar-preview figure img').remove()
        $('.avatar-preview figure').append(`<img src="${e.target.result}">`)
      }
      reader.readAsDataURL(event.target.files[0])
      $('.avatar-preview .text').hide()
    }
    // }
  }
  const uploadFileSingle = () => {
    const data = new FormData()
    data.append('file', selectedSingleFile)
    axios
      // .post('http://localhost:6001/serviceAvatar/avatar/' + sMemberId, data, {
      //   // receive two parameter endpoint url ,form data
      // })
      .then((res) => {
        // then print response status
        console.log(res)
        Swal.fire({
          title: '上傳成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }

  // ----------------------------------------post

  //表單資訊
  const mName = props.mPost[0] ? props.mPost[0].mName : ''
  const openInfo = {
    mId: mId,
    mName: mName,
    pTitle: '',
    pDate: '',
    pTime: '',
    pLocation: '',
    pNumberLimit: '',
    pDes: '',
    pNumber: 0,
  }

  //寫入表單資訊
  function openformInfo(e, info) {
    switch (info) {
      case 'pTitle':
        openInfo.pTitle = e.currentTarget.value
        break
      case 'pDate':
        openInfo.pDate = e.currentTarget.value
        break
      case 'pTime':
        openInfo.pTime = e.currentTarget.value
        break
      case 'pLocation':
        openInfo.pLocation = e.currentTarget.value
        break
      case 'pNumberLimit':
        openInfo.pNumberLimit = e.currentTarget.value
        break
      case 'pDes':
        openInfo.pDes = e.currentTarget.value
        break
      default:
        break
    }
  }
  //建立問題
  async function postOpen(form) {
    const req = new Request('http://localhost:6001/knowledge/partner/open', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(form),
    })
    const res = await fetch(req)
    const order = await res.json()
    await console.log(order)
    sAlert()
  }

  return (
    <>
      <Container className="partner">
        <div>
          <Button
            className="mt-4 mb-4 ml-2"
            size="sm"
            variant="primary"
            onClick={handleShow}
          >
            我要舉辦活動
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
          >
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Modal.Header>
                <Modal.Title>發起活動</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Control
                    name="pTitle"
                    type="text"
                    placeholder="請輸入活動主題"
                    onChange={(e) => openformInfo(e, 'pTitle')}
                    required
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    controlId="exampleForm.ControlSelect1 typeselect"
                  >
                    <Form.Label>請選擇活動日期</Form.Label>
                    <Form.Control
                      name="pDate"
                      type="date"
                      placeholder="請輸入活動日期"
                      onChange={(e) => openformInfo(e, 'pDate')}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="exampleForm.ControlSelect2 typeselect"
                  >
                    <Form.Label>活動時間</Form.Label>
                    <Form.Control
                      name="pTime"
                      type="text"
                      placeholder="14:00-18:00"
                      onChange={(e) => openformInfo(e, 'pTime')}
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="exampleForm.ControlSelect1 typeselect"
                  >
                    <Form.Label>成團人數</Form.Label>
                    <Form.Control
                      name="pNumberLimit"
                      type="number"
                      placeholder="0"
                      min="0"
                      onChange={(e) => openformInfo(e, 'pNumberLimit')}
                      required
                    ></Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="exampleForm.ControlSelect1 petselect">
                  <Form.Control
                    name="pLocation"
                    type="text"
                    placeholder="請輸入活動地點（詳細地址）"
                    onChange={(e) => openformInfo(e, 'pLocation')}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>活動內容</Form.Label>
                  <Form.Control
                    required
                    name="pDes"
                    as="textarea"
                    rows="5"
                    placeholder="請說明活動內容"
                    onChange={(e) => openformInfo(e, 'pDes')}
                  />
                </Form.Group>
                <Form.Group controlId="avatar">
                  <div className="custom-file">
                    {/* <input
                type="file"
                name="avatar"
                className="custom-file-input"
                id="avatar"
              />
              <label
                className="custom-file-label"
                htmlFor="avatar"
                data-browse="選擇"
              >
                請選擇檔案
              </label> */}
                    {/* <div className="form-group files mb-0">
                      <input type="file" className="form-control" multiple="" />
                    </div> */}
                    {/* <button
                      type="button"
                      className="btn btn-sm btn-info btn-block"
                      disabled={selectedSingleFile === null}
                    >
                      <MdFileUpload />
                      上傳
                    </button> */}
                    {/* <div className="my-2 text-info avatar-preview">
                      <figure>
                        <img alt="" />
                      </figure>
                    </div> */}
                  </div>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} id="btn">
                  取消舉辦
                </Button>
                <Button variant="primary" type="submit">
                  舉辦
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
        <div>
          <Tabs
            defaultActiveKey="open"
            id="uncontrolled-tab-example"
            className="m-2"
          >
            <Tab eventKey="open" title="進行中">
              <Col xs={12} className="justify-content-center mb-2">
                {props.post &&
                  props.post.map((value, index) => {
                    return <PartnerNowon key={index} data={props.post[index]} />
                  })}
              </Col>
            </Tab>
            <Tab eventKey="Closed" title="已報名">
              <Col xs={12} className="justify-content-center mb-2">
                <PartnerClosed />
              </Col>
            </Tab>
            {/* <Tab eventKey="" title="我的收藏">
              <Col xs={12} className="justify-content-center mb-2">
                ) })}
              </Col>
            </Tab> */}
          </Tabs>
        </div>
      </Container>
    </>
  )
}

const mapStateToProps = (store) => {
  return {
    post: store.getPartner,
    mPost: store.getMemberDetail,
    plus: store.getPartnerPlus,
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getPartner, getMemberDetail, getPartnerPlus },
    dispatch
  )
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Partner))
