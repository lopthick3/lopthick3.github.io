import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
//引入自己的scss
import '../../css/service/style.scss'
import ServiceLoading from '../../components/service/ServiceLoading'
//服務內部router設定
import ServiceHome from './ServiceHome'
import ServiceQuery from './ServiceQuery'
import ServiceDetail from './ServiceDetail'
// import ServiceMessage from './ServiceMessage'
import ServiceBooking from './ServiceBooking'
import ServiceApply from './ServiceApply'
import ServiceComment from './ServiceComment'
import ServiceTerms from './ServiceTerms'
import Error from '../../pages/Error'

function ServiceApp(props) {
  //判斷是否登入(模擬登入會員id)
  const sMemberId = parseInt(localStorage.getItem('mId'))
  // console.log('會員ID:', sMemberId)
  //設定載入狀態
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    //載入畫面
    setLoaded(false)
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, [props.location.pathname])
  return (
    <>
      {loaded ? '' : <ServiceLoading />}
      <div className="Service">
        <Switch>
          <Route path="/service/query/:page?">
            <ServiceQuery sMemberId={sMemberId} />
          </Route>
          <Route path="/service/detail/:userId">
            <ServiceDetail sMemberId={sMemberId} />
          </Route>
          {/* <Route path="/service/message/:MsgId">
              <ServiceMessage />
            </Route> */}
          <Route path="/service/booking/:userId">
            <ServiceBooking sMemberId={sMemberId} />
          </Route>
          <Route exact path="/service/comment/:orderId">
            <ServiceComment sMemberId={sMemberId} />
          </Route>
          <Route path="/service/apply/">
            <ServiceApply sMemberId={sMemberId} />
          </Route>
          <Route exact path="/service/terms">
            <ServiceTerms sMemberId={sMemberId} />
          </Route>
          <Route exact path="/service">
            <ServiceHome sMemberId={sMemberId} />
          </Route>
          <Route path="/service">
            <Error />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default withRouter(ServiceApp)
