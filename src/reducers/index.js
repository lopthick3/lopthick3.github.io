import { combineReducers } from 'redux'
import {
  getCoupons,
  insertCoupon,
  getCode,
  CheckCoupon,
} from './marketingReducer'

// 會員reducers
const getMember = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_MEMBER':
      return action.data
    default:
      return state
  }
}
// 會員細節reducers
const getMemberDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_MEMBER_DETAIL':
      return action.data
    default:
      return state
  }
}
// 會員訂單reducers
const getMemberOrder = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_MEMBER_ORDER':
      return action.data
    default:
      return state
  }
}
//更新會員資料
const updateMember = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_MEMBER':
      return { ...action.data }
    default:
      return state
  }
}
//會員訂單細節
const getMemberOrderDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_MEMBER_ORDER_DETAIL':
      return action.data
    default:
      return state
  }
}

//會員服務訂單
const getServiceOrder = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_SERVICE_ORDER':
      return action.data
    default:
      return state
  }
}
//會員活動訂單
const getActivityOrder = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_ACTIVITY_ORDER':
      return action.data
    default:
      return state
  }
}
//會員最愛商品
const getLoveList = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_LOVE_LIST':
      return action.data
    default:
      return state
  }
}
//會員最愛活動
const getLoveActivity = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_LOVE_ACTIVITY':
      return action.data
    default:
      return state
  }
}
//會員最愛保母
const getLoveNanny = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_LOVE_NANNY':
      return action.data
    default:
      return state
  }
}
//會員最愛保母
const getCommentList = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_COMMENT_LIST':
      return action.data
    default:
      return state
  }
}
//會員reducers

//商品reducers
//商品數量
const counter = (state = 1, action) => {
  switch (action.type) {
    case 'PLUS_QUANTITY':
      return state + action.quantity
    case 'MINUS_QUANTITY':
      return state === 1 ? state : state - action.quantity
    default:
      return state
  }
}
//商品列表
const getProducts = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_PRODUCTS':
      return action.data
    default:
      return state
  }
}
//商品細節
const getProductDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_PRODUCT_DETAIL':
      return action.data
    default:
      return state
  }
}
//Header即時更新數量
const getQuantity = (state = 0, action) => {
  switch (action.type) {
    case 'COUNT_QUANTITY':
      return action.quantity
    default:
      return state
  }
}
//紀錄優惠券的優惠金額
const useCoupon = (state = '', action) => {
  switch (action.type) {
    case 'USE_COUPON':
      return action.discount
    default:
      return state
  }
}
//紀錄使用過的優惠券的編號
const couponId = (state = 0, action) => {
  switch (action.type) {
    case 'COUPON_ID':
      return action.mmId
    default:
      return state
  }
}
//顯示商品評論
const showComments = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_COMMENTS':
      return action.comments
    default:
      return state
  }
}
//商品reducers

const getDog = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_DOG': {
      // console.log(action.data)
      return action.data
    }

    default:
      return state
  }
}
const getDogDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_DOG_DETAIL':
      return action.data
    default:
      return state
  }
}
//更新狗狗資料
const updateDog = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_DOG':
      return { ...action.data }
    default:
      return state
  }
}
//更新服務狀態
const updateService = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_SERVICE':
      return { ...action.data }
    default:
      return state
  }
}
//knowledge reducers
//blog

const getBlog = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_BLOG':
      return action.data
    default:
      return state
  }
}

const getBlogArticle = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_BLOG_ARTICLE':
      return action.data
    default:
      return state
  }
}
// partner
const getPartner = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_PARTNER':
      return action.data
    default:
      return state
  }
}

const getPartnerDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_PARTNER_DETAIL':
      return action.data
    default:
      return state
  }
}

// Qestion
const getQuestion = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_QUESTION':
      return action.data
    default:
      return state
  }
}

const getQuestionDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_QUESTION_DETAIL':
      return action.data
    default:
      return state
  }
}

//partnerPlus
const getPartnerPlus = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_PARTNERPLUS':
      return action.data
    default:
      return state
  }
}

const getPartnerPlusDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_PARTNERPLUS_DETAIL':
      console.log('re', action.data)
      return action.data
    default:
      return state
  }
}

//knowledge end
const rootReducer = combineReducers({
  getMember,
  counter,
  CheckCoupon,
  getProducts,
  getProductDetail,
  getDog,
  getCoupons,
  getBlog,
  getBlogArticle,
  getPartner,
  getPartnerDetail,
  getQuestion,
  getQuestionDetail,
  insertCoupon,
  getMemberOrder,
  getMemberOrderDetail,
  getCode,
  getDogDetail,
  getQuantity,
  getMemberDetail,
  getServiceOrder,
  getActivityOrder,
  getLoveList,
  getLoveActivity,
  updateMember,
  useCoupon,
  showComments,
  couponId,
  getLoveNanny,
  getCommentList,
  updateDog,
  updateService,
  getPartnerPlus,
  getPartnerPlusDetail,
})

export { rootReducer }
