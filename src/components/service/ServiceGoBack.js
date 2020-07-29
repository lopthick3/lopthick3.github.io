import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { FaAngleLeft } from 'react-icons/fa'
import { linkTo } from '../../utils/service/ServiceFunction'

function ServiceServiceGoBack(props) {
  // const history = useHistory()
  //   console.log(history)

  return (
    <>
      <Row>
        <Col>
          <Link
            className="gobackLink"
            to="#"
            onClick={() => {
              linkTo(props.prevUrl)
            }}
          >
            <FaAngleLeft />
            <span className="d-none d-sm-inline-block ml-1 linkTxt">返回</span>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default ServiceServiceGoBack
