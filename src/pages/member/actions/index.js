export const showMember = (data) => {
  return { type: 'SHOW_MEMBER', data }
}

//跟node要資料
export const getMemberData = () => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    // console.log(data.member)
    dispatch(showMember(data))
  }
}
//更新會員資料
export const updateMember = (data) => {
  return { type: 'UPDATE_MEMBER', data }
}
export const updateServerMember = (val) => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/update`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(val),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('list: ', data)
    dispatch(updateMember(data))
  }
}
//會員訂單資料
export const showMemberOrder = (data) => {
  return { type: 'SHOW_MEMBER_ORDER', data }
}

//跟node要資料
export const getMemberOrderData = () => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/order/`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log(data)
    dispatch(showMemberOrder(data))
  }
}
//跟server要訂單細節
export const showMemberOrderDataDetail = (data) => {
  return { type: 'SHOW_MEMBER_ORDER_DETAIL', data }
}
export const getMemberOrderDataDetail = (mId) => {
  mId = localStorage.getItem('mId')
  console.log('mId: ', mId)
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/order/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    // console.log('detail', data)
    dispatch(showMemberOrderDataDetail(data))
  }
}

//查看會員細節
export const showMemberDetail = (data) => {
  return { type: 'SHOW_MEMBER_DETAIL', data }
}
export const getMemberDetail = (mId) => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    // console.log(data)
    dispatch(showMemberDetail(data))
  }
}
//查看狗狗
export const showDog = (data) => {
  return { type: 'SHOW_DOG', data }
}
export const getDogData = (mId) => {
  mId = localStorage.getItem('mId')
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/dog/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    // console.log(data)
    dispatch(showDog(data))
  }
}
//查看狗狗細節
export const showDogDetail = (data) => {
  return { type: 'SHOW_DOG_DETAIL', data }
}
export const getDogDetail = (mId) => {
  mId = localStorage.getItem('mId')
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/dog/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    // console.log(data)
    dispatch(showDogDetail(data))
  }
}
//更新狗狗資料
export const updateDog = (data) => {
  return { type: 'UPDATE_DOG', data }
}
export const updateServerDog = (val) => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/dog/update/`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(val),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('list: ', data)
    dispatch(updateDog(data))
  }
}
//查看服務訂單
export const showServiceOrder = (data) => {
  return { type: 'SHOW_SERVICE_ORDER', data }
}
export const getServiceOrder = (mId) => {
  mId = localStorage.getItem('mId')
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/Sorder/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log(data)
    dispatch(showServiceOrder(data))
  }
}
//更新服務資料
export const updateService = (data) => {
  return { type: 'UPDATE_SERVICE', data }
}
export const updateServerService = () => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/Sorder/update/`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ orderStsId: 'o03' }),
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('list: ', data)
    dispatch(updateService(data))
  }
}
//查看活動訂單
export const showActivityOrder = (data) => {
  return { type: 'SHOW_ACTIVITY_ORDER', data }
}
export const getActivityOrder = (mId) => {
  mId = localStorage.getItem('mId')
  return async (dispatch) => {
    const req = new Request(
      `http://localhost:6001/activity_successEvent/${mId}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const data = await res.json()
    console.log(data)
    dispatch(showActivityOrder(data))
  }
}
//查看最愛商品
export const showLoveList = (data) => {
  return { type: 'SHOW_LOVE_LIST', data }
}
export const getLoveList = (mId) => {
  mId = localStorage.getItem('mId')
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/list/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('list: ', data)
    dispatch(showLoveList(data))
  }
}
//查看最愛活動
export const showLoveActivity = (data) => {
  return { type: 'SHOW_LOVE_ACTIVITY', data }
}
export const getLoveActivity = (mId) => {
  mId = localStorage.getItem('mId')
  return async (dispatch) => {
    const req = new Request(
      `http://localhost:6001/activity_collection/${mId}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const data = await res.json()
    console.log('list: ', data)
    dispatch(showLoveActivity(data))
  }
}
//查看最愛活動
export const showLoveNanny = (data) => {
  return { type: 'SHOW_LOVE_NANNY', data }
}
export const getLoveNanny = (mId) => {
  mId = localStorage.getItem('mId')
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/nanny/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('list: ', data)
    dispatch(showLoveNanny(data))
  }
}
//查看最愛活動
export const showCommentList = (data) => {
  return { type: 'SHOW_COMMENT_LIST', data }
}
export const getCommentList = (mId) => {
  mId = localStorage.getItem('mId')
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/member/comment/${mId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    // console.log('list: ', data)
    dispatch(showCommentList(data))
  }
}
