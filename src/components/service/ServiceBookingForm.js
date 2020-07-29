import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Form, Row, Col } from 'react-bootstrap'
import { FaRegClock } from 'react-icons/fa'
import {
  SctollToTop,
  getDataFromServer,
  calcTimeDiff,
  handleFormValue,
  handleFormValueMatch,
} from '../../utils/service/ServiceFunction'
import $ from 'jquery'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import zhTW from 'date-fns/locale/zh-TW'
//uuid
import { v4 as uuidv4 } from 'uuid'
registerLocale('zh-TW', zhTW)
setDefaultLocale('zh-TW', zhTW)

function ServiceBookingForm(props) {
  //模擬session登入後的會員ID
  //此時必須是service_user已有此筆資料
  const sMemberId = props.sMemberId
  // const [userId, setUserId] = useState() //服務者ID
  const [type, setType] = useState([]) //服務類型(service_type的資料)
  const [size, setSize] = useState([]) //狗狗體型(service_size的資料)
  const [extra, setExtra] = useState([]) //額外服務
  const [users, setUsers] = useState([]) //保姆資料(service_user的資料)
  const [order, setOrder] = useState({}) //保姆訂單(service_order的資料)
  const [typePrice, setTypePrice] = useState(0) //選擇項目的價格
  const [basePrice, setBasePrice] = useState(0) //選擇項目的價格
  const [extraPrice, setExtraPrice] = useState(0) //選擇額外的價格
  const [totalPrice, setTotalPrice] = useState(0) //總價格
  //設定custom checkbox的ref(偵測是否完全載入)
  const customCheckRef = React.createRef()
  //設定自訂驗證提示
  // const [customValid, setCustomValid] = useState(false)
  //檢查自訂欄位格式
  const [customFormat, setCustomFormat] = useState(true)

  //備註最大字數限制
  const remarkMaxLengthLimit = 500
  const [remarkLength, setRemarkLength] = useState(0)

  //縣市區域
  const [city, setCity] = useState([])
  const [dist, setDist] = useState([])

  //-----預設取得原有資料-----
  useEffect(() => {
    //返回最頂端
    SctollToTop()
    //取得額外服務
    const sExtra = getDataFromServer('http://localhost:6001/service/extra')
    Promise.resolve(sExtra).then((data) => {
      setExtra(data)
    })
    //取得狗狗體型
    const dogSize = getDataFromServer('http://localhost:6001/service/size')
    Promise.resolve(dogSize).then((data) => {
      setSize(data)
    })
    //取得服務類型資料
    const sTypeData = getDataFromServer('http://localhost:6001/service/type')
    Promise.resolve(sTypeData).then((data) => {
      setType(data)
    })
    //取得縣市資料
    const city = getDataFromServer('http://localhost:6001/service/zipcode/city')
    Promise.resolve(city).then((data) => {
      setCity(data)
    })
    //取得個別保姆資料
    const data = getDataFromServer(
      `http://localhost:6001/service/user/${props.match.params.userId}`
    )
    Promise.resolve(data).then((data) => {
      setUsers(data)
    })
    //初始化訂單資料
    setOrder({
      orderId: uuidv4(),
      orderStsId: 'o01',
      mId: sMemberId,
      // sId: props.match.params.userId,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //-----表單驗證-----
  //處理額外服務資料回傳
  function handleExtra(e) {
    let extraArr = []
    $(":checkbox:checked[name='sExtra[]']").each(function (i) {
      extraArr.push($(this).val())
    })
    order.extraId = extraArr.toString()
  }
  //選擇縣市
  function handleChangeCity(cityValue) {
    const city = getDataFromServer(
      `http://localhost:6001/service/zipcode/city/'${cityValue}'`
    )
    Promise.resolve(city).then((data) => {
      setDist(data)
    })
  }
  //-----價格計算-----
  //取得選擇項目項格
  function handelTypePrice(e) {
    let typePrice = $(e.target).find(':selected').data('price') || 0
    let basePrice = $(e.target).find(':selected').data('baseprice') || 0
    setTypePrice(typePrice) //紀錄選擇項目價格
    setBasePrice(basePrice) //紀錄選擇項目價格
    calcTotalPrice(typePrice, basePrice, extraPrice) //計算總價
  }
  //取得勾選額外服務價格
  function handleExtraPrice(e) {
    console.log(e.target.name)
    let extraPrice = 0
    $(`:checkbox[name='${e.target.name}']`).each(function (i, v) {
      if ($(this).prop('checked')) {
        extraPrice += $(this).data('price')
      }
    })
    setExtraPrice(extraPrice) //紀錄選擇項目價格
    calcTotalPrice(typePrice, basePrice, extraPrice) //計算總價
  }
  //計算總價
  function calcTotalPrice(typePrice, basePrice, extraPrice = 0) {
    let time = calcTimeDiff(startDate, endDate, true) //總時長
    let total = time * typePrice + basePrice + extraPrice //總價格
    setTotalPrice(total)
    order.sPrice = total //設定訂單價格
  }
  //-----表單狀態完全render完成-----
  useEffect(() => {
    //設定回傳父元件資料
    props.parentOrderData(order)
    // props.parentCustomValidated(customValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customCheckRef])

  //-----react datepicker-----
  //設定預設值為目前時間
  let defaultStartDate = new Date()
  //時間預設值判斷進位(30分以下為30分,30-60分為60分)
  if (defaultStartDate.getMinutes() <= 30) {
    defaultStartDate.setMinutes(30)
  } else {
    defaultStartDate.setMinutes(60)
  }
  //設定預設起始時間(分鐘進位且+1小時)
  defaultStartDate.setHours(defaultStartDate.getHours() + 1)
  //設定預設起始時間(分鐘進位且+1小時)
  const [startDate, setStartDate] = useState(defaultStartDate) //起始日
  const [startMinTime, setStartMinTime] = useState(defaultStartDate) //起始日最小時間
  const [endDate, setEndDate] = useState(new Date()) //結束日
  const [endMinTime, setEndMinTime] = useState(
    defaultStartDate.getTime() + 3600000
  ) //結束日最小時間

  //起始目前值操作
  const handleStartDate = (date) => {
    if (date) {
      //若設定時間小於預設值,則設定為預設值
      if (date < defaultStartDate) {
        date.setTime(defaultStartDate)
      } else {
        //時間預設值判斷進位(30分以下為30分,30-60分為60分)
        if (date.getMinutes() === 0) {
          date.setMinutes(0)
        } else if (date.getMinutes() <= 30) {
          date.setMinutes(30)
        } else if (date.getMinutes() <= 60) {
          date.setMinutes(60)
        }
      }
      //起始時間最小值判斷
      if (date.getDate() === defaultStartDate.getDate()) {
        setStartMinTime(defaultStartDate)
      } else {
        setStartMinTime(
          new Date(
            defaultStartDate.getFullYear(),
            defaultStartDate.getMonth(),
            defaultStartDate.getDate(),
            0,
            0,
            0
          )
        )
      }
    } else {
      date = defaultStartDate
    }
    setStartDate(date)
  }

  //結束日目前值
  useEffect(() => {
    //設定結束時間(起始時間+1小時)
    let endNowDate = new Date()
    endNowDate.setTime(startDate.getTime() + 3600000)
    setEndDate(endNowDate)
  }, [startDate])

  //結束目前值操作
  const handleEndDate = (date) => {
    if (date) {
      //若設定時間小於起始值,則設定為起始值+1小時
      if (date <= startDate.getTime() + 3600000) {
        date.setTime(startDate.getTime() + 3600000)
      } else {
        //時間預設值判斷進位(30分以下為30分,30-60分為60分)
        if (date.getMinutes() === 0) {
          date.setMinutes(0)
        } else if (date.getMinutes() <= 30) {
          date.setMinutes(30)
        } else if (date.getMinutes() <= 60) {
          date.setMinutes(60)
        }
      }
    } else {
      date = new Date(startDate.getTime() + 3600000)
    }
    setEndDate(date)
  }
  //結束時間最小值判斷
  useEffect(() => {
    if (endDate.getDate() === startDate.getDate()) {
      setEndMinTime(startDate.getTime() + 3600000)
    } else {
      setEndMinTime(
        new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate(),
          0,
          0,
          0
        )
      )
    }
    order.sTimeStart = startDate //設定訂單起始時間
    order.sTimeEnd = endDate //設定訂單結束時間
    calcTotalPrice(typePrice, basePrice, extraPrice) //計算總價
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate])
  return (
    <>
      {users.map((v, i) => (
        <div key={i}>
          <h5>會員基本資料</h5>
          <hr className="title" />
          <div className="pb-4 px-0">
            <Form.Group as={Row}>
              <Form.Label column sm="3" className="required">
                地址
              </Form.Label>
              <Col sm="9" className="d-flex flex-column flex-lg-row">
                <div className="mr-lg-1 mb-2 mb-lg-0">
                  <Form.Control
                    as="select"
                    name="mCity"
                    required
                    onChange={(e) => {
                      handleChangeCity(e.target.value)
                      handleFormValue(e, order)
                    }}
                  >
                    <option value="">縣市</option>
                    {city.map((v, i) => (
                      <option key={i} value={v.City}>
                        {v.City}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    請選擇縣市
                  </Form.Control.Feedback>
                </div>
                <div className="mr-lg-1 mb-2 mb-lg-0">
                  <Form.Control
                    as="select"
                    name="mDist"
                    required
                    onChange={(e) => {
                      handleFormValue(e, order)
                    }}
                  >
                    <option value="">區域</option>
                    {dist.map((v, i) => (
                      <option key={i} value={v.Area}>
                        {v.Area}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    請選擇區域
                  </Form.Control.Feedback>
                </div>
                <div className="flex-grow-1">
                  <Form.Control
                    name="mAddr"
                    type="text"
                    placeholder="請填入地址"
                    required
                    defaultValue={order.mAddr}
                    onChange={(e) => handleFormValue(e, order)}
                  />
                  <Form.Control.Feedback type="invalid">
                    請填入正確地址
                  </Form.Control.Feedback>
                </div>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="mPhone">
              <Form.Label column sm="3" className="required">
                電話
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="mPhone"
                  type="text"
                  placeholder="請填入手機"
                  required
                  // pattern="09\d{2}\-?\d{3}\-?\d{3}"
                  defaultValue={order.sPhone}
                  onChange={(e) =>
                    setCustomFormat(
                      handleFormValueMatch(
                        e,
                        '^09[0-9]{2}-?[0-9]{3}-?[0-9]{3}$',
                        order
                      )
                    )
                  }
                  isInvalid={!customFormat}
                  onBlur={(e) => (!customFormat ? (e.target.value = '') : '')}
                />
                <Form.Control.Feedback type="invalid">
                  請填入手機格式 (09xx-xxx-xxx)
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </div>
          <h5>狗狗資料</h5>
          <hr className="title" />
          <div className="pb-4 px-0">
            <Form.Group as={Row} controlId="dName">
              <Form.Label column sm="3" className="required">
                <span>狗狗名字</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="dName"
                  type="text"
                  placeholder="請填入狗狗名字"
                  required
                  onChange={(e) => handleFormValue(e, order)}
                />
                <Form.Control.Feedback type="invalid">
                  請填入狗狗名字
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="dBreed">
              <Form.Label column sm="3" className="required">
                <span>品種</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="dBreed"
                  type="text"
                  placeholder="請填入品種"
                  required
                  onChange={(e) => handleFormValue(e, order)}
                />
                <Form.Control.Feedback type="invalid">
                  請填入品種
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="dAge">
              <Form.Label column sm="3" className="required">
                <span>犬齡</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  name="dAge"
                  type="number"
                  min="0"
                  max="99"
                  placeholder="請填入犬齡"
                  required
                  onChange={(e) => handleFormValue(e, order)}
                />
                <Form.Control.Feedback type="invalid">
                  請填入犬齡
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="dGender">
              <Form.Label column sm="3" className="required">
                <span>性別</span>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  name="dGender"
                  required
                  onChange={(e) => handleFormValue(e, order)}
                >
                  <option value="">請選擇</option>
                  <option value="m">公</option>
                  <option value="f">母</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  請填入性別
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="sizeId">
              <Form.Label column sm="3" className="required">
                <span>體型</span>
              </Form.Label>
              <Col sm="9">
                <Row>
                  {!!v.sSizeId && size.length !== 0
                    ? v.sSizeId.split(',').map((v, i) => {
                        let sizeIndex = size.map((s) => s.sizeId).indexOf(v)
                        return (
                          <Col md={6} key={i} className="py-2">
                            <Form.Check
                              custom
                              required
                              name="sizeId"
                              type="radio"
                              id={`sizeId${i}`}
                              value={v}
                              label={`${size[sizeIndex].sizeName} (${size[sizeIndex].sizeWeight})`}
                              onChange={(e) => handleFormValue(e, order)}
                            />
                          </Col>
                        )
                      })
                    : ''}
                </Row>
              </Col>
            </Form.Group>
          </div>
          <h5>服務內容</h5>
          <hr className="title" />
          <div className="pb-4 px-0">
            <Form.Group as={Row} controlId="sTypeId">
              <Form.Label column sm="3" className="required">
                選擇服務
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  name="sTypeId"
                  required
                  onChange={(e) => {
                    handelTypePrice(e)
                    handleFormValue(e, order)
                  }}
                >
                  <option value="">請選擇</option>
                  {type.length !== 0
                    ? JSON.parse(v.sTypePrice).map((v, i) => {
                        let typeIndex = type
                          .map((s) => s.sTypeId)
                          .indexOf(v.sTypeId)
                        return (
                          <option
                            value={v.sTypeId}
                            data-price={v.sPrice}
                            data-baseprice={type[typeIndex].sPrice}
                            key={i}
                          >
                            {`${type[typeIndex].sTypeName} ($${v.sPrice}/1小時 + ${type[typeIndex].sPrice}基本服務費)`}
                          </option>
                        )
                      })
                    : ''}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  請選擇服務項目
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="3" className="required">
                選擇時段
              </Form.Label>
              <Col sm="9">
                <div className="d-flex flex-column flex-md-row mb-2">
                  <div className="flex-grow-1">
                    <DatePicker
                      name="sTimeStart"
                      className="form-control"
                      selected={startDate}
                      onChange={handleStartDate}
                      selectsStart
                      startDate={startDate}
                      minDate={new Date()}
                      showTimeSelect
                      minTime={startMinTime}
                      maxTime={
                        new Date(
                          startDate.getFullYear(),
                          startDate.getMonth(),
                          startDate.getDate(),
                          23,
                          30,
                          0
                        )
                      }
                      timeFormat="HH:mm"
                      locale="zh-TW"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="yyyy/MM/dd HH:mm"
                      placeholderText="起始時段"
                      required
                    />
                    <span className="invalid-feedback">請選擇起始時段</span>
                  </div>
                  <div className="m-2 align-self-center">至</div>
                  <div className="flex-grow-1">
                    <DatePicker
                      name="sTimeEnd"
                      className="form-control"
                      selected={endDate}
                      onChange={handleEndDate}
                      selectsEnd
                      startDate={startDate}
                      minDate={startDate}
                      showTimeSelect
                      minTime={endMinTime}
                      maxTime={
                        new Date(
                          endDate.getFullYear(),
                          endDate.getMonth(),
                          endDate.getDate(),
                          23,
                          30,
                          0
                        )
                      }
                      timeFormat="HH:mm"
                      locale="zh-TW"
                      timeIntervals={30}
                      timeCaption="time"
                      dateFormat="yyyy/MM/dd HH:mm"
                      placeholderText="結束時段"
                      required
                    />
                    <span className="invalid-feedback">請選擇結束時段</span>
                  </div>
                </div>
                <div className="text-secondary">
                  <FaRegClock className="mr-1" />
                  預約時數共{calcTimeDiff(startDate, endDate)}
                </div>
              </Col>
            </Form.Group>
          </div>
          <h5>額外需求</h5>
          <hr className="title" />
          <div className="pb-4 px-0 mb-2">
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                選擇額外服務
              </Form.Label>
              <Col sm="9">
                <Row>
                  {!!v.sExtra && extra.length !== 0
                    ? v.sExtra.split(',').map((v, i) => {
                        let index = extra.map((x) => x.extraId).indexOf(v)
                        return (
                          <Col md={6} key={i} className="py-2">
                            <Form.Check
                              custom
                              name="sExtra[]"
                              type="checkbox"
                              data-price={extra[index].extraPrice}
                              id={`sExtra${i}`}
                              label={`${extra[index].extraName} ($${extra[index].extraPrice})`}
                              value={v}
                              ref={customCheckRef}
                              onChange={(e) => {
                                handleExtraPrice(e)
                                handleExtra(e)
                              }}
                            />
                          </Col>
                        )
                      })
                    : '未提供額外服務項目'}
                </Row>
              </Col>
            </Form.Group>
          </div>
          {totalPrice ? (
            <>
              <h5>總金額</h5>
              <hr className="title" />
              <div className="pb-4 px-0 mb-2">
                <Form.Group as={Row} controlId="sTypeId">
                  <Form.Label column sm="3">
                    服務項目
                  </Form.Label>
                  <Col sm="9" className="py-2">
                    <span className="ml-3 text-muted">
                      {`$${typePrice} x ${calcTimeDiff(
                        startDate,
                        endDate,
                        true
                      )}小時`}
                    </span>
                  </Col>
                  <Form.Label column sm="3">
                    基本服務費
                  </Form.Label>
                  <Col sm="9" className="py-2">
                    <span className="ml-3 text-muted">{`$${basePrice}`}</span>
                  </Col>
                  <Form.Label column sm="3">
                    額外需求
                  </Form.Label>
                  <Col sm="9" className="py-2">
                    <span className="ml-3 text-muted">{`$${extraPrice}`}</span>
                  </Col>
                  <hr />
                  <Form.Label column sm="3">
                    <h6>總計</h6>
                  </Form.Label>
                  <Col sm="9" className="py-2">
                    <span className="ml-3 text-info h6">${totalPrice}</span>
                  </Col>
                </Form.Group>
              </div>
            </>
          ) : (
            ''
          )}
          <h5>備註</h5>
          <hr className="title" />
          <Form.Group as={Row}>
            <Col>
              <Form.Group controlId="sRemark">
                <Form.Control
                  as="textarea"
                  name="sRemark"
                  rows="5"
                  maxLength={remarkMaxLengthLimit}
                  placeholder={`最多${remarkMaxLengthLimit}個字`}
                  onChange={(e) => {
                    setRemarkLength(e.target.value.length)
                    return handleFormValue(e, order)
                  }}
                />
              </Form.Group>
              <div>
                {remarkLength
                  ? '還可輸入' + (remarkMaxLengthLimit - remarkLength) + '個字'
                  : ''}
              </div>
            </Col>
          </Form.Group>
        </div>
      ))}
    </>
  )
}

export default withRouter(ServiceBookingForm)
