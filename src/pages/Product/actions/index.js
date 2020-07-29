//商品數量
export const plusQuantity = (quantity) => ({
  type: 'PLUS_QUANTITY',
  quantity,
})
export const minusQuantity = (quantity) => ({
  type: 'MINUS_QUANTITY',
  quantity,
})

//跟server要商品資料(全部)
export const showProducts = (data) => {
  return { type: 'SHOW_PRODUCTS', data }
}
export const getProducts = (page = 1, orderBy = 'DESC') => {
  return async (dispatch) => {
    const req = new Request(
      `http://localhost:6001/products/${page}?orderBy=${orderBy}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const data = await res.json()
    dispatch(showProducts(data))
  }
}
//跟server要商品種類
export const getCategory = (page, orderBy = 'DESC') => {
  let cId = window.location.search
  return async (dispatch) => {
    const req = new Request(
      `http://localhost:6001/products/${page}${cId}&orderBy=${orderBy}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const data = await res.json()
    dispatch(showProducts(data))
  }
}
//跟server要廠商種類
export const getVendor = (page, orderBy = 'DESC') => {
  let vId = window.location.search
  return async (dispatch) => {
    const req = new Request(
      `http://localhost:6001/products/${page}${vId}&orderBy=${orderBy}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const data = await res.json()
    dispatch(showProducts(data))
  }
}
//跟server要商品細節
export const showProductDetail = (data) => {
  return { type: 'SHOW_PRODUCT_DETAIL', data }
}
export const getProductDetail = (pId) => {
  return async (dispatch) => {
    const req = new Request(
      `http://localhost:6001/products/productDetail/${pId}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const data = await res.json()
    // console.log('detail', data)
    dispatch(showProductDetail(data))
  }
}
//即時更新購物車數量
export const count = (quantity) => ({
  type: 'COUNT_QUANTITY',
  quantity,
})
//紀錄使用過優惠券的折扣或減價
export const useCoupon = (discount) => ({
  type: 'USE_COUPON',
  discount,
})
//紀錄使用過的優惠券的編號
export const couponId = (mmId) => ({ type: 'COUPON_ID', mmId })
//跟server要評論資料
export const showComments = (comments) => {
  return { type: 'SHOW_COMMENTS', comments }
}
export const getComments = (pId) => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/productComment/${pId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    dispatch(showComments(data))
  }
}
