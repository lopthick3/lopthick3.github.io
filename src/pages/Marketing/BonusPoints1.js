import React, { useEffect } from 'react'
import '../../css/marketing/bonuspoints.scss'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import BonusPointsNav from '../../components/marketing/BonusPointsNav'
import BonusPointsList from '../../components/marketing/BonusPointsList'
import BonusPointsDescription from './BonusPointsDescription'

import { IoIosStar, IoMdStarOutline, IoMdStarHalf } from 'react-icons/io'
import { IconContext } from 'react-icons'
import $ from 'jquery'

function BonusPoints() {
  const itemsnum = 250

  // function test() {
  //   let qwe = ''
  //   for (let i = 1; i <= 10; i++) {
  //     let abc = `<div> ${i} </div>`
  //     qwe += abc
  //     console.log(abc)
  //     console.log(qwe)
  //   }
  //   return { __html: qwe }
  // }
  // function MyComponent() {
  //   return <div dangerouslySetInnerHTML={test()} />
  // }
  return (
    <>
      {/* <MyComponent /> */}
      <BonusPointsNav bonusPoints={5000} />

      <Switch>
        <Route path="/bonuspoints/event">{/* <CouponEvent /> */}</Route>
        <Route path="/bonuspoints/description">
          <BonusPointsDescription />
        </Route>
        <Route path="/bonuspoints">
          <BonusPointsList />
        </Route>
      </Switch>
    </>
  )
}

export default BonusPoints
