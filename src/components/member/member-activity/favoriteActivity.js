import React, { useState, useEffect } from 'react'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getLoveActivity } from '../../../pages/member/actions/index'
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../../../css/member/member-info.scss'

const ServiceOrder = (props) => {
  const [serviceOrder, setServiceOrder] = useState([])
  //設定mId的來源,抓到mId去檢索會員的最新訂單(未完成)
  const mId = localStorage.getItem('mId')
  async function getOrderDetail(orderId) {
    const req = new Request(`http://localhost:6001/member/Sorder/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const detail = await res.json()
    console.log(detail)
    ServiceOrder(detail)
  }
  //狗狗基本資料

  useEffect(() => {
    props.getLoveActivity()
  }, [])

  let ServiceOrderList = []
  for (let i = 0; i < props.data.length; i++) {
    ServiceOrderList.push(
      <tr className="order_show" onClick={jump} id={i} name={i}>
        {/* <th scope="row">{i + 1}</th> */}
        <td>{i + 1}</td>
        <td>{props.data[i] ? props.data[i].oId : ''}</td>
        <td>{props.data[i] ? props.data[i].oName : ''}</td>
        <td>{props.data[i] ? props.data[i].oDate : ''}</td>
      </tr>
    )
    function jump() {
      window.location.replace(
        `http://localhost:3000/activity/${
          props.data[i] ? props.data[i].oId : ''
        }`
      )
    }
  }
  return (
    <div class="tab-content content favoriteActivityContainer" id="content2">
      <div>
        <h3>
          最愛活動
          <br />
        </h3>
        <div class="row">
          <div class="col-md-8">
            <div class="card card-width">
              <div class="card-body">
                <form name="myForm" method="POST" enctype="multipart/form-data">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">活動編號</th>
                        <th scope="col">活動名稱</th>
                        <th scope="col">活動時間</th>
                      </tr>
                    </thead>
                    <tbody>{ServiceOrderList}</tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  )
}
const mapStateToProps = (store) => {
  return { data: store.getLoveActivity }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getLoveActivity }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceOrder)
