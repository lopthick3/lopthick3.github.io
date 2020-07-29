import React from 'react'
import { MdStar } from 'react-icons/md'

//-----基本功能-----
//router切換總是返回頁面最頂端
export function SctollToTop() {
  return window.scrollTo(0, 0)
}
//評價星星數
export function starRating(rating) {
  rating = !!rating ? rating : '0'
  let icon = []
  for (let i = 0; i < rating; i++) {
    icon = [...icon, <MdStar className="mdStar" key={i} />]
  }
  for (let i = rating; i < 5; i++) {
    icon = [...icon, <MdStar className="mdStarBorder" key={i} />]
  }
  return icon
}
//通過認證icon
export function checkIcon(text) {
  return (
    <>
      <span className="inline-block-icon ml-3">
        <img
          className="img-fluid"
          src={require('../../images/service/icon/check.svg')}
          alt=""
        />
        <span className="icon-text">{text}</span>
      </span>
    </>
  )
}
//跳轉至連結
export function linkTo(src) {
  return (window.location.href = src)
}

//-----DatePicker時間計算-----
//設定時間(時分)
export function setMyTime(hours, mins, date) {
  let newDate = new Date()
  if (date) {
    newDate.setTime(date.getTime())
  }
  newDate.setHours(hours)
  newDate.setMinutes(mins)
  return newDate
}
//增加時間(時分)
export function addMyTime(hours, mins, date) {
  let newDate = new Date()
  if (date) {
    newDate.setTime(date.getTime())
  }
  newDate.setHours(newDate.getHours() + hours)
  newDate.setMinutes(newDate.getMinutes() + mins)
  return newDate
}
//計算時間差(時,分)
export function calcTimeDiff(startDate, endDate, raw) {
  let diff = Math.abs((endDate - startDate) / (1000 * 60))
  let hours = Math.floor(diff / 60)
  let mins = Math.round(Math.ceil(diff % 60))
  if (mins === 60) {
    hours += 1
    mins = 0
  }
  return raw ? parseInt(hours + mins / 60) : hours + '時' + mins + '分'
}

//-----抓取使用fetch連線資料庫取得json格式資料-----
export async function getDataFromServer(url) {
  const request = new Request(url, {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'appliaction/json',
    }),
  })
  const response = await fetch(request)
  const data = await response.json()
  // console.log(data) //測試讀取
  return data
}

//-----表單處理資料(以下2擇1使用,必須先設定jsonData的hooks state)-----
//取得目標欄位值並回傳json(事件,json格式資料)
//必須先設定jsonData的state
export function handleFormValue(event, jsonData) {
  return (jsonData[event.target.name] = event.target.value)
}
//取得目標欄位值,驗證格式並回傳json(事件,正規法比對條件,json格式資料)
export function handleFormValueMatch(event, match, jsonData) {
  //若符合條件
  // console.log(event.target)
  if (event.target.value.match(match) != null) {
    return (jsonData[event.target.name] = event.target.value)
  } else {
    return false
  }
}
//-----api key-----
export function myGoogleMapApiKey() {
  return 'YourApiKey'
}
//-----google map location-----
export async function getGoogleMapLocation(sCity, sDist, sAddr) {
  const request = new Request(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${sCity}${sDist}${sAddr}&key=${myGoogleMapApiKey()}`
  )
  const response = await fetch(request)
  const data = await response.json()
  return data.results[0].geometry.location //輸出緯度與經度
}
