import React, { useState, useEffect } from 'react'
import { Nav, Card, Form, Button, Col, Row, Table } from 'react-bootstrap'

import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
// import { FiSearch, FiHeart } from 'react-icons/fi'
import '../../css/marketing/coupon.scss'
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import {
  insertCouponAsync,
  formServerCouponsCode,
  formServerCheckCoupons,
} from '../../actions/marketingActions'

function CouponEvent(props) {
  let x = localStorage.getItem('mName')
  let y = localStorage.getItem('mId')
  // console.log(x, y)
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
  let data = props.data
  function coupon1() {
    setCouponCode('5yqF34jrC6tA')
    setVerify('5yqF34jrC6tA' + userId)
  }
  function coupon2() {
    setCouponCode('7uuQ80qdO0zJ')
    setVerify('7uuQ80qdO0zJ' + userId)
  }
  function coupon3() {
    setCouponCode('8orO33tyI1tZ')
    setVerify('8orO33tyI1tZ' + userId)
  }
  // function handleSubmit1() {
  //   props.formServerCheckCoupons(verify)
  //   props.formServerCouponsCode(couponCode)
  // }
  // function handleSubmit2() {
  //   props.formServerCheckCoupons(verify)
  //   props.formServerCouponsCode(couponCode)
  // }
  // function handleSubmit3() {
  //   props.formServerCheckCoupons(verify)
  //   props.formServerCouponsCode(couponCode)
  // }
  useEffect(() => {
    props.formServerCheckCoupons(verify)
    props.formServerCouponsCode(couponCode)
    console.log('測試0')
  }, [verify])

  useEffect(() => {
    console.log(12)
    console.log('測試', props)

    let asda = props.data[0] ? props.data[0] : ''

    if (props.data[0]) {
      // console.log(props.data[0].mtId)
      setMarketingName(props.data[0].mtName)
      setMarketingId(props.data[0].mtId)
      setEndtime(props.data[0].endTime)
      setMtDiscountP(props.data[0].mtDiscountP)
      setMtDiscount(props.data[0].mtDiscount)
      setTest(true)
    }
  }, [data])
  useEffect(() => {
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
      // alert('優惠券領取成功')
      Swal.fire({
        icon: 'success',
        title: '優惠券領取成功',
        showConfirmButton: false,
        timer: 2500,
      })
      setMarketingName('')
      setMarketingId('')
      setEndtime('')

      // window.location.reload()
    } else if (props.data3 !== '' && test) {
      // setErrorMessages(['此優惠券已取得過'])
      // alert('此優惠券已取得過')
      Swal.fire({
        icon: 'error',
        title: '此優惠券已取得',
        showConfirmButton: false,
        timer: 2500,
      })
      // setError(true)
      console.log(123, errorMessages)
    }
    setVerify('')
    setCouponCode('')
    setTest(false)
  }, [test])
  return (
    <>
      <div className="container">
        <Card className="text-center my-5">
          <Card.Header>四月優惠券一</Card.Header>
          <Card.Img
            variant="top"
            className="couponeventImg"
            src="https://cdn.pixabay.com/photo/2020/02/29/19/02/norderney-4890873_960_720.jpg"
          />
          <Card.Body>
            <Card.Title>優惠券折50元</Card.Title>
            <Card.Text>
              <h6>此優惠券可使用於任何種類商品</h6>
              <h6>單一筆消費僅可使用一種優惠方式</h6>
            </Card.Text>
            <Button variant="primary" type="button" onClick={() => coupon1()}>
              取得優惠券
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted text-right">
            結束時間 2020/4/30 00:00:00
          </Card.Footer>
        </Card>
        <Card className="text-center my-5">
          <Card.Header>四月優惠券二</Card.Header>
          <Card.Img
            variant="top"
            className="couponeventImg"
            src="https://cdn.pixabay.com/photo/2013/10/02/23/03/dog-190056_960_720.jpg"
          />
          <Card.Body>
            <Card.Title>優惠券折88元</Card.Title>
            <Card.Text>
              <h6>此優惠券可使用於任何種類商品</h6>
              <h6>單一筆消費僅可使用一種優惠方式</h6>
            </Card.Text>
            <Button variant="primary" type="button" onClick={() => coupon2()}>
              取得優惠券
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted text-right">
            結束時間 2020/4/30 00:00:00
          </Card.Footer>
        </Card>
        <Card className="text-center my-5">
          <Card.Header>四月優惠券三</Card.Header>
          <Card.Img
            variant="top"
            className="couponeventImg"
            src="https://cdn.pixabay.com/photo/2016/11/21/00/47/view-1844110_960_720.jpg"
          />
          <Card.Body>
            <Card.Title>優惠券折168元</Card.Title>
            <Card.Text>
              <h6>此優惠券可使用於任何種類商品</h6>
              <h6>單一筆消費僅可使用一種優惠方式</h6>
            </Card.Text>
            <Button variant="primary" type="button" onClick={() => coupon3()}>
              取得優惠券
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted text-right">
            結束時間 2020/4/30 00:00:00
          </Card.Footer>
        </Card>
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
  connect(mapStateToProps, mapDispatchToProps)(CouponEvent)
)
