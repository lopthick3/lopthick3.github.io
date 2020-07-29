import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import ServiceAdminBreadcrumb from '../../../components/service/admin/ServiceAdminBreadcrumb'
import ServiceProfileForm from '../../../components/service/ServiceProfileForm'
import { getGoogleMapLocation } from '../../../utils/service/ServiceFunction'
import { MdEdit } from 'react-icons/md'
import Swal from 'sweetalert2'
import $ from 'jquery'
//引入自己的scss
import '../../../css/service/style.scss'

function ServiceAdminProfile(props) {
  const sUserId = props.sUserId
  const sMemberId = props.sMemberId
  //設定子元件回傳資料
  const [userData, setUserData] = useState(JSON)
  //表單驗證
  const [validated, setValidated] = useState(false)
  const [customValidated, setCustomValidated] = useState(false)
  const handleSubmit = (event) => {
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
            title: '確認更新資料?',
            text: '確認後將更新保姆資料',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#cea160',
            cancelButtonColor: '#8f8f8f',
            confirmButtonText: '確認',
            cancelButtonText: '返回',
          }).then((result) => {
            if (result.value) {
              //子元件回傳的資料並傳送
              fetch('http://localhost:6001/service/user/edit/' + userData.id, {
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
                    title: '更新成功',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
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

  useEffect(() => {}, [])

  return (
    <>
      <div className="ServiceAdminProfile">
        <ServiceAdminBreadcrumb pagename="資料修改" />
        <Card className="border-0">
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="p-0">
                <ServiceProfileForm
                  parentUserData={callbackUserData}
                  parentCustomValidated={callbackCustomValid}
                  sUserId={sUserId}
                  sMemberId={sMemberId}
                  isApply={false}
                />

                <div className="pb-4 px-0">
                  <Form.Group as={Row}>
                    <Col className="text-center">
                      <Button variant="primary" type="submit">
                        <MdEdit className="mr-1" />
                        送出修改
                      </Button>
                    </Col>
                  </Form.Group>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default withRouter(ServiceAdminProfile)
