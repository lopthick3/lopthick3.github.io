import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import Swal from 'sweetalert2'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import {
  getMemberData,
  updateServerMember,
} from '../../../pages/member/actions/index'
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

const MemberInfo = (props) => {
  //會員基本資料
  var i = parseInt(localStorage.getItem('mId') - 1)
  // var i = parseInt(document.cookie.slice(4)) - 1
  // var i = parseInt(document.cookie) - 1
  const [mName, setMName] = useState('')
  const [mAccount, setMAccount] = useState('')
  const [mPassword, setMPassword] = useState('')
  const [mImg, setMImg] = useState('')
  const [mGender, setMGender] = useState('')
  const [mBday, setMBday] = useState('')
  const [mPhone, setMPhone] = useState('')
  const [mEmail, setMEmail] = useState('')
  const [mAddress, setMAddress] = useState('')
  //default
  const mId = props.data[i] ? props.data[i].mId : ''
  const mNamedefault = props.data[i] ? props.data[i].mName : ''
  const mAccountdefault = props.data[i] ? props.data[i].mAccount : ''
  const mPassworddefault = props.data[i] ? props.data[i].mPassword : ''
  const mImgdefault = props.data[i] ? props.data[i].mImg : ''
  const mGenderdefault = props.data[i] ? props.data[i].mGender : ''
  const mBdaydefault = props.data[i] ? props.data[i].mBday : ''
  const mPhonedefault = props.data[i] ? props.data[i].mPhone : ''
  const mEmaildefault = props.data[i] ? props.data[i].mEmail : ''
  const mAddressdefault = props.data[i] ? props.data[i].mAddress : ''
  console.log('data: ', props.data[i])
  //狗狗基本資料
  const handleSubmit = (e) => {
    const memberInfo = {
      mId,
      mName,
      mAccount,
      mPassword,
      mImg,
      mGender,
      mBday,
      mPhone,
      mEmail,
      mAddress,
    }
    props.updateServerMember(memberInfo)
    Swal.fire('修改成功!!', '', 'success')
  }
  //寫入會員資訊
  // function getformInfo(e, info) {
  //   console.log(e.currentTarget.value)

  //   switch (info) {
  //     case 'mName':
  //       memberInfo.mName = e.currentTarget.value
  //       break
  //     case 'mAccount':
  //       memberInfo.mAccount = e.currentTarget.value
  //       break
  //     case 'mPassword':
  //       memberInfo.mPassword = e.currentTarget.value
  //       break
  //     case 'mImg':
  //       memberInfo.mPassword = e.currentTarget.value
  //       break
  //     case 'mGender':
  //       memberInfo.mGender = e.currentTarget.value
  //       break
  //     case 'mBday':
  //       memberInfo.mBday = e.currentTarget.value
  //       break
  //     case 'mPhone':
  //       memberInfo.mPhone = e.currentTarget.value
  //       break
  //     case 'mEmail':
  //       memberInfo.mEmail = e.currentTarget.value
  //       break
  //     case 'mAddress':
  //       memberInfo.mAddress = e.currentTarget.value
  //       break

  //     default:
  //       break
  //   }
  // }

  //建立會員資料
  //建立訂單
  // async function updateMember(form) {
  //   mId = localStorage.getItem('mId')
  //   console.log(JSON.stringify(form))
  //   const req = new Request(`http://localhost:6001/member/update/1}`, {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //     body: JSON.stringify(form),
  //   })
  //   const res = await fetch(req)
  //   const order = await res.json()
  //   await console.log(order)
  // }

  console.log(props.data)
  useEffect(() => setMName(mNamedefault), [mNamedefault])
  useEffect(() => setMAccount(mAccountdefault), [mAccountdefault])
  useEffect(() => setMPassword(mPassworddefault), [mPassworddefault])
  useEffect(() => setMImg(mImgdefault), [mImgdefault])
  useEffect(() => setMGender(mGenderdefault), [mGenderdefault])
  useEffect(() => setMBday(mBdaydefault), [mBdaydefault])
  useEffect(() => setMPhone(mPhonedefault), [mPhonedefault])
  useEffect(() => setMEmail(mEmaildefault), [mEmaildefault])
  useEffect(() => setMAddress(mAddressdefault), [mAddressdefault])
  useEffect(() => {
    props.updateServerMember()
    props.getMemberData()
    // props.getServerMember()
    $('.nav-item').click(function () {
      let effect = $(this).data('effect')
      console.log(effect)
      switch (effect) {
        case 'show1':
          $('#content1').fadeIn()
          $('#content2').fadeOut()
          $('#content3').fadeOut()
          break
        case 'show2':
          $('#content1').fadeOut()
          $('#content2').fadeIn()
          $('#content3').fadeOut()
          break
        case 'show3':
          $('#content1').fadeOut()
          $('#content2').fadeOut()
          $('#content3').fadeIn()
          break
      }
      $('.nav-link').removeClass('active')
      $(this).find('a').addClass('active')
    })
  }, [])

  return (
    <div class="tab-content content memberInfo" id="content1">
      <div>
        <h3>
          個人資訊
          <br />
        </h3>
        <div class="row">
          <div class="col-md-8">
            <div class="card card-width">
              <div class="card-body">
                <form
                  name="myForm"
                  method="POST"
                  // action="dog-updateEdit.php"
                  // enctype="multipart/form-data"
                >
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td class="text-right">會員編號</td>
                        <td>
                          <input
                            type="text"
                            name="dId"
                            value={mId}
                            class="form-control"
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">會員姓名</td>
                        <td>
                          <input
                            type="text"
                            name="dName"
                            value={mName}
                            class="form-control"
                            onChange={(e) => setMName(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">會員帳號</td>
                        <td>
                          <input
                            type="text"
                            name="mId"
                            value={mAccount}
                            class="form-control"
                            onChange={(e) => setMAccount(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">會員密碼</td>
                        <td>
                          <input
                            type="text"
                            name="dGender"
                            value={mPassword}
                            class="form-control"
                            onChange={(e) => setMPassword(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">會員性別</td>
                        <td>
                          <input
                            type="text"
                            value={mGender}
                            class="form-control"
                            onChange={(e) => setMGender(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">會員生日</td>
                        <td>
                          <input
                            type="text"
                            name="dWeight"
                            class="form-control"
                            value={mBday}
                            onChange={(e) => setMBday(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">會員電話</td>
                        <td>
                          <input
                            type="text"
                            name="dInfo"
                            class="form-control"
                            value={mPhone}
                            onChange={(e) => setMPhone(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">會員信箱</td>
                        <td>
                          <input
                            type="text"
                            name="dInfo"
                            class="form-control"
                            value={mEmail}
                            onChange={(e) => setMEmail(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">會員地址</td>
                        <td>
                          <input
                            type="text"
                            name="dInfo"
                            class="form-control"
                            value={mAddress}
                            onChange={(e) => setMAddress(e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td class="" colspan="6">
                          <div
                            href="./member-updateEdit.php"
                            class="btn btn-sm btn-primary pull-right"
                            onClick={(e) => handleSubmit(e)}
                          >
                            <i class="fa fa-trash"></i> 修改
                          </div>
                        </td>
                      </tr>
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
      <div>
        <img src="images/001.png" alt="" />
      </div>
    </div>
  )
}
const mapStateToProps = (store) => {
  return { data: store.getMember }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getMemberData, updateServerMember }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberInfo)
