module.exports = {
	globDirectory: "web-dist/",
	globPatterns: [
		"**/*.{js,css,html,png,jpg,jpeg,svg,ico,json,woff,woff2,ttf,eot}",
	],
	swDest: "dist/service-worker.js",
	ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/fonts\.googleapis\.com/,
			handler: "StaleWhileRevalidate",
			options: {
				cacheName: "google-fonts-stylesheets",
			},
		},
		{
			urlPattern: /^https:\/\/fonts\.gstatic\.com/,
			handler: "CacheFirst",
			options: {
				cacheName: "google-fonts-webfonts",
				expiration: {
					maxEntries: 30,
					maxAgeSeconds: 60 * 60 * 24 * 365,
				},
			},
		},
		{
			urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
			handler: "CacheFirst",
			options: {
				cacheName: "images",
				expiration: {
					maxEntries: 60,
					maxAgeSeconds: 30 * 24 * 60 * 60,
				},
			},
		},
	],
};
