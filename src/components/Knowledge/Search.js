import React, { useState } from 'react'
import { Row, Col, Button, Form, Collapse, FormControl } from 'react-bootstrap'
import { FaChevronRignt, FaSearch, FaChevronRight } from 'react-icons/fa'

function Search() {
  return (
    <>
      <div>
        <Form inline>
          <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
          <Button
            type="submit"
            variant="primary"
            aria-controls="example-collapse-text"
          >
            搜尋
          </Button>
        </Form>
      </div>
    </>
  )
}

export default Search
