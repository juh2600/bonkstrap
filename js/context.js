if (typeof Bonkstrap == 'undefined') Bonkstrap = {};
if (typeof Bonkstrap.classes == 'undefined') Bonkstrap.classes = {};

Bonkstrap.classes.ctxTest = class {
	constructor(predicate, generator) {
		this.predicate = predicate;
		this.generator = generator;
	}
}

Bonkstrap.classes.ctxItem = class {
	constructor(text, callback) {
		this.text = text;
		this.callback = callback;
	}
}

Bonkstrap.ctxTests = [];
Bonkstrap.destroyCtxMenu = () => {
	let didSomething = false;
	for (let id of ['bonk--ctxMenu', 'bonk--ctxClickCatcher']) {
		let element = document.getElementById(id);
		if (element) {
			element.remove();
			didSomething = true;
		}
	}
	return didSomething;
};
Bonkstrap.ctxHandler = (e) => {
	// if we right-clicked our way out of a menu, destroy menu and stop
	if (Bonkstrap.destroyCtxMenu()) {
		e.preventDefault();
		return;
	}

	let suppressDefaultMenu = false;
	let menu = document.createElement('div');
	menu.id = 'bonk--ctxMenu';
	for (let test of Bonkstrap.ctxTests) if (test.predicate(e)) {
		suppressDefaultMenu = true;
		if (menu.children.length) menu.appendChild(document.createElement('hr'));
		let ol = document.createElement('ol');
		for (let item of test.generator(e)) {
			let li = document.createElement('li');
			li.innerHTML = item.text;
			// callback takes both the click that called it and the event that created the context menu
			li.addEventListener('click', (clk) => {
				Bonkstrap.destroyCtxMenu();
				setTimeout(() => item.callback(clk, e), 1);
			});
			ol.appendChild(li);
		}
		if (ol.children.length) menu.appendChild(ol);
	}
	menu.style.top = e.y + 'px';
	menu.style.left = e.x + 'px';

	let clickCatcher = document.createElement('div')
	clickCatcher.id = 'bonk--ctxClickCatcher';
	clickCatcher.addEventListener('click', Bonkstrap.destroyCtxMenu);

	if (suppressDefaultMenu) e.preventDefault();
	if (menu.children.length) {
		setTimeout(() => {
		document.body.appendChild(clickCatcher);
		document.body.appendChild(menu);
		}, 1);
	}
};

document.addEventListener('contextmenu', Bonkstrap.ctxHandler, false);
