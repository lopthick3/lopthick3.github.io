import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { starRating, checkIcon } from '../../utils/service/ServiceFunction'
import { getDataFromServer } from '../../utils/service/ServiceFunction'

function ServiceQueryList(props) {
  //保姆提供的服務類型
  //類型定義資料(比對用)
  //設定評論
  const [rating, setRating] = useState(0) //評價分數
  const [commentTotal, setCommentTotal] = useState(0) //評論數量
  // const [typeName, setTypeName] = useState([]) //類型名稱
  const [basePrice, setBasePrice] = useState(0) //服務基本價
  const [avatar, setAvatar] = useState('') //大頭貼(service_photo的資料)

  useEffect(() => {
    //取得照片資料
    const sPhoto = getDataFromServer(
      `http://localhost:6001/service/photo/${props.sUsers.mId}?category=1`
    )
    Promise.resolve(sPhoto).then((data) => {
      if (data.length) {
        setAvatar(
          `http://localhost:6001/uploads/service/avatar/${data[0].fileName}.${data[0].fileType}`
        )
      } else {
        setAvatar(
          'http://localhost:6001/uploads/service/avatar/placeholder.png'
        )
      }
    })
    //取得評價資料
    const commentData = getDataFromServer(
      'http://localhost:6001/service/comment/' + props.sUsers.id
    )
    Promise.resolve(commentData).then((data) => {
      setCommentTotal(data.length) //評論總筆數
      let score = 0
      data.map((v, i) => (score += parseInt(v.rating)))
      setRating(Math.round(score / data.length))
    })
    //最低價格
    setBasePrice(Math.min(...props.sTypePrice.map((p) => p.sPrice)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sUsers])

  return (
    <>
      <Link to={`/service/detail/${props.sUsers.id}`} className="sUser">
        <Card className="card-light card-list mb-3">
          <Card.Body className="p-3">
            <div className="d-flex">
              <figure className="avatar">
                <img src={avatar} alt="" />
              </figure>
              <ul className="user-data ml-4">
                <li>
                  <h5>
                    {props.sUsers.sName}
                    {props.sUsers.isConfirmed === 'Y' ? checkIcon() : ''}
                  </h5>
                </li>
                <li>{props.sUsers.sTitle}</li>
                <li>
                  {props.sUsers.sCity} {props.sUsers.sDist}
                </li>
                <li>
                  {/* comment */}
                  {starRating(rating)} ({commentTotal})
                </li>
                <li>
                  {/* service_type */}
                  {props.sTypePrice.map((v) => {
                    let index = props.sType
                      .map((s) => s.sTypeId)
                      .indexOf(v.sTypeId)
                    if (index >= 0) {
                      return props.sType[index].sTypeName + ' '
                    }
                  })}
                </li>
              </ul>
              <div className="text-center ml-auto">
                最低
                {/* type */}
                <h5 className="text-info my-2">${basePrice}</h5>
                <small className="text-muted">每小時</small>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Link>
    </>
  )
}

export default ServiceQueryList
