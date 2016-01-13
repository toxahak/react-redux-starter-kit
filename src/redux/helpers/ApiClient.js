import superagent from 'superagent'

const methods = ['get', 'post', 'put', 'patch', 'del']

function formatUrl (path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path
  // Prepend `/api` to relative URL, to proxy to API server.
  return '/api' + adjustedPath
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor (req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path))

        if (__DEBUG__) {
          request.set('X-Forwarded-Host', 'localhost:3000')
        }

        if (params) {
          request.query(params)
        }

        if (data) {
          request.send(data)
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body))
      }))
  }
}

const ApiClient = _ApiClient

export default ApiClient