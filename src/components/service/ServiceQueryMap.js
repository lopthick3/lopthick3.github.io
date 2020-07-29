import React, { Component, useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { GiPerson } from 'react-icons/gi'
import { MdLocationOn } from 'react-icons/md'
import { withRouter } from 'react-router'
import { myGoogleMapApiKey } from '../../utils/service/ServiceFunction'

// const AnyReactComponent = ({ text }) => <div>{text}</div>
//自訂座標圖示
const MyMarker = ({ text }) => {
  return (
    <>
      <div className="google-map-maker my">
        <GiPerson className="icon" />
        <span className="text">{text}</span>
      </div>
    </>
  )
}
const Marker = ({ text }) => {
  return (
    <>
      <div className="google-map-maker">
        <MdLocationOn className="icon" />
        <span className="text">{text}</span>
      </div>
    </>
  )
}

function ServiceQueryMap(props) {
  //預設座標位置
  const [center, setCenter] = useState({
    lat: 25.034601,
    lng: 121.543463,
  })
  const [zoom, setZoom] = useState(13)
  // const [lat, setLat] = useState()
  // const [lng, setLng] = useState()
  const [location, setLocation] = useState([])
  //判斷是否取得用戶座標權限
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success)
  }
  //設定目前座標
  function success(position) {
    setLocation([
      {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
    ])
  }
  //讀取保姆位置
  useEffect(() => {}, [])
  useEffect(() => {
    //設定中心座標位置
    if (location.length !== 0) {
      setCenter({
        lat: location[0].lat,
        lng: location[0].lng,
      })
    }
  }, [location])

  return (
    <>
      {/* Important! Always set the container height explicitly */}
      {location.map((v, i) => {
        return (
          <div className="google-map" key={i}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: `${myGoogleMapApiKey()}`,
              }}
              center={center}
              defaultZoom={zoom}
            >
              {/* 保姆座標位置 */}
              {props.sUsers.map((u, i) => (
                <Marker lat={u.lat} lng={u.lng} text={u.sName} key={i} />
              ))}
              {/* 使用者座標位置 */}
              <MyMarker lat={v.lat} lng={v.lng} text="您的位置" />
            </GoogleMapReact>
          </div>
        )
      })}
    </>
  )
}

export default withRouter(ServiceQueryMap)
