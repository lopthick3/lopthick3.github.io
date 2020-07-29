import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ServiceAdminBreadcrumb from '../../../components/service/admin/ServiceAdminBreadcrumb'
import { FaSearch } from 'react-icons/fa'
import {
  getDataFromServer,
  calcTimeDiff,
} from '../../../utils/service/ServiceFunction'
//引入自己的scss
import '../../../css/service/style.scss'

function ServiceAdminOrder(props) {
  const [ordersts, setOrdersts] = useState([])
  const [type, setType] = useState([])
  const [order, setOrder] = useState([])
  useEffect(() => {
    //取得訂單狀態定義
    const orderState = getDataFromServer(
      'http://localhost:6001/service/ordersts'
    )
    Promise.resolve(orderState).then(data => {
      setOrdersts(data)
    })
    //取得服務類型資料
    const sTypeData = getDataFromServer('http://localhost:6001/service/type')
    Promise.resolve(sTypeData).then(data => {
      setType(data)
    })
    //取得所有訂單資料
    const orderList = getDataFromServer(
      'http://localhost:6001/service/order/' + props.sUserId
    )
    Promise.resolve(orderList).then(data => {
      setOrder(data)
    })
  }, [props])
  return (
    <>
      <div className="ServiceAdminOrder">
        <ServiceAdminBreadcrumb pagename="訂單查詢" />
        <Table responsive className="bg-white">
          <thead>
            <tr>
              <th>日期</th>
              <th>訂單狀態</th>
              <th>服務項目</th>
              <th>查看</th>
            </tr>
          </thead>
          <tbody>
            {order.length ? (
              order.map((v, i) => {
                let orderstsIndex = ordersts
                  .map(o => o.orderStsId)
                  .indexOf(v.orderStsId)
                let typeIndex = type.map(t => t.sTypeId).indexOf(v.sTypeId)
                return (
                  <tr
                    key={i}
                    className={v.orderStsId === 'o05' ? 'order-cancel' : ''}
                  >
                    <td>{v.created_at.slice(0, 10)}</td>
                    <td>
                      {orderstsIndex >= 0
                        ? ordersts[orderstsIndex].stsName
                        : ''}
                    </td>
                    <td>
                      {typeIndex >= 0 ? type[typeIndex].sTypeName : ''}(
                      {calcTimeDiff(
                        new Date(v.sTimeStart),
                        new Date(v.sTimeEnd)
                      )}
                      )
                    </td>
                    <td>
                      <Link
                        className="btn btn-primary mr-3 btn-sm"
                        to={`/service/admin/order/${v.orderId}`}
                      >
                        <FaSearch />
                      </Link>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  查無任何訂單資料
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default ServiceAdminOrder
