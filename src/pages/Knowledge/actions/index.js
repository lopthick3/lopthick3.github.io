//文章
export const showBlog = (data) => {
  return { type: 'SHOW_BLOG', data }
}

//要全部資料
export const getBlog = () => {
  return async (dispatch) => {
    const req = new Request('http://localhost:6001/knowledge/blog', {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log(data)
    dispatch(showBlog(data))
  }
}

//詳細資訊
export const showBlogArticle = (data) => {
  return { type: 'SHOW_BLOG_ARTICLE', data }
}
export const getBlogArticle = (aId) => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/knowledge/blog/${aId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log('getBlogArticle', data)
    dispatch(showBlogArticle(data))
  }
}

//Question
export const showQuestion = (data) => {
  return { type: 'SHOW_QUESTION', data }
}
//要全部資料
export const getQuestion = () => {
  return async (dispatch) => {
    const req = new Request('http://localhost:6001/knowledge/question', {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log(data)
    dispatch(showQuestion(data))
  }
}

//詳細資訊
export const showQuestionDetail = (data) => {
  return { type: 'SHOW_QUESTION_DETAIL', data }
}
export const getQuestionDetail = (qId) => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/knowledge/question/${qId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log(data)
    dispatch(showQuestionDetail(data))
  }
}

//partner
export const showPartner = (data) => {
  return { type: 'SHOW_PARTNER', data }
}

//要全部
export const getPartner = () => {
  return async (dispatch) => {
    const req = new Request('http://localhost:6001/knowledge/partner', {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    dispatch(showPartner(data))
  }
}

//詳細資訊
export const showPartnerDetail = (data) => {
  return { type: 'SHOW_PARTNER_DETAIL', data }
}
export const getPartnerDetail = (pId) => {
  return async (dispatch) => {
    const req = new Request(`http://localhost:6001/knowledge/partner/${pId}`, {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    console.log(data)
    dispatch(showPartnerDetail(data))
  }
}

// partner_plus

export const showPartnerPlus = (data) => {
  return { type: 'SHOW_PARTNERPLUS', data }
}

export const getPartnerPlus = () => {
  return async (dispatch) => {
    const req = new Request('http://localhost:6001/knowledge/partner/', {
      method: 'GET',
      credentials: 'include',
    })
    const res = await fetch(req)
    const data = await res.json()
    dispatch(showPartner(data))
  }
}

export const showPartnerPlusDetail = (data) => {
  return { type: 'SHOW_PARTNERPLUS_DETAIL', data }
}
export const getPartnerPlusDetail = (mId) => {
  return async (dispatch) => {
    const req = new Request(
      `http://localhost:6001/knowledge/partner/plus/${mId}`,
      {
        method: 'GET',
        credentials: 'include',
      }
    )
    const res = await fetch(req)
    const data = await res.json()
    console.log('999', data)
    dispatch(showPartnerPlusDetail(data))
  }
}
