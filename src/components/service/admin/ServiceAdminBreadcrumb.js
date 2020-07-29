import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { withRouter, useHistory } from 'react-router-dom'

function ServiceAdminSidebar(props) {
  const history = useHistory()
  // console.log(props)
  // console.log(history)
  return (
    <>
      <Breadcrumb>
        {history.pagename === '/service/admin/' ? (
          ''
        ) : (
          <Breadcrumb.Item onClick={() => history.push('/service/admin/')}>
            主頁
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item active>{props.pagename}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  )
}

export default withRouter(ServiceAdminSidebar)
