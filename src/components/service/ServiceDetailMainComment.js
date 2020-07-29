import React from 'react'
import { starRating } from '../../utils/service/ServiceFunction'
import moment from 'moment'
import 'moment/locale/zh-tw'

function ServiceDetailMainComment(props) {
  return (
    <li>
      <div className="d-flex p-2 p-sm-3">
        <div className="d-flex flex-column">
          <figure className="avatar mb-3">
            <img
              className="rounded-circle"
              src={require('../../images/member/member-img/m' +
                props.sMemberId.toString().padStart(3, '0') +
                '.jpg')}
              alt=""
            />
            <span>{props.sMemberImg}</span>
          </figure>
          <h5 className="text-center">{props.sMemberName}</h5>
        </div>
        <div className="d-flex flex-column pl-2 px-sm-4">
          <div className="mb-3">
            <div>{moment(props.sComment.created_at).fromNow()}</div>
            <div>{starRating(props.sComment.rating)}</div>
          </div>
          <div className="text-break">{props.sComment.commentTxt}</div>
        </div>
      </div>
    </li>
  )
}

export default ServiceDetailMainComment
