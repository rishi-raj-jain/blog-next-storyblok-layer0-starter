// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
const { Router } = require('@layer0/core/router')
const { nextRoutes } = require('@layer0/next')

module.exports = new Router()
  .get('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  .get('/__layer0__/:path*.js', ({ cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24 * 365,
      },
      edge: {
        staleWhileRevalidateSeconds: 1,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    })
  })
  .get('/_next/data/:version/:productId*.json', ({ cache }) => {
    cache({
      browser: {
        maxAgeSeconds: 0,
        serviceWorkerSeconds: 60 * 60 * 24 * 365,
      },
      edge: {
        staleWhileRevalidateSeconds: 1,
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
    })
  })
  .use(nextRoutes)
