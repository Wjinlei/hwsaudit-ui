import Mock from 'mockjs2'
import { builder } from '../util'

const getResult = () => {
  return builder(
      {
        data: [
          {
            id: 1,
            name: 'index.php',
            path: '/wwwroot/www.a.com',
            user: 'www',
            mode: '-rw-r--r--',
            facl: '-'
          }
        ],
        pageNo: 1,
        totalCount: 1000
      },
    '',
    200,
    0
  )
}

const startAudit = () => {
  return builder(
    'ok',
    '',
    200,
    0
  )
}

const getOS = () => {
  return builder({ os: 'CentOS 7.5' })
}

Mock.mock(/\/home/, 'get', getOS)
Mock.mock(/\/result/, 'get', getResult)
Mock.mock(/\/home/, 'post', startAudit)
