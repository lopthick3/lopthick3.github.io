import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import ServiceBookingForm from '../../components/service/ServiceBookingForm'
import ServiceGoBack from '../../components/service/ServiceGoBack'
import { getDataFromServer, linkTo } from '../../utils/service/ServiceFunction'
import ServiceAdminLoginChk from '../../components/service/redirect/ServiceAdminLoginChk'
import ServiceNoUser from '../../components/service/redirect/ServiceNoUser'
import { MdSend } from 'react-icons/md'
import Swal from 'sweetalert2'
import $ from 'jquery'
//引入自己的scss
import '../../css/service/style.scss'

function ServiceBooking(props) {
  const sMemberId = props.sMemberId

  const [users, setUsers] = useState([]) //保姆資料(service_user的資料)
  //設定子元件回傳資料
  const [orderData, setOrderData] = useState(JSON)
  //表單驗證
  const [validated, setValidated] = useState(false)
  // const [customValidated, setCustomValidated] = useState(false)
  const handleSubmit = (event) => {
    console.log(orderData)
    setValidated(true)
    event.preventDefault()
    const form = event.currentTarget
    //若未完成驗證
    if (form.checkValidity() === false) {
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
      //完成驗證
      Swal.fire({
        title: '確認送出預約?',
        text: '送出後保姆將收到您的訂單',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#cea160',
        cancelButtonColor: '#8f8f8f',
        confirmButtonText: '確認',
        cancelButtonText: '返回',
      }).then((result) => {
        if (result.value) {
          //子元件回傳的資料並傳送
          fetch(
            `http://localhost:6001/service/order/insert/${props.match.params.userId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(orderData),
            }
          )
            .then((r) => r.json())
            .then((obj) => {
              console.log(obj)
              //回饋訊息
              Swal.fire({
                title: '預約成功',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              }).then((result) => {
                linkTo('/member/member-service')
              })
            })
        }
      })
      return false
    }
  }

  //子元件回傳資料
  const callbackOrderData = (child) => {
    setOrderData(child)
  }
  //子元件回傳自訂驗證
  // const callbackCustomValid = child => {
  //   setCustomValidated(child)
  // }

  useEffect(() => {
    //取得個別保姆資料
    const data = getDataFromServer(
      `http://localhost:6001/service/user/${props.match.params.userId}?dataSts=Y`
    )
    Promise.resolve(data).then((data) => {
      setUsers(data)
    })
  }, [])

  return (
    <>
      <div className="container pt-3 pb-5">
        {!!props.sMemberId ? (
          users.length !== 0 ? (
            <div className="ServiceBooking">
              <ServiceGoBack
                prevUrl={'/service/detail/' + props.match.params.userId}
              />
              <Row>
                <Col>
                  <h4 className="my-4">聯絡 {users[0].sName}</h4>
                  <Card className="card-light">
                    <Card.Body>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                      >
                        <div className="p-sm-4">
                          <ServiceBookingForm
                            parentOrderData={callbackOrderData}
                            // parentCustomValidated={callbackCustomValid}
                            sMemberId={sMemberId}
                          />
                          <div className="pb-4 px-0">
                            <Form.Group as={Row}>
                              <Col className="text-center">
                                <Form.Check
                                  custom
                                  name="admit"
                                  type="checkbox"
                                  id="admit"
                                  label="我同意HugDog預約服務條款"
                                  feedback="您必須勾選同意才能繼續"
                                  required
                                />
                              </Col>
                            </Form.Group>
                          </div>
                          <div className="pb-4 px-0">
                            <Form.Group as={Row}>
                              <Col className="text-center">
                                <Button variant="success" type="submit">
                                  <MdSend className="mr-1" />
                                  送出預約
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
            <ServiceNoUser />
          )
        ) : (
          <ServiceAdminLoginChk />
        )}
      </div>
    </>
  )
}

export default withRouter(ServiceBooking)
