import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumbs'
import ProductSidebar from './components/ProductSidebar'
import ProductCard from './components/ProductCard'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getProducts, getCategory, getVendor } from './actions/index'
import ReactPlayer from 'react-player'

const Products = (props) => {
  //在App.js設定動態參數
  //設page為URL動態參數page的值
  //在子元件ProductSidebar設定路由為?cName=商品類別和?vName＝廠商名(不需要在App.js設定動態參數)
  //在網址列會顯示?cName=商品類別或vName=廠商名
  // 一開始找商品無分頁得傳姪否則無法顯示
  const page = props.match.params.page || ''
  const [order, setOrder] = useState('')

  useEffect(() => {
    if (props.location.search) {
      if (new URLSearchParams(props.location.search).get('cId')) {
        props.getCategory(page, order)
      } else {
        props.getVendor(page, order)
      }
    } else {
      props.getProducts(page)
    }
  }, [])

  let sort = (
    <div className="d-flex justify-content-between align-items-center my-3">
      <span>共有{props.list.totalRows}項商品</span>
      <select
        onChange={(e) => {
          let orderBy = e.currentTarget.value
          //若有cId就依照cId的商品去排序;若有vId就照vId的商品去排序;若沒就照全部商品
          if (new URLSearchParams(props.location.search).get('cId')) {
            setOrder(orderBy)
            props.getCategory(page, orderBy)
          } else if (new URLSearchParams(props.location.search).get('vId')) {
            setOrder(orderBy)
            props.getVendor(page, orderBy)
          } else {
            setOrder(orderBy)
            props.history.push('/products?orderBy=' + e.currentTarget.value)
            props.getProducts(page, e.currentTarget.value)
          }
        }}
      >
        <option value="timeDesc">依上架時間(近期-早期)</option>
        <option value="timeAsc">依上架時間(早期-近期)</option>
        <option value="priceDesc">依價格高低(高價-低價)</option>
        <option value="priceAsc">依價格高低(低價-高價)</option>
      </select>
    </div>
  )

  //設定分頁
  let pages = []
  for (
    let number = props.list.page - 5;
    number <= props.list.page + 5;
    number++
  ) {
    if (number < 1 || number > props.list.totalPages) continue

    pages.push(
      <Pagination.Item
        key={number}
        //分頁記錄order值才能有用
        onClick={() => {
          if (new URLSearchParams(props.location.search).get('cId')) {
            props.history.push('/products/' + number + props.location.search)
            props.getCategory(number, order)
          } else if (new URLSearchParams(props.location.search).get('vId')) {
            props.history.push('/products/' + number + props.location.search)
            props.getCategory(number, order)
          } else {
            props.history.push('/products/' + number)
            props.getProducts(number, order)
          }
        }}
      >
        {number}
      </Pagination.Item>
    )
  }

  //設定分頁容納節點
  const paginationBasic = (
    <Pagination className="d-flex justify-content-center" size="md">
      <Pagination.First href={'/products/' + 1} />
      <Pagination.Prev
        href={'/products/' + (props.list.page === 1 ? 1 : props.list.page - 1)}
      />
      {pages.slice(0, 10)}
      <Pagination.Next
        href={
          '/products/' +
          (props.list.page === props.list.totalPages
            ? props.list.totalPages
            : props.list.page + 1)
        }
      />
      <Pagination.Last href={'/products/' + props.list.totalPages} />
    </Pagination>
  )

  return (
    <>
      <div className="d-md-flex">
        <ReactPlayer
          className="react-player mx-auto"
          url="https://youtu.be/v73T3eeEcaQ"
          muted
          onReady
          playing
          loop
        />
        <ReactPlayer
          className="react-player mx-auto"
          url="https://youtu.be/JaVptISRJVY"
          muted
          onReady
          playing
          loop
        />
        <ReactPlayer
          className="react-player mx-auto"
          url="https://youtu.be/SKpH2j6wfqs"
          muted
          onReady
          playing
          loop
        />
      </div>
      <Container className="products">
        <Row className="my-5 d-flex justify-content-center">
          <ProductSidebar />
          <Col md={10} className="bg-white">
            {/* <Breadcrumb /> */}
            {sort}
            <Row>
              {props.list.rows &&
                props.list.rows.map((value, index) => {
                  return (
                    <ProductCard key={index} data={props.list.rows[index]} />
                  )
                })}
            </Row>
            {paginationBasic}
          </Col>
        </Row>
      </Container>
    </>
  )
}

//選擇對應的reducer，將其狀態淺拷貝到此元件的props
const mapStateToProps = (store) => {
  return { list: store.getProducts }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getProducts, getCategory, getVendor }, dispatch)
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Products)
)
