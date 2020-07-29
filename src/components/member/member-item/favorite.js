import React, { useState, useEffect } from 'react'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getLoveList } from '../../../pages/member/actions/index'
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

const LoveList = (props) => {
  const [loveList, setLoveList] = useState([])
  //設定mId的來源,抓到mId去檢索會員的最新訂單(未完成)
  const mId = localStorage.getItem('mId')
  const pName = props.data[0] ? props.data[0].pName : ''
  console.log('pName: ', pName)
  async function getOrderDetail(orderId) {
    const req = new Request(`http://localhost:6001/member/list/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const detail = await res.json()
    console.log('detail: ', detail)
    LoveList(detail)
  }
  //狗狗基本資料

  useEffect(() => {
    props.getLoveList()
    console.log('pName: ', pName)
  }, [])

  let LoveList = []
  console.log('pName: ', pName)
  for (let i = 0; i < props.data.length; i++) {
    LoveList.push(
      <tr className="order_show" onClick={jump} id={i} name={i}>
        {/* <th scope="row">{i + 1}</th> */}
        <td>{i + 1}</td>
        <td className="favorite_items_wrap">
          {props.data[i] ? props.data[i].pName : ''}
        </td>
        <td>{props.data[i] ? props.data[i].pPrice : ''}</td>
        <td>
          <img
            className="sm_cart_img"
            src={require(`../../../images/product/${
              props.data[i] ? props.data[i].pImg : ''
            }.jpg`)}
            alt="..."
          />
        </td>
        <td className="favorite_items_wrap">
          {props.data[i] ? props.data[i].pInfo : ''}
        </td>
      </tr>
    )
    function jump() {
      window.location.replace(
        `http://localhost:3000/productdetail/${
          props.data[i] ? props.data[i].pId : ''
        }`
      )
    }
  }
  console.log('pName: ', pName)
  return (
    <div class="tab-content content favoriteItems" id="content3">
      <div>
        <h3>
          最愛商品
          <br />
        </h3>
        <div class="row favorite">
          <div class="col-md-8">
            <div class="card card-width">
              <div class="card-body">
                <form name="myForm" method="POST" enctype="multipart/form-data">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">商品名稱</th>
                        <th scope="col">商品價格</th>
                        <th scope="col">商品圖</th>
                        <th scope="col">商品資訊</th>
                      </tr>
                    </thead>
                    <tbody>{LoveList}</tbody>
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
  return { data: store.getLoveList }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getLoveList }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(LoveList)
