import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				// Cores da identidade visual da Havan
				primary: {
					DEFAULT: '#003366', // Azul Royal/Vivo
					50: '#E6F0F5',
					100: '#CCE1EB',
					200: '#99C3D7',
					300: '#66A5C3',
					400: '#3387AF',
					500: '#003366',
					600: '#002952',
					700: '#001F3D',
					800: '#001429',
					900: '#000A14',
				},
				secondary: {
					DEFAULT: '#FFFFFF',
					50: '#F9F9F9',
					100: '#F3F3F3',
					200: '#E7E7E7',
					300: '#DBDBDB',
				},
				gray: {
					50: '#F9FAFB',
					100: '#F3F4F6',
					200: '#E5E7EB',
					300: '#D1D5DB',
					400: '#9CA3AF',
					500: '#6B7280',
					600: '#4B5563',
					700: '#374151',
					800: '#1F2937',
					900: '#111827',
				},
			},
			fontFamily: {
				sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
export default config

