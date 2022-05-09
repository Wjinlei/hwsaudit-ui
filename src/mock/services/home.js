import Mock from 'mockjs2'
import { builder } from '../util'

const startAudit = () => {
  return builder(
    [
      {
        id: 1,
        path: '/wwwroot/www.a.com',
        name: 'index.php',
        user: 'www',
        mode: '-rw-r--r--',
        acl: '-'
      },
      {
        id: 2,
        path: '/wwwroot/www.b.com',
        name: 'index.php',
        user: 'www',
        mode: '-rw-r--r--',
        acl: '-'
      }
    ],
    '',
    200
  )
}

const getOS = () => {
  return builder({ os: 'CentOS 7.5' })
}

Mock.mock(/\/home/, 'get', getOS)
Mock.mock(/\/home/, 'post', startAudit)
