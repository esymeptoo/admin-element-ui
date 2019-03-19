import axios, { Axios } from 'axios'

Axios.prototype.setHeader = function (headers) {
  this.defaults.headers = this.defaults.headers || {}
  this.defaults = {
    ...this.defaults,
    headers: {
      ...this.defaults.headers,
      ...headers,
    },
  }
}

export default function createRequest(configs) {
  return axios.create(configs)
}
