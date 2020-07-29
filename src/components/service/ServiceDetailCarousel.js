import React, { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { getDataFromServer } from '../../utils/service/ServiceFunction'

function ServiceDetailCarousel(props) {
  const [album, setAlbum] = useState([]) //大頭貼(service_photo的資料)
  //列表
  useEffect(() => {
    //取得照片資料
    const sPhoto = getDataFromServer(
      `http://localhost:6001/service/photo/${props.sMId}?category=2`
    )
    Promise.resolve(sPhoto).then(data => {
      if (data.length) {
        setAlbum(data)
        console.log()
      } else {
        setAlbum([
          {
            fileName: 'placeholder',
            fileType: 'jpg',
          },
        ])
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Carousel autoPlay={true} infiniteLoop={true} statusFormatter={() => ``}>
        {album.length !== 0
          ? album.map((v, i) => (
              <div key={i}>
                <img
                  src={`http://localhost:6001/uploads/service/album/${album[i].fileName}.${album[i].fileType}`}
                  alt=""
                />
              </div>
            ))
          : ''}
      </Carousel>
    </>
  )
}

export default ServiceDetailCarousel
