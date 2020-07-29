import { combineReducers } from 'redux'
//商品數量
const counter = (state = 1, action) => {
  switch (action.type) {
    case 'PLUS_QUANTITY':
      return state + action.quantity
    case 'MINUS_QUANTITY':
      return state === 1 ? state : state - action.quantity
    case 'ADDTO_CART':
      return state
    default:
      return state
  }
}
const getMember = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_MEMBER':
      return action.data
    default:
      return state
  }
}
const getMemberOrder = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_MEMBER_ORDER':
      return action.data
    default:
      return state
  }
}
const getMemberOrderDataDetail = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_MEMBER_ORDER_DETAIL':
      return action.data
    default:
      return state
  }
}
const getDog = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_DOG':
      return action.data
    default:
      return state
  }
}
const rootReducer = combineReducers({
  counter,
  getMember,
  getDog,
  getMemberOrder,
  getMemberOrderDataDetail,
})
export { rootReducer }
