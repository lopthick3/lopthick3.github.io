import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
// import { FiSearch, FiHeart } from 'react-icons/fi'
import { GiTicket } from 'react-icons/gi'
import { IconContext } from 'react-icons'
import '../../css/marketing/coupon.scss'
import Swal from 'sweetalert2'

import { connect } from 'react-redux'

//action
import { bindActionCreators } from 'redux'
import {
  insertCouponAsync,
  formServerCouponsCode,
  formServerCheckCoupons,
} from '../../actions/marketingActions'

function CouponInsert(props) {
  // props.formServerCouponsCode('dcI4a4SBl4Uw')

  let x = localStorage.getItem('mName')
  let y = localStorage.getItem('mId')
  console.log(x, y)
  const [username, setUsername] = useState(x)
  const [userId, setUserId] = useState(y)
  const [marketingName, setMarketingName] = useState('')
  const [marketingId, setMarketingId] = useState('')
  const [mtDiscountP, setMtDiscountP] = useState('')
  const [mtDiscount, setMtDiscount] = useState('')
  const [endtime, setEndtime] = useState('')
  const [verify, setVerify] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [error, setError] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [test, setTest] = useState(false)
  // const [test2, setTest2] = useState(false)
  function handleSubmit2() {
    let error = false
    let errorMessages = []

    props.formServerCheckCoupons(verify)

    props.formServerCouponsCode(couponCode)

    console.log(12314515, verify)
    // setMarketingName(1)
    // setMarketingId(2)
    // let asda = props.data[0].mtId ? props.data[0].mtId : ''
    console.log(props)

    if (!couponCode) {
      // console.log('nousername')
      // error = true
      // errorMessages.push('請輸入序號')
      Swal.fire({
        icon: 'error',
        title: '請輸入序號',
        timer: 2500,
      })
    } else if (0 < +couponCode.length && +couponCode.length < 12) {
      // console.log('nousername')
      // error = true
      // errorMessages.push('請輸入十二碼')
      Swal.fire({
        icon: 'error',
        title: '請輸入十二碼',
        timer: 2500,
      })
    } else if (+couponCode.length === 12) {
      setError(false)
      console.log(12345222)
    }
    if (error) {
      setError(error)
      setErrorMessages(errorMessages)
      console.log(errorMessages)
      return
    }
    // setTest2(true)
  }
  let data = props.data
  useEffect(() => {
    console.log(12)
    console.log('測試', props)
    // let error = false
    // let errorMessages = []
    // console.log(12345)
    // if (!props.data) {
    //   // console.log('nousername')
    //   error = true
    //   errorMessages.push('序號無效')
    // }
    // if (error) {
    //   setError(error)
    //   setErrorMessages(errorMessages)
    //   return
    // }
    if (props.data.length == 0 && +couponCode.length === 12) {
      // setErrorMessages(['序號無效'])
      // alert('此優惠券已取得過')
      // setError(true)
      Swal.fire({
        icon: 'error',
        title: '序號無效',
        timer: 2500,
      })
      // console.log('空的')
      // setTest2(false)
    }

    let asda = props.data[0] ? props.data[0] : ''

    if (props.data[0]) {
      console.log(props.data[0].mtId)
      setMarketingName(props.data[0].mtName)
      setMarketingId(props.data[0].mtId)
      setEndtime(props.data[0].endTime)
      setMtDiscountP(props.data[0].mtDiscountP)
      setMtDiscount(props.data[0].mtDiscount)
      setTest(true)
    }
    // let oldendtime = props.data[0].endTime
  }, [data])
  useEffect(() => {
    // console.log(12345)
    // console.log('測試2', props)
    let nowtime = new Date()
    let nowtime2 = nowtime.toLocaleString()
    console.log(9999, nowtime2)
    let y = nowtime.getFullYear()
    console.log(y)
    let m = nowtime.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = nowtime.getDate()
    d = d < 10 ? '0' + d : d
    let h = nowtime.getHours()
    h = h < 10 ? '0' + h : h
    let minute = nowtime.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    let second = nowtime.getSeconds()
    second = second < 10 ? '0' + second : second
    let testTime = y + m + d + h + minute + second

    console.log(9999, testTime)
    let oldendtime = endtime
    let newendtimecheck =
      oldendtime.substr(0, 4) +
      oldendtime.substr(5, 2) +
      oldendtime.substr(8, 2) +
      oldendtime.substr(11, 2) +
      oldendtime.substr(14, 2) +
      oldendtime.substr(17, 2)
    // console.log(newendtimecheck)
    const userData = {
      username,
      userId,
      marketingName,
      marketingId,
      mtDiscountP,
      mtDiscount,
      endtime,
      verify,
      // couponCode,
    }

    console.log(userData)

    if (
      marketingName !== '' &&
      test &&
      props.data3 == '' &&
      newendtimecheck > testTime
    ) {
      console.log('測試2', props)
      props.insertCouponAsync(userData, () => console.log('前端傳資料成功'))
      Swal.fire({
        icon: 'success',
        title: '優惠券領取成功',
        // showConfirmButton: false,
        timer: 2500,
        preConfirm: () => {
          window.location.reload()
        },
      })
      setMarketingName('')
      setMarketingId('')
      setEndtime('')
      // setTest2(true)
    } else if (marketingName !== '' && test && newendtimecheck < testTime) {
      // setErrorMessages(['此優惠券已過期'])
      // setError(true)
      // alert('此優惠券已取得過')

      Swal.fire({
        icon: 'error',
        title: '此優惠券已過期',
        // showConfirmButton: false,
        timer: 2500,
        // preConfirm: () => {
        //   window.location.reload()
        // },
        // console.log(123, errorMessages && test)
        // setTest2(false)
      })
    } else if (props.data3 !== '' && test) {
      // setErrorMessages(['此優惠券已取得過'])
      // setError(true)
      // alert('此優惠券已取得過')
      Swal.fire({
        icon: 'error',
        title: '此優惠券已取得',
        // showConfirmButton: false,
        timer: 2500,
        // preConfirm: () => {
        //   window.location.reload()
        // },
        // console.log(123, errorMessages)
        // setTest2(false)
      })
    }
    setTest(false)
  }, [test])
  // function handleSubmit() {

  // }
  // console.log(123333, props.data)
  return (
    <>
      <div className="marketing container">
        <h2>
          <IconContext.Provider value={{ size: '2rem' }}>
            <GiTicket />
          </IconContext.Provider>
          優惠碼與優惠券
        </h2>
        {error ? (
          <>
            <div className="alert alert-danger" role="alert">
              {errorMessages.map((v, i) => (
                <p key={i}>{v}</p>
              ))}
            </div>
          </>
        ) : (
          ''
        )}
        <div className="d-flex justify-content-center">
          <div className="coupon-box d-flex justify-content-center align-items-center my-5 px-3">
            <Form className="couponcode">
              <Form.Row>
                <Col md="auto" sm="12">
                  <h3>優惠碼輸入</h3>
                </Col>
                <Col md="auto" sm="12">
                  <Form.Control
                    type="text"
                    placeholder="優惠碼輸入"
                    maxlength="12"
                    onChange={function asd(e) {
                      setCouponCode(e.target.value)
                      setVerify(e.target.value + userId)
                    }}
                  />
                </Col>
                <Col md="auto" className="">
                  <Button
                    className="CouponBtn"
                    variant="primary"
                    type="button"
                    onClick={() => handleSubmit2()}
                  >
                    領取
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (store) => {
  return {
    data: store.getCode,
    data2: store.getCoupons,
    data3: store.CheckCoupon,
  }
}

//action
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { insertCouponAsync, formServerCouponsCode, formServerCheckCoupons },
    dispatch
  )
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CouponInsert)
)
