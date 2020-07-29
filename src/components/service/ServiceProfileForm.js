import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Form, Row, Col } from 'react-bootstrap'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { MdFileUpload } from 'react-icons/md'
import {
  SctollToTop,
  getDataFromServer,
  handleFormValue,
  handleFormValueMatch,
} from '../../utils/service/ServiceFunction'
import Swal from 'sweetalert2'
import $ from 'jquery'
import axios from 'axios'
//引入自己的scss
// import '../../../css/service/style.scss'

function ServiceProfileForm(props) {
  //模擬session登入後的會員ID
  //此時必須是service_user已有此筆資料
  const sUserId = props.sUserId
  const sMemberId = props.sMemberId
  // const [userId, setUserId] = useState() //服務者ID
  const [type, setType] = useState([]) //服務類型(service_type的資料)
  const [size, setSize] = useState([]) //狗狗體型(service_size的資料)
  const [extra, setExtra] = useState([]) //額外服務
  const [users, setUsers] = useState([]) //保姆資料(service_user的資料)
  const [avatar, setAvatar] = useState([]) //照片(service_photo的資料)
  const [album, setAlbum] = useState([]) //照片(service_photo的資料)
  const [albumImg, setAlbumImg] = useState('') //照片(service_photo的資料)
  const [member, setMember] = useState([]) //會員(member的資料)
  //設定custom checkbox的ref(偵測是否完全載入)
  const customCheckRef = React.createRef()
  //設定自訂驗證提示
  const [customValid, setCustomValid] = useState(false)
  //檢查自訂欄位格式
  const [customFormat, setCustomFormat] = useState(true)

  //備註最大字數限制
  const remarkMaxLengthLimit = 500
  const [remarkLength, setRemarkLength] = useState(0)

  //縣市區域
  const [city, setCity] = useState([])
  const [dist, setDist] = useState([])

  //-----預設取得原有資料-----
  useEffect(() => {
    //返回最頂端
    SctollToTop()
    //取得額外服務
    const sExtra = getDataFromServer('http://localhost:6001/service/extra')
    Promise.resolve(sExtra).then((data) => {
      setExtra(data)
    })
    //取得狗狗體型
    const dogSize = getDataFromServer('http://localhost:6001/service/size')
    Promise.resolve(dogSize).then((data) => {
      setSize(data)
    })
    //取得服務類型資料
    const sTypeData = getDataFromServer('http://localhost:6001/service/type')
    Promise.resolve(sTypeData).then((data) => {
      setType(data)
    })
    //取得縣市資料
    const city = getDataFromServer('http://localhost:6001/service/zipcode/city')
    Promise.resolve(city).then((data) => {
      setCity(data)
    })
    //取得個別保姆資料
    const data = getDataFromServer(
      `http://localhost:6001/service/user/${sUserId}?dataSts=Y`
    )
    Promise.resolve(data).then((data) => {
      //如果查詢有使用者資料則帶入資料(偵測產生sId值後才產出資料)
      if (data.length !== 0) {
        setUsers(data[0])
      } else {
        //否則為空物件
        setUsers({})
      }
      //取得大頭貼資料
      const sAvatar = getDataFromServer(
        'http://localhost:6001/service/photo/' + sMemberId + '?category=1'
      )
      Promise.resolve(sAvatar).then((data) => {
        setAvatar(data)
      })
      //取得相簿資料
      const sAlbum = getDataFromServer(
        'http://localhost:6001/service/photo/' + sMemberId + '?category=2'
      )
      Promise.resolve(sAlbum).then((data) => {
        setAlbum(data)
      })
      //取得會員資料
      const memberData = getDataFromServer(
        `http://localhost:6001/service/member?mId=${props.sMemberId}`
      )
      Promise.resolve(memberData).then((data) => {
        setMember(data)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sUserId])
  //-----表單驗證-----
  //處理項目勾選時價格欄位的屬性(onChange)
  function handlePriceDaisbled(e) {
    let checked = $(e.target).prop('checked')
    $(e.target)
      .closest('.serviceType')
      .find("input[name='servicePrice[]']")
      .attr({ disabled: !checked, required: checked })
  }
  //處理填入價格資料並回傳users的值
  function handleTypePrice(e) {
    let typePriceArr = []
    $(":checkbox:checked[name='serviceType[]']").each(function (i) {
      typePriceArr.push({
        sTypeId: $(this).val(),
        sPrice: $(this)
          .closest('.serviceTypeCheckbox')
          .next()
          .find('input')
          .val(),
      })
    })
    users.sTypePrice = JSON.stringify(typePriceArr)
  }
  //checkbox處理至少選一項
  function handleNoChecked(e) {
    let el = e.target.name,
      noChecked = true
    for (let i = 0; i < $(`:checkbox[name='${el}']`).length; i++) {
      if ($(`:checkbox[name='${el}']`).eq(i).prop('checked')) {
        noChecked = false
        break
      }
    }
    //全未勾選則至少需選一項
    $(`:checkbox[name='${el}']`).attr('required', noChecked)
    $(`#${el.replace(/\[\]/, '')}Msg`).toggleClass('d-block', noChecked)
    setCustomValid(noChecked)
  }
  //處理體型資料回傳
  function handleSize(e) {
    let sizeArr = []
    $(":checkbox:checked[name='sSizeId[]']").each(function (i) {
      sizeArr.push($(this).val())
    })
    users.sSizeId = sizeArr.toString()
  }
  //處理額外服務資料回傳
  function handleExtra(e) {
    let extraArr = []
    $(":checkbox:checked[name='sExtra[]']").each(function (i) {
      extraArr.push($(this).val())
    })
    users.sExtra = extraArr.toString()
  }
  //選擇縣市
  function handleChangeCity(cityValue) {
    const city = getDataFromServer(
      `http://localhost:6001/service/zipcode/city/'${cityValue}'`
    )
    Promise.resolve(city).then((data) => {
      setDist(data)
    })
  }
  //-----取得預設區域-----
  useEffect(() => {
    //取得原有區域資料
    const dist = getDataFromServer(
      `http://localhost:6001/service/zipcode/city/'${users.sCity}'`
    )
    Promise.resolve(dist).then((data) => {
      setDist(data)
    })
  }, [users.sCity])
  //-----表單狀態完全render完成-----
  useEffect(() => {
    //處理資料預設屬性,抓取原有陣列資料並渲染
    //項目與價格
    let sTypePriceArr = users.sTypePrice ? JSON.parse(users.sTypePrice) : []
    // eslint-disable-next-line array-callback-return
    sTypePriceArr.map((v) => {
      $(`:checkbox[name='serviceType[]']`).attr('required', false)
      let el = $(`:checkbox[name='serviceType[]'][value='${v.sTypeId}']`)
      $(el).prop('checked', true)
      $(el)
        .closest('.serviceTypeCheckbox')
        .next()
        .find('input')
        .val(v.sPrice)
        .attr({ disabled: false, required: true })
    })
    //體型
    let sSizeId = users.sSizeId ? users.sSizeId.split(',') : []
    // eslint-disable-next-line array-callback-return
    sSizeId.map((v) => {
      $(`:checkbox[name='sSizeId[]']`).attr('required', false)
      let el = $(`:checkbox[name='sSizeId[]'][value='${v}']`)
      $(el).prop('checked', true)
    })
    //額外項目
    let sExtra = users.sExtra ? users.sExtra.split(',') : []
    // eslint-disable-next-line array-callback-return
    sExtra.map((v) => {
      let el = $(`:checkbox[name='sExtra[]'][value='${v}']`)
      $(el).prop('checked', true)
    })
    //相簿
    if (album.length !== 0) {
      let albumImg = ''
      album.forEach(function (v, i) {
        albumImg += `<figure><img src="http://localhost:6001/uploads/service/album/${v.fileName}.${v.fileType}"></figure>`
      })
      setAlbumImg(albumImg)
    }

    //設定回傳父元件資料
    props.parentUserData(users)
    props.parentCustomValidated(customValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customCheckRef])

  //-----圖片上傳-----
  //大頭貼單張圖片上傳
  const [selectedSingleFile, SetSelectedSingleFile] = useState(null)
  const addFileSingle = (event) => {
    // console.log(event.target.files[0])
    if (checkMimeType(event)) {
      //檢查類型
      SetSelectedSingleFile(event.target.files[0])

      //即時預覽圖片
      if (event.target.files && event.target.files[0]) {
        let reader = new FileReader()
        reader.onload = function (e) {
          $('.avatar-preview figure img').remove()
          $('.avatar-preview figure').append(`<img src="${e.target.result}">`)
        }
        reader.readAsDataURL(event.target.files[0])
        $('.avatar-preview .text').hide()
      } else {
        $('.avatar-preview .text').show()
        SetSelectedSingleFile(null)
      }
    }
  }
  const uploadFileSingle = () => {
    const data = new FormData()
    data.append('file', selectedSingleFile)
    axios
      .post('http://localhost:6001/serviceAvatar/avatar/' + sMemberId, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res)
        Swal.fire({
          title: '上傳成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
      })
    //寫入驗證
    users.isConfirmed = 'Y'
  }
  //相簿多張圖片上傳
  const [selectedMutiFile, SetSelectedMutiFile] = useState(null)
  const addFileMuti = (event) => {
    const files = event.target.files
    if (checkMimeType(event)) {
      //檢查類型
      if (maxSelectFile(event)) {
        //檢查檔案數量限制
        // if return true allow to setState
        SetSelectedMutiFile(event.target.files)
        //即時預覽圖片
        if (event.target.files && event.target.files[0]) {
          $('.album-preview figure').remove()
          console.log($('.album-preview figure'))
          for (let i = 0; i < files.length; i++) {
            let reader = new FileReader()
            reader.onload = function (e) {
              // console.log(e.target.result)
              $('.album-preview').append(
                `<figure><img src="${e.target.result}"></figure>`
              )
            }
            reader.readAsDataURL(files[i])
          }
        } else {
          SetSelectedMutiFile(null)
        }
      }
    }
  }
  const uploadFileMuti = () => {
    const data = new FormData()
    for (let x = 0; x < selectedMutiFile.length; x++) {
      data.append('file', selectedMutiFile[x])
    }

    axios
      .post('http://localhost:6001/serviceAlbum/album/' + sMemberId, data, {
        // receive two    parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText)
        Swal.fire({
          title: '上傳成功',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        })
      })
  }
  //限制檔案上傳數量
  const maxSelectFile = (event) => {
    let files = event.target.files // create file object
    if (files.length > 10) {
      Swal.fire({
        title: '上傳圖片上限為10個檔案',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500,
      })
      event.target.value = null // discard selected file
      return false
    }
    return true
  }
  //限制檔案上傳類型
  const checkMimeType = (event) => {
    //getting file object
    let files = event.target.files
    //define message container
    let err = ''
    // list allow mime type
    const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for (let x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every((type) => files[x].type !== type)) {
        // create error message and assign to container
        Swal.fire({
          title: `${(err += files[x].type)}檔案格式錯誤`,
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    }
    if (err !== '') {
      // if message not same old that mean has error
      event.target.value = null // discard selected file
      console.log(err)
      return false
    }
    return true
  }
  useEffect(() => {
    //大頭照判斷顯示
    let avatarImg = $('.avatar-preview figure img')
    if (avatar.length !== 0) {
      avatarImg.attr(
        'src',
        `http://localhost:6001/uploads/service/avatar/${avatar[0].fileName}.${avatar[0].fileType}`
      )
    } else {
      avatarImg.attr(
        'src',
        'http://localhost:6001/uploads/service/avatar/placeholder.png'
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar])

  //帶入會員資料
  const memberDefaultData = (e) => {
    if ($(e.target).prop('checked')) {
      //寫入陣列
      users.sName = member[0].mName
      users.sPhone = member[0].mPhone
      users.sEmail = member[0].mEmail
      //欄位值寫入
      $("input[name='sName'").val(member[0].mName)
      $("input[name='sPhone'").val(member[0].mPhone)
      $("input[name='sEmail'").val(member[0].mEmail)
    } else {
      users.sName = ''
      users.sPhone = ''
      users.sEmail = ''
      $("input[name='sName'").val('')
      $("input[name='sPhone'").val('')
      $("input[name='sEmail'").val('')
    }
    return
  }

  return (
    <>
      <h5>
        保姆基本資料
        {props.isApply ? (
          <small className="inline-block-memberDefaultData ml-3">
            <Form.Check
              custom
              name="memberDefaultData"
              type="checkbox"
              id="memberDefaultData"
              className="text-muted"
              label="帶入會員資料"
              onChange={memberDefaultData}
            />
          </small>
        ) : (
          ''
        )}
      </h5>
      <hr className="title" />
      <div className="pb-4 px-0">
        <Form.Group as={Row} controlId="sName">
          <Form.Label column sm="3" className="required">
            名稱
          </Form.Label>
          <Col sm="9">
            <Form.Control
              name="sName"
              type="text"
              placeholder="請填入名稱"
              required
              defaultValue={users.sName}
              onChange={(e) => handleFormValue(e, users)}
            />
            <Form.Control.Feedback type="invalid">
              請填入名稱
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="sPhone">
          <Form.Label column sm="3" className="required">
            手機
          </Form.Label>
          <Col sm="9">
            <Form.Control
              name="sPhone"
              type="text"
              placeholder="請填入手機"
              required
              // pattern="09\d{2}\-?\d{3}\-?\d{3}"
              defaultValue={users.sPhone}
              onChange={(e) =>
                setCustomFormat(
                  handleFormValueMatch(
                    e,
                    '^09[0-9]{2}-?[0-9]{3}-?[0-9]{3}$',
                    users
                  )
                )
              }
              isInvalid={!customFormat}
              onBlur={(e) => (!customFormat ? (e.target.value = '') : '')}
            />
            <Form.Control.Feedback type="invalid">
              請填入手機格式 (09xx-xxx-xxx)
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="sEmail">
          <Form.Label column sm="3" className="required">
            Email
          </Form.Label>
          <Col sm="9">
            <Form.Control
              name="sEmail"
              type="email"
              placeholder="請填入Email"
              required
              defaultValue={users.sEmail}
              onChange={(e) => handleFormValue(e, users)}
            />
            <Form.Control.Feedback type="invalid">
              請填入正確Email格式
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3" className="required">
            地址
          </Form.Label>
          <Col sm="9" className="d-flex flex-column flex-lg-row">
            <div className="mr-lg-1 mb-2 mb-lg-0">
              <Form.Control
                as="select"
                name="sCity"
                required
                onChange={(e) => {
                  handleChangeCity(e.target.value)
                  handleFormValue(e, users)
                }}
                value={users.sCity}
              >
                <option value="">縣市</option>
                {city.map((v, i) => (
                  <option key={i} value={v.City}>
                    {v.City}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                請選擇縣市
              </Form.Control.Feedback>
            </div>
            <div className="mr-lg-1 mb-2 mb-lg-0">
              <Form.Control
                as="select"
                name="sDist"
                required
                onChange={(e) => {
                  handleFormValue(e, users)
                }}
                defaultValue=""
              >
                <option value="">區域</option>
                {dist.map((v, i) => (
                  <option
                    key={i}
                    value={v.Area}
                    selected={v.Area === users.sDist}
                  >
                    {v.Area}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                請選擇區域
              </Form.Control.Feedback>
            </div>
            <div className="flex-grow-1">
              <Form.Control
                name="sAddr"
                type="text"
                placeholder="請填入地址"
                required
                defaultValue={users.sAddr}
                onChange={(e) => handleFormValue(e, users)}
              />
              <Form.Control.Feedback type="invalid">
                請填入正確地址
              </Form.Control.Feedback>
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="avatar">
          <Form.Label column sm="3">
            頭像
          </Form.Label>
          <Col sm="9">
            <div className="custom-file">
              <div className="form-group files mb-0">
                <input
                  type="file"
                  className="form-control"
                  onChange={addFileSingle}
                  multiple=""
                />
              </div>
              <button
                type="button"
                className="btn btn-sm btn-info btn-block"
                onClick={uploadFileSingle}
                disabled={selectedSingleFile === null}
              >
                <MdFileUpload />
                上傳
              </button>
              <div className="my-2 text-info avatar-preview">
                <figure className="mb-1">
                  <img alt="" />
                </figure>
                <span className="text">
                  {avatar.length === 0 ? (
                    <>
                      <AiOutlineExclamationCircle className="mr-1 mb-1" />
                      上傳頭像以完成驗證
                    </>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            </div>
          </Col>
        </Form.Group>
      </div>
      <h5>服務內容</h5>
      <hr className="title" />
      <div className="pb-4 px-0">
        <Form.Group as={Row} controlId="sTitle">
          <Form.Label column sm="3" className="required">
            服務標題
          </Form.Label>
          <Col sm="9">
            <Form.Control
              name="sTitle"
              type="text"
              placeholder="請填入服務標題"
              required
              defaultValue={users.sTitle}
              onChange={(e) => handleFormValue(e, users)}
            />
            <Form.Control.Feedback type="invalid">
              請填入服務標題
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="sYear">
          <Form.Label column sm="3" className="required">
            服務年資
          </Form.Label>
          <Col sm="9">
            <Form.Control
              name="sYear"
              type="number"
              placeholder="請填入服務年資"
              required
              max="99"
              min="1"
              defaultValue={users.sYear}
              onChange={(e) => handleFormValue(e, users)}
            />
            <Form.Control.Feedback type="invalid">
              請填入服務年資 (1-99)
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="sInfo">
          <Form.Label column sm="3" className="required">
            服務說明
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              name="sInfo"
              rows="10"
              required
              maxLength={remarkMaxLengthLimit}
              placeholder={`最多${remarkMaxLengthLimit}個字`}
              defaultValue={users.sInfo}
              onChange={(e) => {
                setRemarkLength(e.target.value.length)
                return handleFormValue(e, users)
              }}
            />
            <Form.Control.Feedback type="invalid">
              請填入服務說明
            </Form.Control.Feedback>
            <div>
              {remarkLength
                ? '還可輸入' + (remarkMaxLengthLimit - remarkLength) + '個字'
                : ''}
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="photo">
          <Form.Label column sm="3">
            相片上傳
          </Form.Label>
          <Col sm="9">
            <div className="custom-file d-inline">
              {/* <input
                type="file"
                name="photo"
                className="custom-file-input"
                id="photo"
                multiple
              />
              <label
                className="custom-file-label"
                htmlFor="photo"
                data-browse="選擇"
              >
                請選擇檔案
              </label> */}
              <div className="form-group files multiple mb-0">
                <input
                  type="file"
                  className="form-control"
                  onChange={addFileMuti}
                  multiple
                />
              </div>
              <button
                type="button"
                className="btn btn-sm btn-info btn-block"
                onClick={uploadFileMuti}
                disabled={selectedMutiFile === null}
              >
                <MdFileUpload />
                上傳
              </button>
              <div
                className="my-2 album-preview"
                dangerouslySetInnerHTML={{ __html: albumImg }}
              ></div>
            </div>
          </Col>
        </Form.Group>
      </div>
      <h5>服務項目</h5>
      <hr className="title" />
      <div className="pb-4 px-0">
        <Form.Group as={Row}>
          <Form.Label column sm="3" className="required">
            <span>項目與價格</span>
          </Form.Label>
          <Col sm="9">
            {type.map((v, i) => (
              <Row key={i} className="serviceType py-2">
                <Col className="mb-2 serviceTypeCheckbox">
                  <Form.Check
                    custom
                    name="serviceType[]"
                    type="checkbox"
                    required
                    id={`serviceType${i}`}
                    label={v.sTypeName}
                    value={v.sTypeId}
                    onChange={(e) => {
                      handlePriceDaisbled(e)
                      handleTypePrice(e)
                      handleNoChecked(e)
                    }}
                    // defaultChecked={serviceTypeChk}
                    ref={customCheckRef}
                  />
                  <small className="text-muted">{v.sTypeInfo}</small>
                </Col>
                <Col className="mb-2 servicePriceInput">
                  <Form.Control
                    name="servicePrice[]"
                    type="number"
                    id={`servicePrice${i}`}
                    placeholder="每小時服務價格"
                    onChange={(e) => {
                      handleTypePrice(e)
                    }}
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">
                    請輸入服務價格
                  </Form.Control.Feedback>
                </Col>
              </Row>
            ))}
            <div className="invalid-feedback" id="serviceTypeMsg">
              請勾選至少一項
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3" className="required">
            <span>體型</span>
          </Form.Label>
          <Col sm="9">
            <Row>
              {size.map((v, i) => (
                <Col md={6} key={i} className="mb-1 py-2">
                  <Form.Check
                    custom
                    name="sSizeId[]"
                    type="checkbox"
                    required
                    id={`sSizeId${i}`}
                    label={`${v.sizeName} (${v.sizeWeight})`}
                    value={v.sizeId}
                    ref={customCheckRef}
                    onChange={(e) => {
                      handleSize(e)
                      handleNoChecked(e)
                    }}
                    // isInvalid
                  />
                </Col>
              ))}
            </Row>
            <div className="invalid-feedback" id="sSizeIdMsg">
              請勾選至少一項
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            提供額外服務
          </Form.Label>
          <Col sm="9">
            <Row>
              {extra.map((v, i) => (
                <Col md={6} key={i} className="py-2">
                  <Form.Check
                    custom
                    name="sExtra[]"
                    type="checkbox"
                    id={`sExtra${i}`}
                    label={v.extraName}
                    value={v.extraId}
                    ref={customCheckRef}
                    onChange={(e) => handleExtra(e)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Form.Group>
        <input type="hidden" name="lat" />
        <input type="hidden" name="lng" />
      </div>
    </>
  )
}

export default withRouter(ServiceProfileForm)
