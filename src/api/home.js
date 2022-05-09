import request from '@/utils/request'

const api = {
  home: '/home'
}

export default api

export function getOS() {
  return request({
    url: api.home,
    method: 'get'
  })
}

export function postStartAudit(data) {
  return request({
    url: api.home,
    method: 'post',
    data
  })
}
