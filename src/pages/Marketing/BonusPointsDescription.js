import React from 'react'

import { Nav, Card, Form, Button, Col, Row, Table } from 'react-bootstrap'

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import '../../css/marketing/coupon.scss'

function BonusPointsDescription() {
  return (
    <>
      <div className="container">
        <h3 className="CouponDescription">優惠券使用說明</h3>
        <p>
          優惠券滿額抵用券是本站所舉辦的促銷活動，提供會員使用的回饋，依照活動有滿額折抵、或全面折扣等不同的優惠。
        </p>
        <h4 className="CouponDescription">如何獲得優惠券？</h4>
        <p>
          本站將會不定期舉辦贈送優惠券活動，請您密切留意活動訊息，贈送方式與贈送內容皆以單次活動公告內容為主。
        </p>
        <h4 className="CouponDescription">優惠券使用須知</h4>
        <ul>
          <li>
            優惠券使用是以券號為依據，不限使用會員身分，故請妥善保管優惠券號；為維護自身權益，以確保該優惠券為您本人使用。
          </li>
          <li>
            優惠券使用是以每筆訂單為單位，每筆訂單限使用一張優惠券，不可與紅利點數或是其他優惠方案合併使用。
          </li>
          <li>
            每張優惠券包含券號、活動規則及使用效期，提醒您於使用效期前使用，逾期則視為棄權。
          </li>
          <li>
            優惠券一經使用立即失效，若事後取消訂單或辦理退貨，僅會退還您實際所支付的金額，不再補發優惠券，優惠券也不得重複使用。
          </li>
        </ul>
        <h4 className="CouponDescription">如何使用優惠券？</h4>
        <ul>
          <li>點選「結帳」按鈕</li>
          <li>登入客戶帳號/密碼</li>
          <li>於訂購資料頁選擇欲使用的優惠券</li>
          <li>填寫訂購資料，按"確認"即完成購物</li>
        </ul>
        <h3 className="CouponDescription">注意事項</h3>
        <ul>
          <li>
            結帳時，若有紅利點數折抵優惠，可選擇【優惠券折抵】或【紅利點數折抵】(二擇一)，單筆訂單只可使用一種優惠折抵。
          </li>
          <li>
            優惠券限會員使用，不得折抵現金，不得轉讓。若會員未在截止日期前，使用優惠券(購物金)做購物折抵，則逾期無效，不再補發。
          </li>
          <li>
            優惠券不再另開立發票，發票金額以該訂單「購買時實際支付的金額」來計算。
          </li>
          <li>
            訂單取消時，退貨的金額是以「購買時實際支付的金額」來計算，也就是扣除優惠券(購物金)後的金額。該次消費使用之優惠券(購物金)將無法退回。
          </li>
          <li>優惠券不得兌換現金、找零或折換其他贈品。</li>
          <li>優惠券的使用方式依優惠券上說明為主，恕無法抵扣運費。</li>
          <li>
            優惠券為贈品，係屬無償取得，不適用商品（服務）禮券記載之規範。
          </li>
          <li>
            本公司有權決定終止及變更優惠券贈送辦法及折抵方式的權利。詳見https://shop.hugdog.com.tw/，相關資訊以更新後者為準
          </li>
        </ul>
      </div>
    </>
  )
}

export default BonusPointsDescription
