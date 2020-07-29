import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'
import $ from 'jquery'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Swal from 'sweetalert2/src/sweetalert2.js'

const ProductComment = (props) => {
  const pId = props.detail[0] && props.detail[0].pId
  const mId = Number(localStorage.getItem('mId'))
  const comment = { pId, mId, content: '', rating: null }

  //送出評論
  async function makeComment() {
    const req = new Request('http://localhost:6001/productComment/post', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(comment),
    })
    const res = await fetch(req)
    const content = await res.json()
  }
  return (
    <Form className="productComment">
      <div className="mb-3">
        <Button
          variant="outline-transparent"
          className="p-0 btn-transparent text-dark border-0 mr-1"
          onClick={() => {
            $('#like')
              .addClass('like')
              .parent()
              .siblings()
              .find('#dislike')
              .removeClass('dislike')
            comment.rating = 1
          }}
        >
          <div id="like">
            <AiFillLike />
            <span>喜歡</span>
          </div>
        </Button>
        <Button
          variant="outline-transparent"
          className="p-0 btn-transparent text-dark border-0 ml-1"
          rating="0"
          onClick={() => {
            $('#dislike')
              .addClass('dislike')
              .parent()
              .siblings()
              .find('#like')
              .removeClass('like')
            comment.rating = 0
          }}
        >
          <div id="dislike">
            <AiFillDislike />
            <span>不喜歡</span>
          </div>
        </Button>
      </div>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>我要評論</Form.Label>
        <Form.Control
          as="textarea"
          name="content"
          rows="3"
          onChange={(e) => {
            comment.content = e.currentTarget.value
          }}
        />
      </Form.Group>
      <Button
        className="ml-0"
        variant="primary"
        type="submit"
        onClick={(e) => {
          if (!mId) {
            Swal.fire({
              title: '尚未登入',
              text: '前往登入頁面?',
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#cea160',
              cancelButtonColor: '#cccccc',
              confirmButtonText: '確定',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.value) {
                props.history.push('/login')
              }
            })
            e.preventDefault()
            e.stopPropagation()
          } else if (comment.content === '' || comment.rating === null) {
            Swal.fire({
              icon: 'warning',
              title: '還沒完成評論...',
              showConfirmButton: false,
            })
            e.preventDefault()
            e.stopPropagation()
          } else {
            makeComment()
          }
        }}
      >
        送出評論
      </Button>
    </Form>
  )
}
const mapStateToProps = (store) => {
  return {
    detail: store.getProductDetail,
  }
}

export default withRouter(connect(mapStateToProps, null)(ProductComment))
