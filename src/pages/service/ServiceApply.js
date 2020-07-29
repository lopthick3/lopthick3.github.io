import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { withRouter } from 'react-router'
import ServiceRegistered from '../../components/service/redirect/ServiceRegistered'
import ServiceProfileForm from '../../components/service/ServiceProfileForm'
import {
  getDataFromServer,
  linkTo,
  getGoogleMapLocation,
} from '../../utils/service/ServiceFunction'
import ServiceAdminLoginChk from '../../components/service/redirect/ServiceAdminLoginChk'
import { MdSend } from 'react-icons/md'
import Swal from 'sweetalert2'
import $ from 'jquery'
//引入自己的scss
import '../../css/service/style.scss'

function ServiceBooking(props) {
  const sMemberId = props.sMemberId

  const [users, setUsers] = useState([]) //保姆資料(service_user的資料)
  //設定子元件回傳資料
  const [userData, setUserData] = useState(JSON)
  //表單驗證
  const [validated, setValidated] = useState(false)
  const [customValidated, setCustomValidated] = useState(false)
  const handleSubmit = (event) => {
    console.log(JSON.stringify(userData))
    setValidated(true)
    event.preventDefault()
    const form = event.currentTarget
    //若未完成驗證
    if (form.checkValidity() === false || customValidated) {
      event.preventDefault()
      event.stopPropagation()
      //focus on valueMissing
      // console.log($(form)[0].elements)
      for (let i = 0; i < $(form)[0].elements.length; i++) {
        if (
          $(form)[0].elements[i].validity.valueMissing ||
          $(form)[0].elements[i].validity.typeMismatch
        ) {
          $(form)[0].elements[i].focus()
          break
        }
      }
    } else {
      //-----取得座標位置-----
      Promise.resolve(
        getGoogleMapLocation(userData.sCity, userData.sDist, userData.sAddr)
      )
        .then((data) => {
          const location = data
          userData.lat = location.lat
          userData.lng = location.lng
          console.log(location)
        })
        .then(() => {
          //完成驗證
          Swal.fire({
            title: '確認送出申請?',
            text: '送出後將開通保姆服務',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#cea160',
            cancelButtonColor: '#8f8f8f',
            confirmButtonText: '確認',
            cancelButtonText: '返回',
          }).then((result) => {
            if (result.value) {
              console.log(userData)
              //子元件回傳的資料並傳送
              fetch(`http://localhost:6001/service/user/insert/${sMemberId}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
              })
                .then((r) => r.json())
                .then((obj) => {
                  console.log(obj)
                  //回饋訊息
                  Swal.fire({
                    title: '申請成功',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                  }).then(() => {
                    linkTo('/service/admin')
                  })
                })
            }
          })
        })
      return false
    }
  }

  //子元件回傳資料
  const callbackUserData = (child) => {
    setUserData(child)
  }
  //子元件回傳自訂驗證
  const callbackCustomValid = (child) => {
    setCustomValidated(child)
  }

  useEffect(() => {
    //取得個別保姆資料
    const data = getDataFromServer(
      `http://localhost:6001/service/user/getmId?mId=${sMemberId}&dataSts=Y`
    )
    Promise.resolve(data).then((data) => {
      setUsers(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="container pt-3 pb-5">
        {!!sMemberId ? (
          users.length === 0 ? (
            <div className="ServiceApply">
              <Row>
                <Col>
                  <h4 className="my-4">申請成為保姆</h4>
                  <Card className="card-light">
                    <Card.Body>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <div className="p-sm-4">
                          <ServiceProfileForm
                            parentUserData={callbackUserData}
                            parentCustomValidated={callbackCustomValid}
                            sMemberId={sMemberId}
                            isApply={true}
                          />
                          <div className="pb-4 px-0">
                            <Form.Group as={Row}>
                              <Col className="text-center">
                                <Form.Check
                                  custom
                                  name="admit"
                                  type="checkbox"
                                  id="admit"
                                  label="我同意HugDog保姆服務條款"
                                  feedback="您必須勾選同意才能繼續"
                                  required
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div className="pb-4 px-0">
                            <Form.Group as={Row}>
                              <Col className="text-center">
                                <Button variant="info" type="submit">
                                  <MdSend className="mr-1" />
                                  送出申請
                                </Button>
                              </Col>
                            </Form.Group>
                          </div>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <ServiceRegistered />
          )
        ) : (
          <ServiceAdminLoginChk />
        )}
      </div>
    </>
  )
}

export default withRouter(ServiceBooking)
