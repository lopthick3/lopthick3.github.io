import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Col, Image, Badge } from 'react-bootstrap'
import { FiClock } from 'react-icons/fi'
import { bindActionCreators } from 'redux'
import { getBlog } from './actions/index'
import { GiConsoleController } from 'react-icons/gi'

function BlogArticleSm(props) {
  console.log('bb', props.data)
  return (
    <>
      <Col id="articlesm">
        <h6 className="header  justify-content-between mb-1 mr-2">
          <FiClock />
          <span className="icn-time text-left ml-2">
            {props.data ? props.data.dDate : ''}
          </span>
        </h6>
        <Link to={'/knowledge/blog/' + (props.data ? props.data.aId : '')}>
          {props.data ? (
            <Image
              className="articeImg"
              src={require('../../images/knowledge/blog/' +
                props.data.aId +
                '.jpg')}
              alt=""
            />
          ) : (
            ''
          )}
          <div className="blogTitle">
            <h5 className="text-secondary text-left mt-2 mb-2">
              {props.data ? props.data.aTitle : ''}
            </h5>
          </div>
        </Link>
      </Col>
      <hr />
    </>
  )
}

const mapStateToProps = (store) => {
  return { post: store.getBlog }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getBlog }, dispatch)
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogArticleSm)
)
