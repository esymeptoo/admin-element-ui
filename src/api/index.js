import runtime from '@/utils/runtime'
import createRequest from '@/utils/request'

import profileApi from './profile'

const request = createRequest({
  baseURL: runtime.apiBaseUrl,
  // header demo
  // headers: {'X-Custom-Header': 'foobar'},
})

// 登录之后设置header信息等
export function setHeader(_request, headers) {
  return _request.setHeader(headers)
}

export const profile = profileApi(request)
