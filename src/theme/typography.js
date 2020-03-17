import Typography from 'typography';
import config from '../../config/SiteConfig.ts';

const typography = new Typography({
	baseFontSize: config.baseFontSize,
	baseLineHeight: 0.1,
	scaleRatio: 3.157,
	// scaleRatio: 1.66,
	headerFontFamily: [config.headerFontFamily, 'sans-serif'],
	bodyFontFamily: [config.bodyFontFamily, 'sans-serif'],
	headerWeight: 700,
	googleFonts: [
		{
			name: config.headerFontFamily,
			styles: ['700'],
		},
		{
			name: config.bodyFontFamily,
			styles: ['400'],
		},
	],
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
	typography.injectStyles();
}

export default typography;
