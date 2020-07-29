import React, { useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Button, Image, Badge } from 'react-bootstrap'
import { FiClock } from 'react-icons/fi'
import $ from 'jquery'

const BlogPost = props => {
  // useEffect(() => {
  //   props.getBlogArticle(props.match.params.aId)
  // }, [props.match.params.aId])

  $(function() {
    var len = 70 // 超過50個字以"..."取代
    $('.JQellipsis').each(function(i) {
      if ($(this).text().length > len) {
        $(this).attr('title', $(this).text())
        var text =
          $(this)
            .text()
            .substring(0, len - 1) + '...'
        $(this).text(text)
      }
    })
  })

  let showBlogType = ''
  if (props.data.aType === '1') {
    showBlogType = '健康知識'
  } else if (props.data.aType === '2') {
    showBlogType = '疫苗與用藥'
  } else if (props.data.aType === '3') {
    showBlogType = '營養與處方'
  } else {
    showBlogType = '美容與保養'
  }

  return (
    <>
      <Row className="mt-2 shadow p-3 mb-4 bg-white rounded">
        <Col>
          <Image
            className="blogImg"
            src={require('../../images/knowledge/blog/' +
              props.data.aId +
              '.jpg')}
            alt=""
          />
        </Col>
        <Col>
          <div className="header d-flex align-items-center justify-content-between mb-1 mr-2">
            <span className="icn-time">
              <FiClock /> {props.data.dDate}
            </span>

            <h6>
              {''}
              <Badge variant="primary text-light" className="p-2">
                {showBlogType}
              </Badge>
            </h6>
          </div>

          <div className="blogTitle mb-3 mt-2">
            <Link to={'/knowledge/blog/' + props.data.aId}>
              <h4 className="text-secondary">{props.data.aTitle}</h4>
            </Link>
          </div>
          <div className="blogtxt">
            <p className="JQellipsis"> {props.data.aDes} </p>
            <Link to={'/knowledge/blog/' + props.data.aId} className="">
              <p className="text-right align-items-buttom mr-4">看全文</p>
            </Link>
          </div>
        </Col>
      </Row>
      {/* <hr /> */}
    </>
  )
}

export default withRouter(BlogPost)
