// TODO: import these from the annotations files for this theme
var annotations = [
	{
		type: 'body-text',
		rules: [
			{ 'property': 'font-size', 'value': '16px' },
		],
		selector: 'body, button, input, select, textarea'
	},
	{
		type: 'headings',
		rules: [
			{ 'property': 'font-size', 'value': '33px' },
		],
		selector: '.entry-title'
	},
	{
		type: 'headings',
		rules: [
			{ 'property': 'font-size', 'value': '18px' },
		],
		selector: '.site-title'
	},
];

module.exports = annotations;
