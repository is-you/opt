import cytoscape from 'cytoscape';
import {config} from './config';

/** future class fields **/
const cy = cytoscape(config);
const socket_width = 30;
const socket_margin = 20;
const img_R_bg_width = 100;
const img_B_bg_width = 200;
const decors = {
	icon: 0,
	imgB: img_B_bg_width,
	imgR: img_R_bg_width,
	decor: 0,
};
let selected_node = null;
let node_connect = null;
let id_counter = 1;

/** test func **/
function table() {
//	const data = {
//		pos: {x: 100, y: 100},
//		grid: {rows: 5, cols: 2},
//		decor: 'imgR',
//		id: 'data',
//	};
//	const data2 = {
//		pos: {x: 400, y: 100},
//		grid: {rows: 2, cols: 5},
//		decor: 'icon',
//		id: 'data2',
//	};
//	const data3 = {
//		pos: {x: 700, y: 100},
//		grid: {rows: 3, cols: 3},
//		decor: 'none',
//		id: 'data3',
//	};
//
//	buildPanel(data2);
//	buildPanel(data3);
	contextMenu();
}

/** create panel **/
function createPanel(dom_el, pos) {
	const data = {
		pos: {x: 200, y: 200},
		grid: {rows: dom_el.dataset.rows, cols: dom_el.dataset.cols},
		decor: dom_el.dataset.decor,
		id: ('data' + id_counter),
	};
	id_counter++;
	buildPanel(data);
}

/** context menu **/
function contextMenu() {
	const el_btns = document.querySelectorAll('.device_list__item');
	el_btns.forEach((el) => el.addEventListener('click', () => createPanel(el)));

	cy
		.on('cxttap', function (evt) {
			console.log(evt.target);
		})
		.on('click', function (evt) {
			console.log('tap');
		});
}

/** all in one https://github.com/cytoscape/cytoscape.js/blob/unstable/documentation/md/events.md **/
function events(nodes) {
	nodes
		.on('mousedown', function (evt) {
			selected_node = evt.target;
			node_connect = evt.target;
			selected_node.lock();
			selected_node.select();
			console.log('+');
			cy.on('mouseup', onend);
		})
		.on('cxttap', function (evt) {
			console.log('cxttap');
		})
		.on('tap', function (evt) {
			console.log('tap');
		})
		.on('mouseover', function (evt) {
			console.log('mouseover');
			if (selected_node !== null && selected_node !== node_connect) {
				node_connect = evt.target;
				node_connect.addClass('mouseover');
				console.log('over + drag');
				// const edge = cy.elements(`edge[source = ${selected_node.id()}]`);
			}
		})
		.on('mouseout', function (evt) {
			if (node_connect !== null) {
				node_connect.removeClass('mouseover');
				node_connect = null;
				console.log('mouseout');
			}
		});

	function onend(evt) {
		if (node_connect !== null && selected_node !== node_connect) {
			cy.add(edgeSocket(selected_node, node_connect));
			node_connect.removeClass('mouseover');
		}
		if (selected_node !== null) {
			selected_node.unlock();
			selected_node.unselect();
		}

		selected_node = null;
		node_connect = null;
		cy.off('mouseup', onend);
		console.log('-');
	}
}

/** create test nodes **/
function buildPanel(data) {
	const eles_data = {
		nodes: [
			...buildSocketPanel(data),
			...buildGridSockets(data),
		],
	};
	cy.add(eles_data);
	const sockets = cy.$(`.socket[parent = "${data.id}"]'`);
	events(sockets, cy);
}

/** create nodes for panel **/
function buildSocketPanel(data) {
	const node_decor = (data.decor === 'icon') ? nodeIcon(data) : nodeImage((data));
	const socket_nodes = [
		nodeWrapper(data),
		node_decor,
		nodePanel(data),
	];
	if (data.decor === 'icon') {
		socket_nodes.push(nodeShadow(data));
	}

	return socket_nodes;
}

/** create socket grid **/
function buildGridSockets(data) {
	const sockets = new Array((data.grid.rows * data.grid.cols));
	const margin = (data.decor === 'none') ? 0 : ((decors[data.decor] / 2.5) + (socket_width + socket_margin));

	for (let row = 1, col = 1, i = 0, length = sockets.length - 1; i <= length; i++, col++) {
		const node_data = {
			title: (i + 1),
			parent: 'p',
			pos: {
				x: data.pos.x + ((col - 1) * (socket_width + socket_margin)),
				y: data.pos.y + margin + ((row - 1) * (socket_width + socket_margin)),
			},
			id: data.id,
		};
		sockets[i] = nodeSocket(node_data);

		// console.log(`index: ${(i+1)}, cal: ${col}, row: ${row} ${sockets[i] }`);

		if (col % data.grid.cols === 0) {
			col = 0;
			row++;
		}
	}
	return sockets;
}

/** Specific table socket node https://js.cytoscape.org/#notation/elements-json **/
function nodeSocket(data) {
	console.log(data.id);
	return {
		data: {
			title: data.title,
			parent: data.id,
		},
		classes: ['socket'],
		position: data.pos,
		grabbable: false,
	};
}

/** Specific table panel node https://js.cytoscape.org/#notation/elements-json **/
function nodePanel(data) {
	console.log(data.id);
	return {
		data: {
			id: data.id,
			parent: 'wrapper' + data.id,
		},
		classes: ['panel'],
	};
}

/** Specific table wrapper node **/
function nodeWrapper(data) {
	return {
		data: {
			id: 'wrapper' + data.id,
		},
		classes: ['wrapper'],
	};
}

/** Specific table icon node **/
function nodeIcon(data) {
	const pos = {y: data.pos.y, x: data.pos.x + 5};

	return {
		data: {
			parent: 'wrapper' + data.id,
		},
		classes: ['icon'],
		position: pos,
		selectable: false,
		grabbable: false,
	};
}

/** Specific table image node **/
function nodeImage(data) {
	const panel_width = data.grid.cols * (socket_margin + socket_width);
	const pos_x = data.pos.x - socket_margin + ((panel_width / 2));
	const pos_y = data.pos.y + (decors[data.decor] / 2.5 / 2);
	const pos = {y: pos_y, x: pos_x};

	return {
		data: {
			parent: 'wrapper' + data.id,
			width: decors[data.decor],
			height: decors[data.decor] / 2.5,
		},
		classes: ['image'],
		position: pos,
		selectable: false,
		grabbable: false,
	};
}

/** Specific table shadow node for imitate top padding **/
function nodeShadow(data) {
	const pos = {y: data.pos.y + socket_margin, x: data.pos.x};
	return {
		data: {
			parent: data.id,
			padding: '20',
		},
		position: pos,
		classes: ['shadow'],
	};
}

/** create edge  **/
function edgeSocket(socket_a, socket_b) {
	const socket_a_id = socket_a.id();
	const socket_b_id = socket_b.id();
	return {
		data: {source: socket_a_id, target: socket_b_id},
		classes: ['cable'],
	};
}

export default table;
