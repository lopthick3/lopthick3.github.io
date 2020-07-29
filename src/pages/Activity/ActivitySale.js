import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

//引入自己的css
import '../../css/activity/activity.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

function ActivitySale(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    const eId = props.match.params.eId
    // const cInfo = props.match.params.cInfo
    // console.log('propsdata:', props.match.params.cId)
    // props.getActivityClassDetail(cId)

    //fetch課程資料
    async function getActSaleata() {
      const req = new Request(`http://localhost:6001/activity＿event/${eId}`, {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      const res = await fetch(req)
      const data = await res.json()
      // console.log(data[0].cImg)
      setData(data[0])
      // setData(data[0].cInfo.split('\n').join())
    }
    getActSaleata()
  }, [])
  return (
    <>
      <div className="container activity-sale my-5">
        <div className="content">
          <h1 className="mb-4">居家護理專區滿千折百</h1>
          <figure>
            <img
              src={require(`../../images/activity/sale01.jpg`)}
              alt=""
              className="img-fluid"
            />
          </figure>
          <div class="row info-content mb-3">
            <div class="col-2">活動日期 : </div>
            <div class="col"> 2020-03-31 ~ 2020-09-01 </div>
          </div>
          <div class="row info-content">
            <div class="col-2">活動資訊 : </div>
            <div class="col">
              隨著武漢肺癌疫情持續燃燒，我們也希望您的愛犬能擁有最完善的照護，只要是有關居家護理的相關產品通通滿千折百，也希望這波疫情能夠趕快結束。
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ActivitySale)
