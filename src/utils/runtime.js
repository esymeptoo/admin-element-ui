const configs = {
  development: {
    apiBaseUrl: 'https://www.esymeptoo.com/api/v1/',
  },
  production: {
    apiBaseUrl: 'https://www.esymeptoo.com/api/v1/',
  },
}

export default (configs[process.env.NODE_ENV] || {})
