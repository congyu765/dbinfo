import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { Loading } from 'element-ui'
// import store from '../store'
const request = axios.create({
  headers: {
    showLoading: true
  }
})
NProgress.configure({ showSpinner: false })
request.interceptors.request.use(config => {
  if (config.headers.showLoading) {
    NProgress.start()
    delete config.headers.showLoading
  }
  //   let loadingInstance = Loading.service()
  //   store.dispatch('setLoadingInstance', loadingInstance)
  return config
})
request.interceptors.response.use(response => {
//   let loadingInstance = store.state.loadingInstance
//   loadingInstance.close()
  NProgress.done()
  return response
}, function (error) {
//   let loadingInstance = store.state.loadingInstance
//   loadingInstance.close()
  NProgress.done()
  return Promise.reject(error)
})
export default request
