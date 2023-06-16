const style = [ // https://js.cytoscape.org/#style
	{
		selector: '.panel',
		style: {
			events: 'no',
		},
	},

	{
		selector: '.wrapper',
		style: {
			'background-opacity': 0,
			'border-width': 0,
		},
	},

	{
		selector: '.icon',
		style: {
			'events': 'no',
			'width': '40px',
			'height': '40px',
			'shape': 'rectangle',
			'background-image': 'url(/img/panel.png)',
			'background-fit': 'cover',
		},
	},

	{
		selector: '.image',
		style: {
			'events': 'no',
			'width': 'data(width)',
			'height': 'data(height)',
			'shape': 'rectangle',
			'background-image': 'url(/img/panel.png)',
			'background-fit': 'cover',
		},
	},

	{
		selector: '.shadow',
		style: {
			'background-opacity': 0,
			'border-width': 0,
			'events': 'no',
			'height': 'data(padding)',
		},
	},

	{
		selector: '.socket',
		style: {
			'background-color': '#333333',
			'border-width': 2,
			'border-color': '#333333',
			'label': 'data(title)',
			'padding': 0,
		},
	},

	{
		selector: '.mouseover',
		style: {
			'border-width': 2,
			'border-color': 'green',
			'padding': 0,
			'background': 'none',
			'events': 'no',
		},
	},

	{
		selector: '.socket:selected',
		style: {
			'border-width': 2,
			'border-color': 'red',
			'padding': 0,
			'background': 'none',
			'events': 'no',
		},
	},

	{
		selector: '.cable',
		style: {
			'width': 3,
			'line-color': '#ccc',
			'target-arrow-color': '#ccc',
			'curve-style': 'bezier',
		},
	},

	{
		selector: 'node:parent',
		style: {
			'label': '',
		},
	},
];

const layout = {
	name: 'grid',
	rows: 1,
//	fit: true, // whether to fit the viewport to the graph
//	padding: 30,
//	avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
//	avoidOverlapPadding: 10,
//	position: function (node) {
//		console.log(node);
//		return {row: i++, col: 0};
//	},
};

export const config = {
	container: document.querySelector('.table'),
	zoom: 1,
	minZoom: 0,
	maxZoom: 1e50,
	pan: {x: 0, y: 0},
	wheelSensitivity: .2,
	pixelRatio: 'auto',
	style: style,
	layout: layout,
};
