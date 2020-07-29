import React from 'react'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'
import Swal from 'sweetalert2'
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
import '../../css/member/member-register.scss'
import MemberSidebar from '../../components/member/member-sidebar'
const MemberRegister = (props) => {
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
  async function insertMember(form) {
    console.log(JSON.stringify(form))
    if ($('#mName').val() === '') {
      alert('姓名不得為空')
      return false
    } else if ($('#mAccount').val() === '') {
      alert('帳號不得為空')
      return false
    } else if ($('#mPassword').val() === '') {
      alert('密碼不得為空')
      return false
    } else if ($('#mEmail').val() === '') {
      alert('信箱不得為空')
      return false
    } else {
      const req = new Request('http://localhost:6001/member/insert', {
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
      Swal.fire('註冊成功!!', '即將跳轉登入頁', 'success')
      window.location.replace('http://localhost:3000/login/', 2000)
    }
    return true
  }
  $('.back_2_login').click(function () {
    window.location.replace('http://localhost:3000/login/', 2000)
  })
  // register_submit
  return (
    <>
      <div className="member-register d-flex">
        <div className="imgContainer">
          <img
            className="side_dog"
            src={require('../../images/member/side-dog.webp')}
            alt="Background"
          />
        </div>
        <div className="container register_container">
          <h3>
            會員註冊
            <br />
          </h3>
          <div class="row">
            <div class="col-md-8">
              <form>
                <div class="form-group d-flex text-container">
                  <label>姓名</label>

                  <input
                    type="text"
                    class="form-control"
                    id="mName"
                    name="mName"
                    // disabled
                    placeholder="王小明"
                    onChange={(e) => getformInfo(e, 'mName')}
                  />
                </div>
                <div class="form-group d-flex text-container">
                  <label>帳號</label>
                  <input
                    type="text"
                    class="form-control"
                    id="mAccount"
                    name="mAccount"
                    onChange={(e) => getformInfo(e, 'mAccount')}
                    placeholder="請輸入帳號"
                  />
                </div>
                <div class="form-group d-flex text-container">
                  <label>密碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="mPassword"
                    name="mPassword"
                    onChange={(e) => getformInfo(e, 'mPassword')}
                    placeholder="請輸入密碼"
                  />
                </div>
                <div class="form-group d-flex text-container">
                  <label>性別</label>
                  <select
                    type="text"
                    class="form-control"
                    id="mGender"
                    name="mGender"
                    onChange={(e) => getformInfo(e, 'mGender')}
                    placeholder="請選擇性別"
                  >
                    <option value="">請選擇</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>

                  {/* <input
                  type="checkbox"
                  class="form-control"
                  id="mGender"
                  name="mGender"
                  onChange={(e) => getformInfo(e, 'mGender')}
                  placeholder="請選擇性別"
                />
                <label for="mGender" value="male">
                  male
                </label>
                <label for="mGender1" value="female">
                  female
                </label> */}
                </div>
                <div class="form-group d-flex text-container">
                  <label>生日</label>
                  <input
                    type="date"
                    class="form-control"
                    id="mBday"
                    name="mBday"
                    onChange={(e) => getformInfo(e, 'mBday')}
                    placeholder="請輸入生日"
                  />
                </div>
                <div class="form-group d-flex text-container">
                  <label>電話</label>
                  <input
                    type="text"
                    class="form-control"
                    id="mPhone"
                    name="mPhone"
                    onChange={(e) => getformInfo(e, 'mPhone')}
                    placeholder="請輸入電話"
                  />
                </div>
                <div class="form-group d-flex text-container">
                  <label>信箱</label>
                  <input
                    type="email"
                    class="form-control"
                    id="mEmail"
                    name="mEmail"
                    onChange={(e) => getformInfo(e, 'mEmail')}
                    placeholder="請輸入信箱"
                  />
                </div>
                <div class="form-group d-flex text-container">
                  <label>地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="mAddress"
                    name="mAddress"
                    onChange={(e) => getformInfo(e, 'mAddress')}
                    placeholder="請輸入地址"
                  />
                </div>

                <div
                  type="submit"
                  class="btn btn-primary register_submit pull-right"
                  onClick={() => {
                    insertMember(memberInfo)
                  }}
                >
                  送出
                </div>
                {/* <div type="button" className="btn btn-info back_2_login">
                返回登入
              </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div>
        <img src="images/001.png" alt="" />
      </div>
    </>
  )
}

export default withRouter(MemberRegister)
