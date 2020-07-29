import React from 'react'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getMemberData } from './actions/index'
import {
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import MemberSidebar from '../../components/member/member-sidebar'
const MemberUpdate = props => {
  //會員註冊資訊
  const memberInfo = {
    mName: '',
    mAccount: '',
    mPassword: '',
    mImg: '',
    mGender: '',
    mBday: '',
    mPhone: '',
    mEmail: '',
    mAddress: '',
  }
  //寫入會員資訊
  function getformInfo(e, info) {
    console.log(e.currentTarget.value)
    switch (info) {
      case 'mName':
        memberInfo.mName = e.currentTarget.value
        break
      case 'mAccount':
        memberInfo.mAccount = e.currentTarget.value
        break
      case 'mPassword':
        memberInfo.mPassword = e.currentTarget.value
        break
      case 'mImg':
        memberInfo.mPassword = e.currentTarget.value
        break
      case 'mGender':
        memberInfo.mGender = e.currentTarget.value
        break
      case 'mBday':
        memberInfo.mBday = e.currentTarget.value
        break
      case 'mPhone':
        memberInfo.mPhone = e.currentTarget.value
        break
      case 'mEmail':
        memberInfo.mEmail = e.currentTarget.value
        break
      case 'mAddress':
        memberInfo.mAddress = e.currentTarget.value
        break

      default:
        break
    }
  }
  //建立會員資料
  //建立訂單
  async function updateMember(form) {
    console.log(JSON.stringify(form))
    const req = new Request('http://localhost:6001/member/update/:mId?', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(form),
    })
    const res = await fetch(req)
    const order = await res.json()
    await console.log(order)
  }
  return (
    <>
      <div className="container">
        <div class="tab-content content" id="content1">
          <div>
            <h3>
              會員註冊
              <br />
            </h3>
            <div class="row">
              <div class="col-md-8">
                <div class="card card-width">
                  <div class="card-body">
                    <form>
                      <div class="form-group">
                        <label>姓名</label>
                        <input
                          type="text"
                          class="form-control"
                          id="mName"
                          name="mName"
                          placeholder="請輸入姓名"
                          onChange={e => getformInfo(e, 'mName')}
                        />
                      </div>
                      <div class="form-group">
                        <label>帳號</label>
                        <input
                          type="text"
                          class="form-control"
                          id="mAccount"
                          name="mAccount"
                          onChange={e => getformInfo(e, 'mAccount')}
                          placeholder="請輸入帳號"
                        />
                      </div>
                      <div class="form-group">
                        <label>密碼</label>
                        <input
                          type="text"
                          class="form-control"
                          id="mPassword"
                          name="mPassword"
                          onChange={e => getformInfo(e, 'mPassword')}
                          placeholder="請輸入密碼"
                        />
                      </div>
                      <div class="form-group">
                        <label>性別</label>
                        <select
                          type="text"
                          class="form-control"
                          id="mGender"
                          name="mGender"
                          onChange={e => getformInfo(e, 'mGender')}
                          placeholder="請選擇性別"
                        >
                          <option value="">請選擇</option>
                          <option value="male">male</option>
                          <option value="female">female</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label>生日</label>
                        <input
                          type="date"
                          class="form-control"
                          id="mBday"
                          name="mBday"
                          onChange={e => getformInfo(e, 'mBday')}
                          placeholder="請輸入生日"
                        />
                      </div>
                      <div class="form-group">
                        <label>電話</label>
                        <input
                          type="text"
                          class="form-control"
                          id="mPhone"
                          name="mPhone"
                          onChange={e => getformInfo(e, 'mPhone')}
                          placeholder="請輸入電話"
                        />
                      </div>
                      <div class="form-group">
                        <label>信箱</label>
                        <input
                          type="email"
                          class="form-control"
                          id="mEmail"
                          name="mEmail"
                          onChange={e => getformInfo(e, 'mEmail')}
                          placeholder="請輸入信箱"
                        />
                      </div>
                      <div class="form-group">
                        <label>地址</label>
                        <input
                          type="text"
                          class="form-control"
                          id="mAddress"
                          name="mAddress"
                          onChange={e => getformInfo(e, 'mAddress')}
                          placeholder="請輸入地址"
                        />
                      </div>

                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={() => {
                          updateMember(memberInfo)
                        }}
                      >
                        送出
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
          <div>
            <img src="images/001.png" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberUpdate)
