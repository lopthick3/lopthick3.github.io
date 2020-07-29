import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { Row, Col } from 'react-bootstrap'
import ServiceGoBack from '../../components/service/ServiceGoBack'
import ServiceDetailSidebar from '../../components/service/ServiceDetailSidebar'
import ServiceDetailMain from '../../components/service/ServiceDetailMain'
import ServiceNoUser from '../../components/service/redirect/ServiceNoUser'
import {
  SctollToTop,
  getDataFromServer,
} from '../../utils/service/ServiceFunction'
//引入自己的scss
import '../../css/service/style.scss'

function ServiceDetail(props) {
  const [users, setUsers] = useState([]) //保姆資料(service_user的資料)
  const [type, setType] = useState([]) //服務類型(service_type的資料)
  const [size, setSize] = useState([]) //狗狗體型(service_size的資料)
  const [rating, setRating] = useState(0) //評價分數
  const [comment, setComment] = useState([]) //狗狗體型(service_comment的資料)
  const [commentTotal, setCommentTotal] = useState(0) //評論數量
  // const [photo, setPhoto] = useState([]) //照片(service_photo的資料)
  const [extra, setExtra] = useState([]) //額外服務(service_extra的資料)
  const [member, setMember] = useState([]) //額外服務(member的資料)
  // const [like, setLike] = useState([]) //收藏資料

  useEffect(() => {
    //返回最頂端
    SctollToTop()
    //取得照片資料
    // const sPhoto = getDataFromServer(
    //   'http://localhost:6001/service/photo/' +
    //     props.match.params.userId +
    //     '?category=2'
    // )
    // Promise.resolve(sPhoto).then(data => {
    //   setPhoto(data)
    // })
    //取得額外服務
    const sExtra = getDataFromServer('http://localhost:6001/service/extra')
    Promise.resolve(sExtra).then((data) => {
      setExtra(data)
    })
    //取得評價資料
    const commentData = getDataFromServer(
      'http://localhost:6001/service/comment/' +
        props.match.params.userId +
        '?order=created_at'
    )
    Promise.resolve(commentData).then((data) => {
      let dataDefaultTotal = [...data].splice(0, 3) //預設回傳3筆
      setCommentTotal(data.length) //評論總筆數
      setComment(dataDefaultTotal)
      let score = 0
      data.map((v, i) => (score += parseInt(v.rating)))
      setRating(Math.round(score / data.length))
    })
    // //取得會員
    const memberData = getDataFromServer(`http://localhost:6001/service/member`)
    Promise.resolve(memberData).then((data) => {
      setMember(data)
      // console.log(data)
    })
    //取得服務類型資料
    const sTypeData = getDataFromServer('http://localhost:6001/service/type')
    Promise.resolve(sTypeData).then((data) => {
      setType(data)
    })
    //取得狗狗體型資料
    const dogSize = getDataFromServer('http://localhost:6001/service/size')
    Promise.resolve(dogSize).then((data) => {
      setSize(data)
    })
    //取得個別保姆資料
    const data = getDataFromServer(
      'http://localhost:6001/service/user/' + props.match.params.userId
    )
    Promise.resolve(data).then((data) => {
      setUsers(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <div className="container pt-3 pb-5">
        {users.length !== 0 ? (
          <div className="ServiceDetail">
            <ServiceGoBack prevUrl={`/service/query`} />
            <Row>
              <Col lg={4} className="mb-5">
                {users.map((v, i) => (
                  <ServiceDetailSidebar
                    sUsers={v}
                    sUserId={v.id}
                    sMemberId={props.sMemberId}
                    sMId={v.mId}
                    sType={type}
                    sSize={size}
                    sExtra={extra}
                    sRating={rating}
                    // sLike={like}
                    sComment={comment}
                    sCommentTotal={commentTotal}
                    key={i}
                  />
                ))}
              </Col>
              <Col lg={8}>
                {users.map((v, i) => (
                  <ServiceDetailMain
                    sUsers={v}
                    sMemberId={props.sMemberId}
                    sMId={v.mId}
                    // sPhoto={photo}
                    sExtra={extra}
                    sRating={rating}
                    sComment={comment}
                    sCommentTotal={commentTotal}
                    sMember={member}
                    key={i}
                  />
                ))}
              </Col>
            </Row>
          </div>
        ) : (
          <ServiceNoUser />
        )}
      </div>
    </>
  )
}

export default withRouter(ServiceDetail)
