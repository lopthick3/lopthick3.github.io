import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Badge, Button, Image } from 'react-bootstrap'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { FiClock } from 'react-icons/fi'
import { AiOutlineTag } from 'react-icons/ai'
import { withRouter, Link } from 'react-router-dom'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getBlog, getBlogArticle } from './actions/index'

import Breadcrumbs from '../../components/Breadcrumbs'
import '../../components/Knowledge/knowledge.scss'
import BlogArticleSm from './BlogArticleSm'

const BlogArticle = (props) => {
  const aId = props.match.params.aId ? props.match.params.aId : ''

  console.log(aId)

  useEffect(() => {
    console.log(props)
    props.getBlog()
  }, [])

  useEffect(() => {
    props.getBlogArticle(props.match.params.aId)
  }, [props.match.params.aId])

  // console.log(props.match.params)

  $('.trun').click(function () {
    document.getElementById('trun').innerHTML = <FaHeart />
  })

  let showBlogType = ''
  if (props.article[0] && props.article[0].aType === '1') {
    showBlogType = '健康知識'
  } else if (props.article[0] && props.article[0].aType === '2') {
    showBlogType = '疫苗與用藥'
  } else if (props.article[0] && props.article[0].aType === '3') {
    showBlogType = '營養與處方'
  } else {
    showBlogType = '美容與保養'
  }

  let arr = props.post && props.post.slice(0, 3)

  const [heart, setHeart] = useState(true)

  return (
    <>
      <Container className="article">
        <Row className="mt-5">
          <Col md={9} className="mt-2 shadow-lg p-3 mb-4 bg-white rounded">
            <div className=" d-flex justify-content-between align-items-center mt-1">
              <h6 className="">
                <Badge variant="primary text-light" className="p-2">
                  {showBlogType}
                  {/* {props.article[0] ? props.article[0].aType : ''} */}
                </Badge>
                <span className="icn-time ml-3">
                  <FiClock /> {props.article[0] ? props.article[0].dDate : ''}
                </span>
              </h6>

              <Button
                type="submit"
                variant="link"
                className="d-flex text-danger btn-white"
                onClick={() => setHeart(!heart)}
              >
                <h1 id="heart">{heart ? <FaRegHeart /> : <FaHeart />}</h1>
              </Button>
            </div>
            <div>
              <h1 className="text-left mt-3 mb-4">
                {props.article[0] ? props.article[0].aTitle : ''}
              </h1>
            </div>
            <div>
              {props.article[0] ? (
                <Image
                  className="articeImg"
                  src={require('../../images/knowledge/blog/' +
                    props.article[0].aId +
                    '.jpg')}
                  alt=""
                />
              ) : (
                ''
              )}
            </div>
            <div className="content mt-3">
              <p className="articletxt text-left p-4">
                {props.article[0] ? props.article[0].aDes : ''}
              </p>
            </div>
          </Col>
          <Col md={3}>
            <div className="mt-3 ">
              <div className="text-center">
                <h4 className="r">最新文章</h4>
              </div>
              <br></br>
              <div className="sidebar mr-4 ml-4">
                {props.post &&
                  arr.map((value, index) => {
                    console.log(index, 'value:', value)
                    return (
                      <BlogArticleSm key={index} data={props.post[index]} />
                    )
                  })}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const mapStateToProps = (store) => {
  return { post: store.getBlog, article: store.getBlogArticle }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getBlog, getBlogArticle }, dispatch)
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogArticle)
)
