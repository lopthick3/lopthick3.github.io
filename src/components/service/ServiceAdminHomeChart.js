import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { getDataFromServer } from '../../utils/service/ServiceFunction'
import { withRouter } from 'react-router'

function ServiceAdminHomeChart(props) {
  const userId = props.sUserId
  const [amtArr, setAmtArr] = useState([])
  const [amt, setAmt] = useState(0)

  //圖表元件
  const renderLineChart = (
    <LineChart data={amtArr}>
      <Line
        type="monotone"
        dataKey="金額"
        stroke="#c04a68"
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
  //取得全部訂單的金額並渲染圖表
  useEffect(() => {
    const amtTotal = getDataFromServer(
      `http://localhost:6001/service/order/amtByDate/${userId}`
    )
    Promise.resolve(amtTotal).then((data) => {
      let dataArr = [],
        total = 0
      for (let i = 0; i < data.length; i++) {
        total += data[i].amt
        dataArr = [
          ...dataArr,
          { name: data[i].date.slice(0, 10), 金額: data[i].amt },
        ]
      }
      setAmt(total)
      setAmtArr(dataArr)
      console.log(dataArr)
    })
  }, [userId])
  //全部金額加總傳回父元件
  useEffect(() => {
    props.parentAmtData(toCurrency(amt))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amt])
  //千分位
  function toCurrency(num) {
    let parts = num.toString().split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts.join('.')
  }
  return (
    <>
      {amtArr.length ? (
        <ResponsiveContainer width="100%" aspect={4.0 / 2.0}>
          {renderLineChart}
        </ResponsiveContainer>
      ) : (
        <h5 className="text-center">目前尚未有訂單資料</h5>
      )}
    </>
  )
}

export default withRouter(ServiceAdminHomeChart)
