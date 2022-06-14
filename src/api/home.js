import request from '@/utils/request'

const api = {
  os: '/os',
  home: '/home',
  export_json_home: '/export_json_home',
  export_xml_home: '/export_xml_home'
}

export default api

export function getOS() {
  return request({
    url: api.os,
    method: 'get'
  })
}

export function getHome(parameter) {
  return request({
    url: api.home,
    method: 'get',
    params: parameter
  })
}

export function postHome(data) {
  return request({
    url: api.home,
    method: 'post',
    data
  })
}

export function postExportJsonHome() {
  return request({
    url: api.export_json_home,
    method: 'post'
  })
}

export function postExportXmlHome() {
  return request({
    url: api.export_xml_home,
    method: 'post'
  })
}
