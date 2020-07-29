import React from 'react'
import { Button } from 'react-bootstrap'
//引入自己的css
// import '../css/example/style.css'

function Home(props) {
  return (
    <>
      <div className="container pt-3 pb-5">
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
        <Button variant="success">success</Button>
        <Button variant="info">info</Button>
        <Button variant="danger">danger</Button>
        <Button variant="warning">warning</Button>
        <Button variant="dark">dark</Button>
        <Button variant="light">light</Button>
        <hr />
        <Button variant="outline-primary">outline-primary</Button>
        <Button variant="outline-secondary">outline-secondary</Button>
        <Button variant="outline-success">outline-success</Button>
        <Button variant="outline-info">outline-info</Button>
        <Button variant="outline-danger">outline-danger</Button>
        <Button variant="outline-warning">outline-warning</Button>
        <Button variant="outline-dark">outline-dark</Button>
        <Button variant="outline-light">outline-light</Button>
        <hr />
        <Button variant="theme">theme</Button>
        <Button variant="theme-reverse">theme-reverse</Button>
        <Button variant="outline-theme">theme</Button>
      </div>
    </>
  )
}

export default Home
