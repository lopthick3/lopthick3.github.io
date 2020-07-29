import React, { useState, useEffect } from 'react'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getCommentList } from '../../../pages/member/actions/index'
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

const CommentList = (props) => {
  const [commentList, setCommentList] = useState([])
  //設定mId的來源,抓到mId去檢索會員的最新訂單(未完成)
  const mId = localStorage.getItem('mId')
  async function getOrderDetail(orderId) {
    const req = new Request(`http://localhost:6001/member/comment/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const detail = await res.json()
    console.log(detail)
    CommentList(detail)
  }
  //狗狗基本資料

  useEffect(() => {
    props.getCommentList()
  }, [])
  let CommentListList = []
  for (let i = 0; i < props.data.length; i++) {
    CommentListList.push(
      <tr className="order_show" onClick={jump} id={i} name={i}>
        {/* <th scope="row">{i + 1}</th> */}
        <td>{i + 1}</td>
        <td>{props.data[i] ? props.data[i].id : ''}</td>
        <td>{props.data[i] ? props.data[i].name : ''}</td>
        <td>{props.data[i] ? props.data[i].txt : ''}</td>
        <td>{props.data[i] ? props.data[i].rating : ''}</td>
        <td>
          <div className="btn btn-primary allListBtn" onClick={jump2}>
            評論
          </div>
        </td>
      </tr>
    )
    function jump() {
      window.location.replace(
        `http://localhost:3000/service/detail/${
          props.data[i] ? props.data[i].id : ''
        }`
      )
    }
    function jump2() {
      window.location.replace(
        `http://localhost:3000/service/comment/${
          props.data[i] ? props.data[i].orderId : ''
        }`
      )
      console.log(123)
    }
  }
  return (
    <div class="tab-content content commentList" id="content3">
      <div>
        <h3>
          評論紀錄
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
                        <th scope="col">保姆編號</th>
                        <th scope="col">姓名</th>
                        <th scope="col">評論</th>
                        <th scope="col">評分</th>
                        <th scope="col">功能</th>
                      </tr>
                    </thead>
                    <tbody>{CommentListList}</tbody>
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
  return { data: store.getCommentList }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCommentList }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
