import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '../router/index'

// axios 二次封裝

let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加載中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

// axios 攔截器，設置統一 header
axios.interceptors.request.use( config => {
    startLoading()
    if (localStorage.eleToken) config.headers.Authorization = localStorage.eleToken
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//  response 攔截，401 token 過期處理
axios.interceptors.response.use( response => {
    endLoading()
    return response
  },
  error => {
    endLoading()
    Message.error(error.response.data)

    const { status } = error.response
    if (status == 401) {
      Message.error('token值無效，請重新登入')
      localStorage.removeItem('eleToken')
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default axios
