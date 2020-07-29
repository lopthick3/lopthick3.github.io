import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io'
import { IconContext } from 'react-icons'
// import { StickyContainer, Sticky } from 'react-sticky'

//引入自己的css
import '../../css/activity/activity.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Breadcrumb from '../../components/Breadcrumbs'

function ActivityEvent(props) {
  const [quantity, setQuantity] = useState(1)
  const [data, setData] = useState([])
  const [aleart, setAleart] = useState(false)
  //加入收藏
  const addCollection = () => {
    Swal.fire('收藏成功', '', 'success')

    console.log('加入收藏')
    fetch(`http://localhost:6001/activity_collection/insertCollect/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mId: localStorage.getItem('mId'),
        oId: props.match.params.eId,
        oName: data[0].eName,
        oDate: data[0].eDate,
      }),
    })
      .then((r) => r.json())
      .then((obj) => console.log(obj))

    $('.add-collect').addClass('d-none')
    $('.remove-collect').removeClass('d-none')
    // console.log(123)
  }

  //取消收藏
  const removeCollection = () => {
    console.log('取消收藏')
    Swal.fire('成功取消收藏', '', 'success')
    fetch(`http://localhost:6001/activity_collection/deleteCollect/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mId: localStorage.getItem('mId'),
        oId: props.match.params.eId,
      }),
    })
      .then((r) => r.json())
      .then((obj) => console.log(obj))

    $('.add-collect').removeClass('d-none')
    $('.remove-collect').addClass('d-none')
    // console.log(123)
  }

  //報名參加
  const joinClass = () => {
    Swal.fire({
      title: '是否確定報名參加?',
      // text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#cea160',
      cancelButtonColor: '#cccccc',
      cancelButtonText: '取消',
      confirmButtonText: '參加',
    }).then((result) => {
      if (result.value) {
        Swal.fire('報名成功', '', 'success')
      }
    })
    // console.log('報名參加')
    fetch(`http://localhost:6001/activity_successEvent/insertSuccessEvent/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        mId: localStorage.getItem('mId'),
        eId: props.match.params.eId,
        eName: data[0].eName,
        eDate: data[0].eDate,
        ePeople: quantity + '',
      }),
    })
      .then((r) => r.json())
      .then((obj) => console.log(obj))
  }
  useEffect(() => {
    const eId = props.match.params.eId
    // const cInfo = props.match.params.cInfo
    // console.log('propsdata:', props.match.params.cId)
    // props.getActivityClassDetail(cId)

    //fetch課程資料
    async function getActClassData() {
      const req = new Request(`http://localhost:6001/activity_event/${eId}`, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const res = await fetch(req)
      const data = await res.json()
      // console.log(data[0].cImg)
      setData(data)
      // setData(data[0].cInfo.split('\n').join())
      // console.log('課程資料', data[0].cName)
    }
    getActClassData()

    //fetch收藏資料
    const checkCollection = () => {
      fetch(`http://localhost:6001/activity_collection/checkCollect`, {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          mId: localStorage.getItem('mId'),
          oId: props.match.params.cId,
        }),
      })
        .then((r) => r.json())
        .then((obj) => console.log(obj))
    }
    checkCollection()
  }, [])
  return (
    <>
      {data.map((v) => (
        <div className="container activity-class my-3 ">
          <div className="row mt-3 left-right-container">
            <div className="col-lg-7 class-left">
              <figure className="classPic">
                <img src={require(`../../images/activity/${v.eImg}`)} alt="" />
              </figure>

              <div style={{ whiteSpace: 'pre-wrap' }}>
                <h5>活動內容</h5>
                <hr />
                {v.eInfo}
              </div>
              <div className="block-notice mt-3">
                <h5>注意事項</h5>
                <hr />
                <div>
                  <p>
                    ① 活動注意事項：
                    <br />
                    1.若有任何忌口食物、或食物過敏原，還請事先告知。
                    <br />
                    2.因場地全區為實木地板，進入後請換上我們為您準備的拖鞋。
                    <br />
                    3.肺炎流行期間，請謹慎斟酌自身身體狀況，若有身體不適請勿報名參加。
                  </p>
                  <p>
                    ② 費用相關事項：
                    <br />
                    1.若您已經完成付款，欲臨時取消報名，退費原則如下：
                    <br />
                    [活動日7天前(含)取消：全額退費 / 活動日前7天內取消：恕不退費
                    ] e.g. 您報名7/14週日場次 ... (7/7)週日(含)前取消 >>
                    全額退費 (7/8)週一(含)後取消 >> 恕不退費，請找人替補名額喔！
                    <br />
                    2.如遇天災等不可抗力因素取消活動，我們會主動與您聯繫，您可以選擇退費或轉班。
                    <br />
                    3. 活動取消與否，依活動地人事行政局停止上班公告為標準。
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-5 class-right">
              <div className="right-sticky">
                <h3 className="title">{v.eName}</h3>
                <div className="price">
                  <span className="symbol">NT$ </span>
                  <span className="amount">{v.ePrice}</span>
                </div>
                <hr />
                <div className="my-4">
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                    >
                      <option>請選擇活動規格</option>
                      <option>{v.eDate}</option>
                      <option>2020-04-17 (四) 13:00 ~ 15:00</option>
                      <option>2020-04-20 (日) 14:30 ~ 17:00</option>
                      <option>2020-04-22 (二) 13:00 ~ 15:00</option>
                    </select>
                  </div>
                  <div className="quantity">
                    <label>數量</label>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => {
                            setQuantity(quantity - 1)
                          }}
                        >
                          -
                        </button>
                      </div>
                      <input
                        type="text"
                        className="col-2 border-secondary form-control-plaintext text-center"
                        value={quantity}
                      />

                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => {
                            setQuantity(quantity + 1)
                          }}
                        >
                          +
                        </button>
                        <div className="ml-2 d-flex align-items-center">
                          {/* 部份規格剩最後 <span>1</span> 個名額 */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-3">
                    <button
                      type="button"
                      className="btn btn-primary form-control"
                      onClick={joinClass}
                    >
                      立即報名
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="btn btn-outline-primary form-control add-collect app"
                      onClick={addCollection}
                    >
                      <IconContext.Provider
                        value={{
                          size: '1.5em',
                          // color: 'blue',
                          className: 'IoMdHeartEmpty',
                          style: {
                            verticalAlign: 'middle',
                          },
                        }}
                      >
                        <div>
                          <IoMdHeartEmpty />
                          加入收藏
                        </div>
                      </IconContext.Provider>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary form-control remove-collect d-none"
                      onClick={removeCollection}
                    >
                      <IconContext.Provider
                        value={{
                          size: '1.5em',
                          color: '#FF2D2D',
                          className: 'IoMdHeartEmpty',
                          style: {
                            verticalAlign: 'middle',
                          },
                        }}
                      >
                        <div>
                          <IoMdHeart />
                          已加入收藏
                        </div>
                      </IconContext.Provider>
                    </button>
                  </div>
                </div>
                <hr />
                <div>
                  <h5>活動資訊</h5>
                  <div className="activity-info">
                    <div className="row info-item">
                      <div className="col-4 info-title">活動摘要</div>
                      <div className="col info-content">{v.eInfo2}</div>
                    </div>
                    <div className="row info-item">
                      <div className="col-4 info-title">最近活動日期</div>
                      <div className="col info-content">{v.eDate}</div>
                    </div>
                    <div className="row info-item">
                      <div className="col-4 info-title">預約須知</div>
                      <div className="col info-content">
                        活動日 1 天前需付款完成
                      </div>
                    </div>
                    <div className="row info-item">
                      <div className="col-4 info-title">活動所在地</div>
                      <div className="col info-content">{v.eLocation}</div>
                    </div>
                    <div className="row info-item">
                      <div className="col-4 info-title">活動地址</div>
                      <div className="col info-content">{v.eAddress}</div>
                    </div>
                    <div className="row info-item">
                      <div className="col-4 info-title">開放入場時間</div>
                      <div className="col info-content">活動開始前 15 分鐘</div>
                    </div>
                    <div className="row info-item">
                      <div className="col-4 info-title">活動長度</div>
                      <div className="col info-content">{v.eTime}</div>
                    </div>
                    <div className="row info-item">
                      <div className="col-4 info-title">剩餘名額</div>
                      <div className="col info-content">{v.ePeople}</div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default withRouter(ActivityEvent)
