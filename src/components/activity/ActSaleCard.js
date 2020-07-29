import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'

function ActSaleCard(props) {
  // console.log('asdf', props.ttt)

  let actSale = props.data ? props.data : ''

  // console.log(actClass)
  let title = actSale.sName
  let date = actSale.sDate
  let img = actSale.sImg

  // console.log(`../../images/activity/${img}`)
  return (
    <>
      <Card className="my-3">
        <Link to={'/activity/sale/' + props.data.sId}>
          <Card.Img
            variant="top"
            src={require(`../../images/activity/${img}`)}
          />
        </Link>
        <Card.Body>
          <figure className="card-icon-clock d-flex align-item-end">
            <img
              src={require('../../images/activity/activity-clock.svg')}
              alt=""
            />
            <span className="ml-2 text-muted card-date">{date}</span>
          </figure>
          <Card.Text>
            {/* <IconContext.Provider
                value={{ size: '1.5rem', verticalAlign: 'top' }}
              >
                <FiClock />
                2020-03-26
              </IconContext.Provider> */}
          </Card.Text>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
        <Card.Footer bg="primary">
          <Link to="/activity/salequery">#優惠活動</Link>
        </Card.Footer>
      </Card>
    </>
  )
}
export default ActSaleCard
