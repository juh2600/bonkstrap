if (typeof Bonkstrap == 'undefined') Bonkstrap = {};
if (typeof Bonkstrap.classes == 'undefined') Bonkstrap.classes = {};

Bonkstrap.classes.NavTree = class {
	constructor(anchor, name) {
		this.anchor = anchor;
		this.name = name;
		this.children = [];
	}

	toDOM() {
		let li = document.createElement('li');
		li.dataset.name = this.anchor;
		let a = document.createElement('a');
		a.href = '#' + this.anchor;
		a.innerHTML = this.name;
		li.appendChild(a);
		if (this.children.length) {
			let ul = document.createElement('ul');
			for (let child of this.children)
				ul.appendChild(child.toDOM());
			li.appendChild(ul);
		}
		return li;
	}
};

Bonkstrap.generateArticleNav = (article) => {
	// If the article already has a nav tag, pass
	if ([...article.getElementsByTagName('nav')].length)
		return;

	// looks for an h_n inside a header; if not, then an h_n that isn't in a header will do
	const extractHeadingText = (element) => {
		let target = element;
		if (target) {
			if (target.querySelector('header')) target = target.querySelector('header');
			target = target.querySelector('h1, h2, h3, h4, h5, h6');
			if (target) {
				return target.innerHTML;
			}
		}
	};

	// Article is top level
//	let tree = new Bonkstrap.classes.NavTree(article.id, extractHeadingText(article));
//	for (let section of [...article.getElementsByTagName('section')])
//		tree.children.push(new Bonkstrap.classes.NavTree(section.id, extractHeadingText(section)));

	const buildTree = (element) => {
		let tree = new Bonkstrap.classes.NavTree(element.id, extractHeadingText(element));
		for (let child of element.querySelectorAll('article, section')) {
			tree.children.push(buildTree(child));
		}
		return tree;
	}
	const tree = buildTree(article).toDOM();
	let root = document.createElement('ul');
	let nav = document.createElement('nav');
	root.appendChild(tree);
	nav.appendChild(root);
	let label = document.createElement('label');
	label.htmlFor = `article-nav-toggle-${tree.dataset.name}`;
	label.innerHTML = `Navigate within this article: ${tree.dataset.name}`;
	nav.prepend(label);
	let input = document.createElement('input');
	input.type = 'checkbox';
	input.id = `article-nav-toggle-${tree.dataset.name}`;
	nav.prepend(input);
	article.appendChild(nav);
	return nav;

	// so it looks like this
	// article
	//   header
	//     hn
	//   stuff?
	//   section
	//     header
	//       hn
	//   section
	//     header
	//       hn
	//   section
	//     header
	//       hn
	//   nav

	//console.log(tree);
};

document.addEventListener('DOMContentLoaded', () => {
	for (let article of document.getElementsByTagName('article')) {
		Bonkstrap.generateArticleNav(article);
	}
});
