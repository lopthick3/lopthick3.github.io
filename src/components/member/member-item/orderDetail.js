import React from 'react'
import { Pagination } from 'react-bootstrap'
import { ReactDOM } from 'react-dom'
//redux
import { connect } from 'react-redux'
//action
import { bindActionCreators } from 'redux'
import { getMemberOrderDataDetail } from '../../../pages/member/actions/index'
const orderDetail = () => {
  let order = []
  for (let number = 1; number <= 5; number++) {
    order.push(<th key={number}>{number}</th>)
  }

  const paginationBasic = (
    <tr className="d-flex justify-content-center" size="md">
      {order}
    </tr>
  )
  return paginationBasic
}
const mapStateToProps = store => {
  return { data: store.getMemberOrderDetail }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMemberOrderDataDetail }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(orderDetail)
