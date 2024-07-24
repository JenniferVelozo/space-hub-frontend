import { Logger } from './utils/logs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules:[
		'@pinia/nuxt',
		'@sidebase/nuxt-session',
		'nuxt-security',
		'nuxt-primevue'
	],
	runtimeConfig: {
		public: {
			backBaseUrl: process.env.NUXT_PUBLIC_BACK_BASE_URL,
			baseUrl: process.env.BASE_URL
		}
	},
	components: true,
	session: {
		session: {
			expiryInSeconds: 3600,
			cookieSameSite: 'lax',
			cookieSecure: true,
			cookieHttpOnly: true,
			storageOptions: {
				driver: 'memory',
				options: {},
			},
			domain: false,
		},
	},
	primevue: {
		options: {
			ripple: true,
		},
		components: {
			include: [
				'Toast',
			],
		},
	},
	devtools: { enabled: true },

	css: ['@/assets/style.scss', 'primevue/resources/themes/aura-light-teal/theme.css'],

	plugins: [
		'~/plugins/axios.ts',
	],
	imports: {
		dirs: ['stores'],
	},
	vite: {
		build: {
			sourcemap: false,
		},
	},
	hooks: {
		ready(nuxt) {
			const logger = new Logger()
			logger.info({
				message: `Ready nuxt app ${nuxt._version}`,
				context: 'nuxt:app',
				labels: ['init', 'server', 'client'],
			})
		},
		listen() {
			const logger = new Logger()
			logger.info({
				message: 'Listen nuxt app on port 3000',
				context: 'nuxt:app',
				labels: ['init', 'server', 'client'],
			})
		},
		close() {
			const logger = new Logger()
			logger.warn({
				message: 'Nuxt app stopped',
				context: 'nuxt:app',
				labels: ['init', 'server', 'client'],
			})
		},
	},
	security: {
		rateLimiter: {
			tokensPerInterval: 150,
			interval: 'hour',
			//fireImmediately: false,
			//route: '/**',
		},
		headers: {
			contentSecurityPolicy: {
				// img-src * 'self' data: https:
				'base-uri': ["'self'"],
				'font-src': ["'self'", 'https:', 'data:'],
				'form-action': ["'self'"],
				'frame-ancestors': ["'self'"],
				'img-src': ['*', "'self'", 'data:', 'https:'],
				'object-src': ["'none'"],
				'script-src': ["'self'", 'https:', "'unsafe-inline'", "'unsafe-eval'"],
				'script-src-attr': ["'none'"],
				'style-src': ["'self'", 'https:', "'unsafe-inline'"],
				'upgrade-insecure-requests': true,
				//value: "base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src * 'self' data: https:;object-src 'none';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
				//route: '/**',
			},
			crossOriginEmbedderPolicy: 'unsafe-none',
		},
		allowedMethodsRestricter: {
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
		},
	},
})
