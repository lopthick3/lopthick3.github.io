import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Carousel from 'react-grid-carousel'
import { Link } from 'react-router-dom'
import '../../css/index/index.scss'

const images = [
  require('../../images/index/slide1.jpg'),
  require('../../images/index/slide2.jpg'),
  require('../../images/index/slide3.jpg'),
]

const BannerRow = styled.div`
  max-width: 100% vw;
  max-height: 500 px;
  display: flex;
  position: relative;
  margin: 0 px;
  padding: 0 px;
`

const CarouselWapeer = styled.div`
  width: 100% vw;
  height: 300 px;
  margin: 0 px;
  padding: 0 px;
`

const CarouselPage = () => {
  const [isHover, setIsHover] = useState(false)
  const [data, setData] = useState([
    {
      text: '狗狗保姆服務',
      src: '/service',
      btnText: '去看看',
    },
    {
      text: '多項商品優惠中',
      src: '/products',
      btnText: '前往',
    },
    {
      text: '不定時好康活動',
      src: '/activity',
      btnText: '前往',
    },
  ])

  const handleHover = useCallback(() => {
    setIsHover((state) => !state)
  }, [])

  return (
    <BannerRow onMouseLeave={handleHover} onMouseEnter={handleHover} hideArrow>
      <CarouselWapeer>
        <Carousel
          hideArrow={!isHover}
          showDots
          autoplay={3000}
          loop={true}
          gap={0}
          styled={{
            margin: '0px',
          }}
        >
          {images.map((img, i) => (
            <Carousel.Item key={i}>
              <Link to={data[i].src}>
                <div className="position-relative">
                  <figure className="">
                    <img src={img} alt="" className="" />
                  </figure>
                  <div className="title">
                    <span className="text">{data[i].text}</span>
                    <button className="btn btn-theme">{data[i].btnText}</button>
                  </div>
                </div>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </CarouselWapeer>
    </BannerRow>
  )
}

export default CarouselPage
