import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

export default function IconMenu() {
  return (
    <>
      <div className="icon_menu mt-4">
        <section className="row">
          <div className="row event-icon col-md-5">
            <div className="col  icon icon_time1 d-flex justify-content-center">
              <Link href="">
                <figure>
                  <img
                    src={require('../../../images/activity/activity-date.svg')}
                    alt=""
                  />
                </figure>
                <div className="text-center">時間</div>
              </Link>
            </div>
            <div className="col icon icon_categories d-flex justify-content-center">
              <Link href="">
                <figure>
                  <img
                    src={require('../../../images/activity/activity-category.svg')}
                    alt=""
                  />
                </figure>
                <div className="text-center">分類</div>
              </Link>
            </div>
            <div className="col  icon icon_location d-flex justify-content-center">
              <Link href="">
                <figure>
                  <img
                    src={require('../../../images/activity/activity-loaction.svg')}
                    alt=""
                  />
                </figure>
                <div className="text-center">地點</div>
              </Link>
            </div>
            <div className="col icon icon_keyword d-flex justify-content-center">
              <Link href="">
                <figure>
                  <img
                    src={require('../../../images/activity/activity-search.svg')}
                    alt=""
                  />
                </figure>
                <div className="text-center">關鍵字</div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
