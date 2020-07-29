import React, { useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
// import ServiceAdminBreadcrumb from '../../../components/service/admin/ServiceAdminBreadcrumb'
import { MdSend } from 'react-icons/md'
import ServiceGoBack from '../../../components/service/ServiceGoBack'
import ServiceAdminMessageDialog from '../../../components/service/admin/ServiceAdminMessageDialog'
//引入自己的scss
import '../../../css/service/style.scss'

function ServiceAdminMessageDetail(props) {
  useEffect(() => {}, [])
  return (
    <>
      <div className="ServiceAdminMessageDetail">
        <ServiceGoBack />
        <ServiceAdminMessageDialog />
      </div>
    </>
  )
}

export default ServiceAdminMessageDetail
