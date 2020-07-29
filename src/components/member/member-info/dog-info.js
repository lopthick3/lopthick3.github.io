import React, { useState, useEffect } from 'react'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getDogDetail } from '../../../pages/member/actions/index'
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

const DogInfo = (props) => {
  //設定mId的來源,抓到mId去檢索會員的最新訂單(未完成)

  useEffect(() => {
    props.getDogDetail()
  }, [])
  let dogList = []
  for (let i = 0; i < props.data.length; i++) {
    dogList.push(
      <tr className="order_show" onClick="" id={i} name={i}>
        {/* <th scope="row">{i + 1}</th> */}
        <td>{i + 1}</td>
        <td>{props.data[i] ? props.data[i].dName : ''}</td>
        <td>{props.data[i] ? props.data[i].dGender : ''}</td>
        <td>{props.data[i] ? props.data[i].dYear : ''}</td>
        <td>{props.data[i] ? props.data[i].dWeight : ''}</td>
        <td>
          <div className="btn btn-primary dogListBtn" onClick={dogEdit}>
            修改
          </div>
        </td>
        <td>
          <div className="btn btn-primary dogListBtn">刪除</div>
        </td>
      </tr>
    )
    function dogEdit() {
      window.location.replace('http://localhost:3000/dog-edit')
      localStorage.setItem('dId', props.data[i] ? props.data[i].dId : '')
    }
  }
  return (
    <div class="tab-content content dogListContainer" id="content2">
      <div>
        <h3 className="mb-4">
          狗狗資訊
          <Link to="/dog-insert">
            <button className="btn btn-primary dogListBtn pull-right mb-2">
              新增狗狗
            </button>
          </Link>
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
                        <th scope="col">編號</th>
                        <th scope="col">汪汪姓名</th>
                        <th scope="col">性別</th>
                        <th scope="col">年齡</th>
                        <th scope="col">體重</th>
                        <th scope="col">功能</th>
                      </tr>
                    </thead>
                    <tbody>{dogList}</tbody>
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
  return { data: store.getDogDetail }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDogDetail }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DogInfo)
