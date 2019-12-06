import request from './index'
export default {
  async getUserById () {
    const response = await request.get('/user/3')
    return response.data
  },
  register (data) {
    return request.post('/user/register', data)
  },
  async login (data) {
    const response = await request.post('/user/login', data)
    return response
  }
}
