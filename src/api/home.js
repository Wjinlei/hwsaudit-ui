import request from '@/utils/request'

const api = {
  home: '/home',
  result: '/result'
}

export default api

export function getOS() {
  return request({
    url: api.home,
    method: 'get'
  })
}

export function getResult(parameter) {
  return request({
    url: api.result,
    method: 'get',
    params: parameter
  })
}

export function postResult() {
  return request({
    url: api.result,
    method: 'post'
  })
}

export function postStartAudit(data) {
  return request({
    url: api.home,
    method: 'post',
    data
  })
}
