import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import { MdErrorOutline } from 'react-icons/md'
//引入自己的scss

function Error() {
  // const location = useLocation()
  // const history = useHistory()
  // console.log(history.location.pathname)
  return (
    <>
      <div className="Error">
        <div className="container">
          <Row>
            <Col>
              <div className="p-5 text-center">
                <h3 className="mb-3 text-danger">Oops! 沒有這個頁面</h3>
                <Link className="btn btn-theme" to="/">
                  返回首頁
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Error
