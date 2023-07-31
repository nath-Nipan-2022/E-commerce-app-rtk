/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				skeleton: {
					400: `rgb(0,0,0,0.25)`,
					500: `rgba(0,0,0,0.5)`,
				},
			},
			backgroundSize: {
				"x-dbl-y-full": "200% 100%",
			},
			keyframes: {
				shimmer: {
					"100%": {
						backgroundPosition: "-150% 0%",
					},
				},
			},
			animation: {
				shimmer: "shimmer 1.5s infinite",
			},
		},
	},

	plugins: [],
};
