module.exports = {
  globDirectory: 'web-build/',
  globPatterns: ['**/*.{js,ttf,ico,html,json}'],
  swDest: 'web-build/service-worker.js',
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
}
