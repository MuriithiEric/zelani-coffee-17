
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
				inter: ["Jost", "sans-serif"],
				playfair: ["Jost", "sans-serif"],
				fredoka: ["Jost", "sans-serif"],
				jost: ["Jost", "sans-serif"]
			},
			colors: {
				espresso: {
					50: "hsl(60, 9%, 97%)",
					100: "hsl(60, 6%, 93%)",
					200: "hsl(60, 5%, 87%)",
					300: "hsl(60, 4%, 75%)",
					400: "hsl(60, 3%, 58%)",
					500: "hsl(60, 3%, 42%)",
					600: "hsl(60, 4%, 30%)",
					700: "hsl(60, 5%, 20%)",
					800: "hsl(60, 6%, 12%)",
					900: "hsl(60, 8%, 7%)"
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
				// Brand colors: near-black neutrals + lime accent
				coffee: {
					50: '#f9f9f6',
					100: '#eeeeea',
					200: '#dededa',
					300: '#c2c2bc',
					400: '#949490',
					500: '#6b6b66',
					600: '#4d4d48',
					700: '#343430',
					800: '#1f1f1c',
					900: '#131311',
				},
				cream: {
					50: '#fafaf5',
					100: '#f3f3ec',
					200: '#e3e3d9',
					300: '#c7c7b9',
					400: '#adad9c',
					500: '#94947f',
					600: '#7a7a63',
					700: '#5f5f4a',
					800: '#454533',
					900: '#2c2c1f',
				},
				gold: {
					50: '#fefaf0',
					105: '#fcf2d9',
					100: '#fcf2d9',
					200: '#f7e1b2',
					300: '#f2cb85',
					400: '#edb059',
					500: '#c89547',
					600: '#b37e38',
					700: '#96632c',
					800: '#794a22',
					900: '#4b2e16',
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
