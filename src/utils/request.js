import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.log(config)
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request
