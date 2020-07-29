import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Card, Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import ServiceCommentForm from '../../components/service/ServiceCommentForm'
import ServiceGoBack from '../../components/service/ServiceGoBack'
import { getDataFromServer, linkTo } from '../../utils/service/ServiceFunction'
import ServiceAdminLoginChk from '../../components/service/redirect/ServiceAdminLoginChk'
import ServiceNoOrder from '../../components/service/redirect/ServiceNoOrder'
import Swal from 'sweetalert2'
import $ from 'jquery'
//引入自己的scss
import '../../css/service/style.scss'

function ServiceBooking(props) {
  const sMemberId = props.sMemberId

  const [users, setUsers] = useState([]) //保姆資料(service_user的資料)
  const [order, setOrder] = useState([]) //訂單資料(service_user的資料)
  const [commentData, setCommentData] = useState([]) //評論回傳資料
  //表單驗證
  const [validated, setValidated] = useState(false)
  // const [customValidated, setCustomValidated] = useState(false)
  const handleSubmit = (event) => {
    setValidated(true)
    event.preventDefault()
    const form = event.currentTarget
    //若未完成驗證
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      //focus on valueMissing
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
        title: '確認送出評論?',
        text: '您即將送出評論',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#cea160',
        cancelButtonColor: '#8f8f8f',
        confirmButtonText: '確認',
        cancelButtonText: '返回',
      }).then((result) => {
        if (result.value) {
          //子元件回傳的資料並傳送
          console.log(commentData)
          //新增評論資料
          fetch(
            `http://localhost:6001/service/comment/insert/${order[0].orderId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(commentData),
            }
          )
            .then((r) => r.json())
            .then((obj) => {
              //修改訂單狀態
              fetch(
                `http://localhost:6001/service/orderdetail/ordersts/${order[0].orderId}`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    ordersts: 'o04',
                  }),
                }
              )
                .then((r) => r.json())
                .then((obj) => {
                  //回饋訊息
                  Swal.fire({
                    title: '評論完成',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                  }).then((result) => {
                    linkTo('/member/member-service')
                  })
                })
            })
          return false
        }
      })
    }
  }

  useEffect(() => {
    //取得個別訂單資料
    const data = getDataFromServer(
      `http://localhost:6001/service/orderdetail/${props.match.params.orderId}?orderStsId='o03'&mId=${sMemberId}`
    )
    Promise.resolve(data).then((data) => {
      setOrder(data)
      if (data.length) {
        //取得個別保姆資料
        const userData = getDataFromServer(
          `http://localhost:6001/service/user/${data[0].sId}`
        )
        Promise.resolve(userData).then((data) => {
          setUsers(data)
        })
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //子元件回傳資料
  const callbackCommentData = (child) => {
    setCommentData(child)
  }

  return (
    <>
      <div className="container pt-3 pb-5">
        {!!props.sMemberId ? (
          order.length !== 0 && sMemberId === order[0].mId ? (
            order.map((v, i) => {
              return (
                <div className="ServiceComment" key={i}>
                  <ServiceGoBack prevUrl={'/member/member-service'} />
                  <Row>
                    <Col>
                      <h4 className="my-4">
                        給 {users.map((v, i) => v.sName)} 評價
                      </h4>
                      <Card className="card-light">
                        <Card.Body>
                          <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                          >
                            <div className="p-sm-4">
                              <ServiceCommentForm
                                sMemberId={sMemberId}
                                sOrder={order}
                                parentCommentData={callbackCommentData}
                              />
                              <div className="pb-4 px-0">
                                <Form.Group as={Row}>
                                  <Col className="text-center">
                                    <Button variant="success" type="submit">
                                      送出評論
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
              )
            })
          ) : (
            <ServiceNoOrder />
          )
        ) : (
          <ServiceAdminLoginChk />
        )}
      </div>
    </>
  )
}

export default withRouter(ServiceBooking)
