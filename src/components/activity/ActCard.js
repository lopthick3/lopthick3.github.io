import React from 'react'
import { Card } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
// import { withRouter } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { AiOutlineClockCircle } from 'react-icons/ai'

function ActCard(props) {
  const actCard = props.data ? props.data : ''

  // console.log(props.data.eId)
  let title = actCard.eName
  let date = actCard.eDate
  let img = actCard.eImg
  let cate = actCard.eCate
  let sale = ''
  if (props.data.eCate === '優惠活動') {
    sale = 'sale/'
  }
  return (
    <>
      <Card className="my-3">
        <Link to={'/activity/' + sale + props.data.eId}>
          <figure className="actImg">
            <Card.Img
              variant="top"
              src={require(`../../images/activity/${img}`)}
              className="img-fluid"
            />
          </figure>
        </Link>
        <Card.Body>
          <IconContext.Provider
            value={{
              color: 'black',
              size: '1.2rem',
            }}
          >
            <AiOutlineClockCircle />
            <span className="ml-2 text-muted card-date">{date}</span>
          </IconContext.Provider>
          {/* <figure className="card-icon-clock d-flex align-item-end">
            <img
              src={require('../../images/activity/activity-clock.svg')}
              alt=""
            />
            <span className="ml-2 text-muted card-date">{date}</span>
          </figure> */}
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
          <Link to="/activity/class">#{cate}</Link>
        </Card.Footer>
      </Card>
    </>
  )
}
export default ActCard
