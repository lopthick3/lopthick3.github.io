import React, { useState, useEffect } from 'react'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getMemberOrderData } from '../../../pages/member/actions/index'
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

const MemberOrderInfo = props => {
  //狗狗基本資料
  // var mId = []
  // var j = parseInt(localStorage.getItem('mId') - 1)
  // for (let n = 0; n <= props.data.length; n++) {
  //   if (j === props.data[n].mId) {
  //     mId += props.data[n].mId
  //   }
  // }
  // console.log('mId: ', mId)
  var i = localStorage.getItem('mId')
  const name = props.data[i] ? props.data[i].name : ''
  const address = props.data[i] ? props.data[i].address : ''
  const card = props.data[i] ? props.data[i].card : ''
  const cart = props.data[i] ? props.data[i].cart : ''
  const created_at = props.data[i] ? props.data[i].created_at : ''
  const mId = props.data[i] ? props.data[i].mId : ''

  useEffect(() => {
    props.getMemberOrderData()
  }, [])

  return (
    <div class="tab-content content" id="content2">
      <div>
        <h3>
          訂單查詢
          <br />
        </h3>
        <div class="row">
          <div class="col-md-8">
            <div class="card card-width">
              <div class="card-body">
                <form
                  name="myForm"
                  method="POST"
                  action="dog-updateEdit.php"
                  enctype="multipart/form-data"
                >
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td class="text-right"></td>
                        <td>
                          <input
                            type="text"
                            name="dId"
                            value="2222"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">狗狗姓名</td>
                        <td>
                          <input
                            type="text"
                            name="dName"
                            value="Sunny"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">主人編號</td>
                        <td>
                          <input
                            type="text"
                            name="mId"
                            value="m001"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">狗狗性別</td>
                        <td>
                          <input
                            type="text"
                            name="dGender"
                            value="girl"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">狗狗年紀</td>
                        <td>
                          <input
                            placeholder="歲"
                            type="text"
                            name="dYear"
                            value="6"
                            class="form-control"
                          />
                        </td>
                        <td>
                          <input
                            placeholder="月"
                            type="text"
                            name="dMonth"
                            value="2"
                            class="form-control"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">狗狗體重</td>
                        <td>
                          <input
                            type="text"
                            name="dWeight"
                            class="form-control"
                            value="4"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">狗狗資訊</td>
                        <td>
                          <input
                            type="text"
                            name="dInfo"
                            class="form-control"
                            value=""
                          />
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td class="" colspan="6">
                          <button
                            href="./member-updateEdit.php"
                            class="btn btn-sm btn-danger"
                          >
                            <i class="fa fa-trash"></i> 修改
                          </button>
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
const mapStateToProps = store => {
  return { data: store.getMemberOrder }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMemberOrderData }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberOrderInfo)
