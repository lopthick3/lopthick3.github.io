import React, { useEffect } from 'react'
import '../../css/marketing/bonuspoints.scss'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { IoIosStar, IoMdStarOutline, IoMdStarHalf } from 'react-icons/io'
import { IconContext } from 'react-icons'
function BonusPointsList() {
  const itemsnum = 250
  return (
    <>
      <div className="container">
        <div className="marketing-bp-imgbox">
          <img
            className="marketing-bp-img"
            src={require('../../images/marketing/marketingdog.jpg')}
            alt=""
          />
        </div>
        <div className="d-flex justify-content-between mx-2  my-3">
          <div className="bonuspoints-totalitems">共有 {itemsnum} 件商品</div>
          <Form.Control as="select" className="bonuspoints-select">
            <option>依熱門程度(高至低)</option>
            <option>依熱門程度(低至高)</option>
            <option>依價格排列(高至低)</option>
            <option>依價格排列(低至高)</option>
          </Form.Control>
        </div>
        <div className="">
          <Row xl={2}>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} lg={4} md={6}>
              <Card className="my-4 bp-list-card">
                <Card.Img
                  className="bp-card-img mt-2"
                  variant="top"
                  src={require('../../images/marketing/food_1.png')}
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    希爾思™寵物食品 <br />
                    小型及迷你成犬
                  </Card.Title>
                  <Card.Text>
                    <IconContext.Provider value={{ size: '1.3rem' }}>
                      <IoIosStar />
                      <IoIosStar />
                      <IoIosStar />
                      <IoMdStarHalf />
                      <IoMdStarOutline />
                      (25)
                    </IconContext.Provider>
                  </Card.Text>
                  <Button variant="primary">購買</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <div id="test"></div>
      </div>
    </>
  )
}
export default BonusPointsList
