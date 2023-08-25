/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			// backgroundImage: {
			// 	skeleton:
			// 		"background: linear-gradient(90deg, transparent,#ebebeb,transparent)",
			// },
			fontFamily: {
				poppins: ["Nunito", "sans-serif"],
			},
			keyframes: {
				shimmer: {
					"100%": {
						transform: "translateX(100%)",
					},
				},
				popUp: {
					"100%": {
						opacity: 1,
						transform: "translate3d(0, 0,0)",
					},
				},
				fadeIn: {
					'100%': {
						opacity: 1,
					}
				}
			},
			animation: {
				shimmer: "shimmer 1.5s infinite",
				popUp: "popUp .3s forwards",
				fadeIn: "fadeIn .4s forwards",
			},
			gridTemplateColumns: {
				dropdown: "230px minmax(230px, 1fr) 230px",
			},
		},
	},

	plugins: [],
};
