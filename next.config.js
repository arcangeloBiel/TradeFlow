/** @type {import('next').NextConfig} */

// Workaround para erro de SSL em ambiente corporativo (apenas desenvolvimento)
if (process.env.NODE_ENV === 'development') {
	console.log('🛡️  SSL Bypass ativado (NODE_TLS_REJECT_UNAUTHORIZED = 0)')
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
		],
	},
}

module.exports = nextConfig
