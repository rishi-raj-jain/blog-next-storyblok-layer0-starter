const { withLayer0, withServiceWorker } = require('@layer0/next/config')

module.exports = withLayer0(
  withServiceWorker({
    layer0SourceMaps: true,
    reactStrictMode: true,
    future: {
      webpack5: true,
    },
    webpack: (config, { isServer, dev }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false
      }
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
        })
      }
      return config
    },
  })
)
