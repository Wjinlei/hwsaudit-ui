import Mock from 'mockjs2'
import { builder } from '../util'

const getService = () => {
  return builder(
    {
      data: [
        {
          id: 1,
          name: 'docker.service',
          state: 'enabled',
          description: 'Docker Application Container Engine',
          path: '/usr/bin/dockerd -H fd://'
        },
        {
          id: 2,
          name: 'cronie.service',
          state: 'enabled',
          description: 'Periodic Command Scheduler',
          path: '/usr/bin/crond -n'
        }
      ],
      pageNo: 1,
      totalCount: 2
    },
    '',
    200,
    0
  )
}

const postService = () => {
  return builder('ok', '', 200, 0)
}

Mock.mock(/\/service/, 'get', getService)
Mock.mock(/\/service/, 'post', postService)
