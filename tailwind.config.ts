
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				inter: ["Inter", "sans-serif"],
				playfair: ["Playfair Display", "serif"]
			},
			colors: {
				espresso: {
					50: "hsl(25, 20%, 95%)",
					100: "hsl(25, 20%, 85%)",
					200: "hsl(25, 25%, 75%)",
					300: "hsl(25, 25%, 65%)",
					400: "hsl(25, 30%, 50%)",
					500: "hsl(25, 35%, 35%)",
					600: "hsl(25, 35%, 25%)",
					700: "hsl(25, 35%, 20%)",
					800: "hsl(25, 40%, 15%)",
					900: "hsl(25, 45%, 10%)"
				},
				forest: {
					50: "hsl(145, 20%, 95%)",
					100: "hsl(145, 20%, 85%)",
					200: "hsl(145, 22%, 75%)",
					300: "hsl(145, 24%, 65%)",
					400: "hsl(145, 25%, 50%)",
					500: "hsl(145, 25%, 35%)",
					600: "hsl(145, 28%, 28%)",
					700: "hsl(145, 30%, 22%)",
					800: "hsl(145, 32%, 18%)",
					900: "hsl(145, 35%, 12%)"
				},
				sand: {
					50: "hsl(35, 40%, 98%)",
					100: "hsl(35, 40%, 95%)",
					200: "hsl(35, 40%, 90%)",
					300: "hsl(35, 42%, 85%)",
					400: "hsl(35, 45%, 80%)",
					500: "hsl(35, 45%, 75%)",
					600: "hsl(35, 48%, 70%)",
					700: "hsl(35, 50%, 65%)"
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Legacy coffee colors (keeping for backwards compatibility)
				coffee: {
					50: '#fdfcfc',
					100: '#f7f3f0',
					200: '#ede4db',
					300: '#dcc8b8',
					400: '#c4a284',
					500: '#a67c52',
					600: '#8b5a3c',
					700: '#6b4423',
					800: '#4a2c14',
					900: '#2d1a0a',
				},
				cream: {
					50: '#fefdf9',
					100: '#fefbf3',
					200: '#fdf4e3',
					300: '#fae9c8',
					400: '#f5d79e',
					500: '#efc16b',
					600: '#e5a53f',
					700: '#d18a1f',
					800: '#a86d18',
					900: '#7a4f12',
				},
				gold: {
					50: '#fffef7',
					100: '#fffbeb',
					200: '#fef3c7',
					300: '#fde68a',
					400: '#facc15',
					500: '#eab308',
					600: '#ca8a04',
					700: '#a16207',
					800: '#854d0e',
					900: '#713f12',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'float': 'float 3s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
