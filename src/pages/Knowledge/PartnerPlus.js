import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Row, Col, Badge } from 'react-bootstrap'

function PartnerPlus(props) {
  // const mId = localStorage.getItem('mId')
  // const pTitle = localStorage.getItem('pTitle')
  // const pJoinName = localStorage.getItem('mName')
  // const plusOne = { mId, pTitle, pJoin, pJoinName }

  // //送出+1
  // async function makePlus() {
  //   const req = new Request('http://localhost:6001/knowledge/partner/plus', {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: new Headers({
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }),
  //     body: JSON.stringify(plusOne),
  //   })
  //   const res = await fetch(req)
  //   // const order = await res.json()
  //   await console.log(plusOne)
  // }

  // const [One, setOne] = useState([])
  //刪除發問
  // async function deleteOne() {
  //   let id = props.data.id
  //   console.log('name', id)
  //   const req = new Request(
  //     `http://localhost:6001/knowledge/partner/delone/${id}`,
  //     {
  //       method: 'POST',
  //       credentials: 'include',
  //     }
  //   )
  //   const res = await fetch(req)
  //   const data = await res.json()
  //   if (data.success) {
  //     alert('成功刪除')
  //   } else {
  //     alert('刪除失敗')
  //   }
  // }

  return (
    <>
      <Row className="justify-content-between">
        <>
          <Col>
            <div className="mt-2 ml-3">
              <strong> {localStorage.getItem('mName')}</strong>
            </div>
          </Col>
          <Col className="text-right"></Col>
        </>
      </Row>
    </>
  )
}

export default withRouter(PartnerPlus)
