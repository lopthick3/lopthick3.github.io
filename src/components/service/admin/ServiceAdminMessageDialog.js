import React from 'react'
// import { useHistory } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { MdSend } from 'react-icons/md'

function ServiceAdminMessageDialog() {
  //   const history = useHistory()
  //   console.log(history)

  return (
    <>
      <Card className="message-chat-wrapper card-light">
        <Card.Header>
          <h5 className="member-name">
            與 <span className="text-info">會員1</span> 的對話
          </h5>
        </Card.Header>
        <Card.Body>
          <div className="dialog">
            <div className="dialog-date">2020/03/17</div>
            <div className="dialog-text">
              1231231231231212312312123123121231231212312312123123121212312312312312123123121231231212312312123123121231231212
            </div>
            <div className="dialog-text reverse">
              abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc
            </div>
            <div className="dialog-text">12312312</div>
            <div className="dialog-text reverse">abcabc</div>
            <div className="dialog-text">12312312</div>
            <div className="dialog-text reverse">abcabc</div>
            <div className="dialog-date">2020/03/17</div>
            <div className="dialog-text">
              1231231231231212312312123123121231231212312312123123121212312312312312123123121231231212312312123123121231231212
            </div>
            <div className="dialog-text reverse">
              abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc
            </div>
            <div className="dialog-text">12312312</div>
            <div className="dialog-text reverse">abcabc</div>
            <div className="dialog-text">12312312</div>
            <div className="dialog-text reverse">abcabc</div>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="send-area">
            <form action="" onSubmit={() => {}}>
              <div className="input-group type-area">
                <input
                  type="text"
                  className="form-control"
                  id="type-area-input"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-sm btn-success"
                    id="type-area-btn"
                    onClick={() => {}}
                  >
                    <MdSend className="mr-1" />
                    傳送
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Card.Footer>
      </Card>
    </>
  )
}

export default ServiceAdminMessageDialog
