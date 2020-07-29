import React from 'react'
import { NavLink } from 'react-router-dom'

function ServiceAdminSidebar(props) {
  return (
    <>
      <ul className="sidebar-list">
        <li>
          <NavLink exact to="/service/admin/" activeClassName="active">
            主頁
          </NavLink>
        </li>
        <li>
          <NavLink to="/service/admin/profile/" activeClassName="active">
            資料修改
          </NavLink>
        </li>
        <li>
          <NavLink to="/service/admin/order/" activeClassName="active">
            訂單查詢
            {props.sOrderNum ? (
              <span className="badge badge-danger ml-1">{props.sOrderNum}</span>
            ) : (
              ''
            )}
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/service/admin/message/" activeClassName="active">
            訊息
          </NavLink>
        </li> */}
      </ul>
    </>
  )
}

export default ServiceAdminSidebar
