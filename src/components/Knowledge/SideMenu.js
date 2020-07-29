import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { IconContext } from 'react-icons'

//redux
import { connect } from 'react-redux'
//action 抓資料
import { bindActionCreators } from 'redux'
import { getBlog } from './actions/index'

function SideMenu() {
  const [newType, setNewType] = useState('')
  function changeType(newType) {
    setNewType(newType)
  }
  return (
    <>
      <div className="mt-3 text-center">
        <h4 className="r">全部分類</h4>
        <br></br>
        <div className="sidebar mr-4 ml-4">
          <Link>
            <p className="1" onClick={() => changeType('1')}>
              健康與生活
            </p>
            <p id="2" onClick={() => changeType('2')}>
              疫苗與用藥
            </p>
            <p className="3" onClick={() => changeType('3')}>
              營養與處方
            </p>
            <p className="4" onClick={() => changeType('4')}>
              美容與保養
            </p>
          </Link>
        </div>
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getBlog }, dispatch)
}
export default withRouter(SideMenu)
