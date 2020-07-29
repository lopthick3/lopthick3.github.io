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
import '../../css/member/member-info.scss'
import MemberSidebar from '../../components/member/member-sidebar'
const DogInsert = (props) => {
  //會員註冊資訊
  const dogInfo = {
    dName: '',
    mId: localStorage.getItem('mId'),
    dImg: '',
    dGender: '',
    dYear: '',
    dMonth: '',
    dWeight: '',
    dInfo: '',
  }
  //寫入會員資訊
  function getformInfo(e, info) {
    console.log(e.currentTarget.value)
    switch (info) {
      case 'dName':
        dogInfo.dName = e.currentTarget.value
        break
      case 'mId':
        dogInfo.mId = localStorage.getItem('mId')
        break
      case 'dImg':
        dogInfo.dImg = e.currentTarget.value
        break
      case 'dGender':
        dogInfo.dGender = e.currentTarget.value
        break
      case 'dYear':
        dogInfo.dYear = e.currentTarget.value
        break
      case 'dMonth':
        dogInfo.dMonth = e.currentTarget.value
        break
      case 'dWeight':
        dogInfo.dWeight = e.currentTarget.value
        break
      case 'dInfo':
        dogInfo.dInfo = e.currentTarget.value
        break

      default:
        break
    }
  }
  //建立會員資料
  //建立訂單
  async function insertDog(form) {
    if (
      $('#dname').val() !== '' &&
      $('#dGender').val() !== '' &&
      $('#dYear').val() !== '' &&
      $('#dMonth').val() !== '' &&
      $('#dWeight').val() !== '' &&
      $('#dInfo').val() !== ''
    ) {
      console.log(JSON.stringify(form))
      const req = new Request('http://localhost:6001/dog/insert', {
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
      window.location.replace('http://localhost:3000/member/member-info/', 2000)
    } else {
      $('.dog-confirm')
        .removeClass('disappear')
        .addClass('appear')
        .text('名字不能為空')
      return false
    }
  }

  return (
    <>
      <div className="dogDetailContainer d-flex">
        <div>
          <img
            className="side_dog"
            src={require('../../images/member/side-dog.webp')}
            alt="Background"
          />
        </div>
        <div className="container dog-insert">
          <div class="tab-content content" id="content1">
            <div>
              <h3>
                狗狗登錄
                <br />
              </h3>

              <div class="row">
                <div class="col-md-8">
                  <div className="dog-confirm alert-danger disappear"></div>
                  <div class="card card-width">
                    <div class="card-body">
                      <form>
                        <div class="form-group d-flex">
                          <label>狗狗姓名</label>
                          <input
                            type="text"
                            class="form-control"
                            id="dName"
                            name="dName"
                            placeholder="請輸入姓名"
                            onChange={(e) => getformInfo(e, 'dName')}
                          />
                        </div>
                        <div class="form-group d-flex">
                          <label>性別</label>
                          <select
                            type="text"
                            class="form-control"
                            id="dGender"
                            name="dGender"
                            onChange={(e) => getformInfo(e, 'dGender')}
                            placeholder="請選擇性別"
                          >
                            <option value="">請選擇</option>
                            <option value="male">boy</option>
                            <option value="female">girl</option>
                          </select>
                        </div>

                        <div class="form-group d-flex ">
                          <label>年紀</label>
                          <div>
                            <div className="d-flex">
                              <input
                                type="number"
                                class="form-control"
                                id="dYear"
                                name="dYear"
                                onChange={(e) => getformInfo(e, 'dYear')}
                                placeholder="請輸入年"
                              />
                              年
                              <input
                                type="number"
                                class="form-control"
                                id="dMonth"
                                name="dMonth"
                                onChange={(e) => getformInfo(e, 'dMonth')}
                                placeholder="請輸入月"
                              />
                              月
                            </div>
                          </div>
                        </div>
                        <div class="form-group d-flex">
                          <label>體重</label>
                          <input
                            type="number"
                            class="form-control"
                            id="dWeight"
                            name="dWeight"
                            onChange={(e) => getformInfo(e, 'dWeight')}
                            placeholder="請輸入體重"
                          />
                        </div>
                        <div class="form-group d-flex">
                          <label>狗狗資訊</label>
                          <input
                            type="textbox"
                            class="form-control"
                            id="dInfo"
                            name="dInfo"
                            onChange={(e) => getformInfo(e, 'dInfo')}
                            placeholder="請輸入狗狗資訊"
                          />
                        </div>

                        <div
                          type="submit"
                          class="btn btn-primary dogInsertSumbit pull-right"
                          onClick={() => {
                            insertDog(dogInfo)
                          }}
                        >
                          送出
                        </div>
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
      </div>
    </>
  )
}

export default withRouter(DogInsert)
