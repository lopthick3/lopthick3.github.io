import React, { useState, useEffect } from 'react'
import $ from 'jquery'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import {
  getDogData,
  updateServerDog,
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

const DogInfo = (props) => {
  //會員基本資料
  var i = parseInt(localStorage.getItem('mId') - 1)
  // var i = parseInt(document.cookie.slice(4)) - 1
  // var i = parseInt(document.cookie) - 1
  const [dName, setDName] = useState('')
  const [dImg, setDImg] = useState('')
  const [dGender, setDGender] = useState('')
  const [dYear, setDYear] = useState('')
  const [dMonth, setDMonth] = useState('')
  const [dWeight, setDWeight] = useState('')
  const [dInfo, setDInfo] = useState('')
  //default
  const dId = localStorage.getItem('dId')
  const mId = props.data[i] ? props.data[i].mId : ''
  const dNamedefault = props.data[i] ? props.data[i].dName : ''
  const dImgdefault = props.data[i] ? props.data[i].dImg : ''
  const dGenderdefault = props.data[i] ? props.data[i].dGender : ''
  const dYeardefault = props.data[i] ? props.data[i].dYear : ''
  const dMonthdefault = props.data[i] ? props.data[i].dMonth : ''
  const dWeightdefault = props.data[i] ? props.data[i].dWeight : ''
  const dInfodefault = props.data[i] ? props.data[i].dInfo : ''
  console.log('data: ', props.data[i])
  //狗狗基本資料
  const handleSubmit = (e) => {
    const dogInfo = {
      dId,
      mId,
      dName,
      dImg,
      dGender,
      dYear,
      dMonth,
      dWeight,
      dInfo,
    }
    props.updateServerDog(dogInfo)
    alert('更新成功')
  }
  function back() {
    window.location.replace('http://localhost:3000/member/member-info')
  }
  console.log(props.data)
  console.log('dName: ', dNamedefault)
  console.log('dGender: ', dGenderdefault)
  useEffect(() => setDName(dNamedefault), [dNamedefault])

  useEffect(() => setDImg(dImgdefault), [dImgdefault])
  useEffect(() => setDGender(dGenderdefault), [dGenderdefault])
  useEffect(() => setDYear(dYeardefault), [dYeardefault])
  useEffect(() => setDMonth(dMonthdefault), [dMonthdefault])
  useEffect(() => setDWeight(dWeightdefault), [dWeightdefault])
  useEffect(() => setDInfo(dInfodefault), [dInfodefault])
  useEffect(() => {
    props.updateServerDog()
    props.getDogData()
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
  console.log(props.data)
  console.log('dName: ', dNamedefault)
  console.log('dGender: ', dGenderdefault)
  return (
    <div class="tab-content content container" id="content1">
      <div>
        <h3>
          狗狗資訊
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
                        <td class="text-right">狗狗編號</td>
                        <td>
                          <input
                            type="text"
                            name="dId"
                            value={dId}
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
                            value={mId}
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
                            value={dName}
                            class="form-control"
                            onChange={(e) => setDName(e.target.value)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td class="text-right">狗狗性別</td>
                        <td>
                          <input
                            type="text"
                            value={dGender}
                            class="form-control"
                            onChange={(e) => setDGender(e.target.value)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td class="text-right">狗狗年齡</td>
                        <td>
                          <input
                            type="text"
                            name="dWeight"
                            class="form-control"
                            value={dYear}
                            onChange={(e) => setDYear(e.target.value)}
                          />
                        </td>
                        歲
                        <td>
                          <input
                            type="text"
                            name="dInfo"
                            class="form-control"
                            value={dMonth}
                            onChange={(e) => setDMonth(e.target.value)}
                          />
                        </td>
                        月
                      </tr>
                      <tr>
                        <td class="text-right">狗狗體重</td>
                        <td>
                          <input
                            type="text"
                            name="dInfo"
                            class="form-control"
                            value={dWeight}
                            onChange={(e) => setDWeight(e.target.value)}
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
                            value={dInfo}
                            onChange={(e) => setDInfo(e.target.value)}
                          />
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td class="" colspan="6">
                          <div
                            href="./member-updateEdit.php"
                            class="btn  btn-primary"
                            onClick={(e) => handleSubmit(e)}
                          >
                            <i class="fa fa-trash"></i> 修改
                          </div>
                          <div
                            href="./member-updateEdit.php"
                            class="btn  btn-primary"
                            onClick={back}
                          >
                            <i class="fa fa-trash"></i> 返回
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
  return { data: store.getDog }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDogData, updateServerDog }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(DogInfo)
