import request from '@/utils/request'

const api = {
  service: '/service',
  export_json_service: '/export_json_service',
  export_xml_service: '/export_xml_service'
}

export default api

export function getService(parameter) {
  return request({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function postService(data) {
  return request({
    url: api.service,
    method: 'post',
    data
  })
}

export function postExportXmlService() {
  return request({
    url: api.export_xml_service,
    method: 'post'
  })
}
