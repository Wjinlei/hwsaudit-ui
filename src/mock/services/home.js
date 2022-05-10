import Mock from 'mockjs2'
import { builder } from '../util'

const startAudit = () => {
  return builder(
    [
      {
        id: 1,
        name: 'index.php',
        path: '/wwwroot/www.a.com',
        user: 'www',
        mode: '-rw-r--r--',
        facl: '-'
      }
    ],
    '',
    200,
    0
  )
}

const getOS = () => {
  return builder({ os: 'CentOS 7.5' })
}

Mock.mock(/\/home/, 'get', getOS)
Mock.mock(/\/home/, 'post', startAudit)
