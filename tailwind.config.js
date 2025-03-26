/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				black: '#191C1F',
				'black-hover': '#4D5257',

				'primary-grey': '#75808A',
				'secondary-grey': '#DFE3E7',
				'light-grey': '#F7F7F7',

				'on-grey-hover': '#EFEFEF',
				'on-grey-active': '#E8E8E8',
				'on-white-hover': '#F7F7F7', //same as light-grey
				'on-white-active': '#EFEFEF', //same as on-grey-hover
				'on-violet-hover': '#7A57E8',
				'on-violet-active': '#7453DC',

				'primary-violet': '#805CF5',
				'secondary-violet': '#F2EEFE',

				'error-red': '#B51F2D',
				'secondary-error-red': '#FDE3E5',

				field: '#EDEFF2',
				'field-state': '#DFE3E7',
				'field-helper': '#75808A', //same as primary-grey
				'field-helper-hover': '#636D75',
				'field-helper-active': '#525A61',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
