import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getBlog } from './actions/index'

import BlogPost from './Blogpost'
import '../../components/Knowledge/knowledge.scss'
// import SideMenu from '../../components/Knowledge/'

const Blog = props => {
  useEffect(() => {
    console.log(props)
    props.getBlog()
  }, [])

  const [newType, setNewType] = useState('')
  function changeType(newType) {
    setNewType(newType)
  }

  return (
    <>
      {/* <Blogheader /> */}

      <div className="knowledgebanner"></div>
      <Container className="blog">
        <br />
        <nav className="nav d-flex justify-content-between">
          <a className="nav-link" href="#">
            首頁 / blog
          </a>
          {/* <Search />  */}
        </nav>
        <Row>
          <Col md={9} className="">
            {/* 文章 */}
            <div className="wrap">
              {/* <Row className="articlepost mr-3"> */}
              {/* <div className="article mr-3"> */}
              {props.post &&
                props.post.map((value, index) => {
                  if (newType) {
                    if (props.post[index].aType === newType) {
                      return (
                        <BlogPost
                          key={index}
                          data={props.post[index]}
                          changeType={props.post.aType}
                        />
                      )
                    }
                  } else {
                    return <BlogPost key={index} data={props.post[index]} />
                  }
                })}
              {/* </div> */}
              {/* </Row> */}

              {/* {pages} */}
            </div>
          </Col>
          <Col md={3}>
            <div className="mt-3 text-center">
              <h4 className="r">尋找分類</h4>
              <br></br>
              <div className="sidebar mr-4 ml-4">
                <Link>
                  <p className="1" onClick={() => changeType('1')}>
                    健康與生活
                  </p>
                  <p id="2" onClick={() => changeType('2')}>
                    疫苗與用藥
                  </p>
                  <p className="3" onClick={() => changeType('3')}>
                    營養與處方
                  </p>
                  <p className="4" onClick={() => changeType('4')}>
                    美容與保養
                  </p>
                </Link>
              </div>
            </div>
            {/* <sideMenu /> */}
          </Col>
        </Row>
      </Container>
    </>
  )
}

const mapStateToProps = store => {
  return { post: store.getBlog }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBlog }, dispatch)
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))
