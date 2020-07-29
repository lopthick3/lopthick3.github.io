import React from 'react'
import { Pagination } from 'react-bootstrap'
const ProductPagination = () => {
  let items = []
  for (let number = 1; number <= 5; number++) {
    items.push(<Pagination.Item key={number}>{number}</Pagination.Item>)
  }

  const paginationBasic = (
    <Pagination className="d-flex justify-content-center" size="md">
      {items}
    </Pagination>
  )
  return paginationBasic
}

export default ProductPagination
