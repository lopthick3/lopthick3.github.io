import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

function ActClassCard(props) {
  // console.log('asdf', props.ttt)

  const actClass = props.data ? props.data : ''

  // console.log(actClass)
  let title = actClass.cName
  let date = actClass.cDate
  let img = actClass.cImg
  // let Id = actClass.cId

  // console.log(`../../images/activity/${img}`)
  return (
    <>
      <Card className="my-3">
        <Link to={'/activity/class/' + props.data.cId}>
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
          <Link to="/activity/class">#課程報名</Link>
        </Card.Footer>
      </Card>
    </>
  )
}
export default withRouter(ActClassCard)
