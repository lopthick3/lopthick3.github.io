import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Row, Col, Pagination } from 'react-bootstrap'
// import { Row, Col, Spinner } from 'react-bootstrap'
import ServiceQuerySearch from '../../components/service/ServiceQuerySearch'
import ServiceQueryList from '../../components/service/ServiceQueryList'
import ServiceQueryMap from '../../components/service/ServiceQueryMap'
import {
  SctollToTop,
  getDataFromServer,
  linkTo,
} from '../../utils/service/ServiceFunction'
import $ from 'jquery'
//引入自己的scss
import '../../css/service/style.scss'

function ServiceQuery(props) {
  //預設頁數
  const currentPage =
    props.match.params.page !== undefined && !isNaN(props.match.params.page)
      ? parseInt(props.match.params.page)
      : 1
  const [users, setUsers] = useState([]) //保姆資料
  const [type, setType] = useState([]) //服務類型(service_type的資料)
  const [size, setSize] = useState([]) //狗狗體型(service_size的資料)
  const [extra, setExtra] = useState([]) //額外服務
  const [nowPage, SetNowPage] = useState(currentPage) //目前頁數
  const [totalPage, SetTotalPage] = useState([]) //總頁數陣列
  const [onChangeChk, setOnChangeChk] = useState(0) //總頁數陣列
  // console.log(CurrentPage)
  //縣市區域
  const [city, setCity] = useState([])

  //頁數變動重新查詢資料
  useEffect(() => {
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
    //找出所有資料
    const totalData = getDataFromServer(
      `http://localhost:6001/service/query/${nowPage}?showTotalPage=Y`
    )
    Promise.resolve(totalData).then((data) => {
      //總頁數
      const totalPageArr = []
      for (let i = 1; i <= Math.ceil(data[0].num / 10); i++) {
        totalPageArr.push(i)
      }
      SetTotalPage(totalPageArr) //設定總頁數陣列
      const nowPageData = getDataFromServer(
        `http://localhost:6001/service/query/${nowPage}`
      )
      Promise.resolve(nowPageData).then((data) => {
        setUsers(data) //帶入使用者資料
        // console.log(nowPage)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowPage])
  //鼠標hover效果
  useEffect(() => {
    $('body').on('mouseenter', '.col-list .sUser', function () {
      let index = $(this).index()
      $('.col-map').find('.google-map-maker').eq(index).addClass('active')
    })
    $('body').on('mouseleave', '.col-list .sUser', function () {
      let index = $(this).index()
      $('.col-map').find('.google-map-maker').eq(index).removeClass('active')
    })
    $('body').on('mouseenter', '.col-map .google-map-maker', function () {
      let index = $(this).parent().index()
      $('.col-list').find('.sUser').eq(index).addClass('active')
    })
    $('body').on('mouseleave', '.col-map .google-map-maker', function () {
      let index = $(this).parent().index()
      $('.col-list').find('.sUser').eq(index).removeClass('active')
    })
  }, [])
  //子元件回傳資料
  const callbackUserData = (child) => {
    setUsers(child)
    setOnChangeChk(onChangeChk + 1)
  }
  //-----篩選功能-----
  //以下為子元件回傳篩選的值
  return (
    <>
      <div className="container pt-3 pb-5">
        <div className="ServiceQuery">
          <Row>
            <Col className="mb-4">
              <ServiceQuerySearch
                sUsers={users}
                sType={type}
                sSize={size}
                sExtra={extra}
                sCity={city}
                sPage={nowPage}
                parentUserData={callbackUserData}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="col-list">
              {users.map((v, i) => (
                <ServiceQueryList
                  sUsers={v}
                  sType={type}
                  onChangeChk={onChangeChk}
                  sTypePrice={JSON.parse(v.sTypePrice)}
                  key={i}
                />
              ))}
              {totalPage.length > 1 ? (
                <Pagination>
                  <Pagination.Prev
                    onClick={() => {
                      SetNowPage(nowPage - 1)
                      linkTo('/service/query/' + (nowPage - 1))
                    }}
                    disabled={nowPage === 1}
                  />
                  {totalPage.map((v, i) => {
                    return (
                      <Pagination.Item
                        key={i}
                        onClick={() => {
                          SetNowPage(i + 1)
                          linkTo('/service/query/' + (i + 1))
                        }}
                        active={currentPage === i + 1}
                      >
                        {v}
                      </Pagination.Item>
                    )
                  })}
                  <Pagination.Next
                    onClick={() => {
                      SetNowPage(nowPage + 1)
                      linkTo('/service/query/' + (nowPage + 1))
                    }}
                    disabled={nowPage === totalPage.length}
                  />
                </Pagination>
              ) : (
                ''
              )}
            </Col>
            <Col lg={6} className="d-none d-lg-block col-map">
              <ServiceQueryMap sUsers={users} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default withRouter(ServiceQuery)
