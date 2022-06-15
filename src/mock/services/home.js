import Mock from 'mockjs2'
import { builder } from '../util'

const getHome = () => {
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
        },
        {
          id: 2,
          name: 'index.html',
          path: '/wwwroot/www.b.com',
          user: 'www',
          mode: '-rw-r--r--',
          facl: '-'
        },
        {
          id: 3,
          name: 'public.php',
          path: '/wwwroot/www.a.com',
          user: 'www',
          mode: '-rw-r--r--',
          facl: '-'
        },
        {
          id: 4,
          name: 'admin.php',
          path: '/wwwroot/www.b.com',
          user: 'www',
          mode: '-rw-r--r--',
          facl: '-'
        }
      ],
      pageNo: 1,
      totalCount: 4
    },
    '',
    200,
    0
  )
}

const postHome = () => {
  return builder('ok', '', 200, 0)
}

const getOS = () => {
  return builder({ os: 'CentOS 7.5' })
}

Mock.mock(/\/os/, 'get', getOS)
Mock.mock(/\/home/, 'get', getHome)
Mock.mock(/\/home/, 'post', postHome)
