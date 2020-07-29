import React from 'react'
import { Card } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

//引入自己的css
import '../../css/activity/activity.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

function ActivityLike(props) {
  return (
    <>
      <div className="container activity-like my-3">
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4">
            <Card className="">
              <Link to="/activity/class">
                <Card.Img
                  variant="top"
                  src={require('../../images/activity/class-p1.jpg')}
                />
              </Link>
              <Card.Body>
                <Card.Title>寵物訓練課程初階班</Card.Title>

                <Card.Text>
                  <p className=" text-muted card-date">
                    2019-09-08(Sun) ~ 2019-10-13(Sun)
                  </p>
                  <p>
                    寵物行為訓練課程，由完美狗狗訓練計劃研究聯盟訓練師【嘉嘉老師】親授。透過18小時的紮實課程，讓飼主學觀察家中的毛寶貝，了解毛寶貝的肢體語言。並透過正確的行為引導，協助毛孩成為主
                  </p>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <figure className="icon-heart icon-is-follow">
                      <img
                        src={require('../../images/activity/icon-heart.svg')}
                        alt=""
                      />
                    </figure>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary">
                      活動結束
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <Card className="">
              <Link to="/activity/class">
                <Card.Img
                  variant="top"
                  src={require('../../images/activity/class-p1.jpg')}
                />
              </Link>
              <Card.Body>
                <Card.Title>寵物訓練課程初階班</Card.Title>

                <Card.Text>
                  <p className=" text-muted card-date">
                    2019-09-08(Sun) ~ 2019-10-13(Sun)
                  </p>
                  <p>
                    寵物行為訓練課程，由完美狗狗訓練計劃研究聯盟訓練師【嘉嘉老師】親授。透過18小時的紮實課程，讓飼主學觀察家中的毛寶貝，了解毛寶貝的肢體語言。並透過正確的行為引導，協助毛孩成為主
                  </p>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <figure className="icon-heart icon-is-follow">
                      <img
                        src={require('../../images/activity/icon-heart.svg')}
                        alt=""
                      />
                    </figure>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary">
                      活動結束
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <Card className="">
              <Link to="/activity/class">
                <Card.Img
                  variant="top"
                  src={require('../../images/activity/class-p1.jpg')}
                />
              </Link>
              <Card.Body>
                <Card.Title>寵物訓練課程初階班</Card.Title>

                <Card.Text>
                  <p className=" text-muted card-date">
                    2019-09-08(Sun) ~ 2019-10-13(Sun)
                  </p>
                  <p>
                    寵物行為訓練課程，由完美狗狗訓練計劃研究聯盟訓練師【嘉嘉老師】親授。透過18小時的紮實課程，讓飼主學觀察家中的毛寶貝，了解毛寶貝的肢體語言。並透過正確的行為引導，協助毛孩成為主
                  </p>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <figure className="icon-heart icon-is-follow">
                      <img
                        src={require('../../images/activity/icon-heart.svg')}
                        alt=""
                      />
                    </figure>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary">
                      活動結束
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <Card className="">
              <Link to="/activity/class">
                <Card.Img
                  variant="top"
                  src={require('../../images/activity/class-p1.jpg')}
                />
              </Link>
              <Card.Body>
                <Card.Title>寵物訓練課程初階班</Card.Title>

                <Card.Text>
                  <p className=" text-muted card-date">
                    2019-09-08(Sun) ~ 2019-10-13(Sun)
                  </p>
                  <p>
                    寵物行為訓練課程，由完美狗狗訓練計劃研究聯盟訓練師【嘉嘉老師】親授。透過18小時的紮實課程，讓飼主學觀察家中的毛寶貝，了解毛寶貝的肢體語言。並透過正確的行為引導，協助毛孩成為主
                  </p>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <figure className="icon-heart icon-is-follow">
                      <img
                        src={require('../../images/activity/icon-heart.svg')}
                        alt=""
                      />
                    </figure>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary">
                      活動結束
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <Card className="">
              <Link to="/activity/class">
                <Card.Img
                  variant="top"
                  src={require('../../images/activity/class-p1.jpg')}
                />
              </Link>
              <Card.Body>
                <Card.Title>寵物訓練課程初階班</Card.Title>

                <Card.Text>
                  <p className=" text-muted card-date">
                    2019-09-08(Sun) ~ 2019-10-13(Sun)
                  </p>
                  <p>
                    寵物行為訓練課程，由完美狗狗訓練計劃研究聯盟訓練師【嘉嘉老師】親授。透過18小時的紮實課程，讓飼主學觀察家中的毛寶貝，了解毛寶貝的肢體語言。並透過正確的行為引導，協助毛孩成為主
                  </p>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <figure className="icon-heart icon-is-follow">
                      <img
                        src={require('../../images/activity/icon-heart.svg')}
                        alt=""
                      />
                    </figure>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary">
                      活動結束
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4">
            <Card className="">
              <Link to="/activity/class">
                <Card.Img
                  variant="top"
                  src={require('../../images/activity/class-p1.jpg')}
                />
              </Link>
              <Card.Body>
                <Card.Title>寵物訓練課程初階班</Card.Title>

                <Card.Text>
                  <p className=" text-muted card-date">
                    2019-09-08(Sun) ~ 2019-10-13(Sun)
                  </p>
                  <p>
                    寵物行為訓練課程，由完美狗狗訓練計劃研究聯盟訓練師【嘉嘉老師】親授。透過18小時的紮實課程，讓飼主學觀察家中的毛寶貝，了解毛寶貝的肢體語言。並透過正確的行為引導，協助毛孩成為主
                  </p>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <div>
                    <figure className="icon-heart icon-is-follow">
                      <img
                        src={require('../../images/activity/icon-heart.svg')}
                        alt=""
                      />
                    </figure>
                  </div>
                  <div>
                    <button type="button" className="btn btn-primary">
                      活動結束
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActivityLike
