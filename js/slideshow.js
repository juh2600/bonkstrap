if (typeof Bonkstrap == 'undefined') Bonkstrap = {};
if (typeof Bonkstrap.classes == 'undefined') Bonkstrap.classes = {};

Bonkstrap.slideshows = []; // keep a list of them

Bonkstrap.classes.Slideshow = class {
	constructor(root) {
		this.root = root;
		this.imgs = [];
		for (let child of root.children)
			this.imgs.push(child);
		for (let img of this.imgs)
			img.classList.add('bonk--slideshow-item');
		for (let i in this.imgs)
			this.hide(i);
		this._index = -1;

		// add buttons
		this.btns = document.createElement('div');
		this.next = document.createElement('button');
		this.prev = document.createElement('button');
		this.counter = document.createElement('div');
		this.btns.classList.add('bonk--slideshow-btn-ctr');
		this.next.classList.add('bonk--slideshow-btn-next');
		this.prev.classList.add('bonk--slideshow-btn-prev');
		this.counter.classList.add('bonk--slideshow-counter-ctr');
		this.next.innerHTML = '<div class="bonk--slideshow-btn-semicircle">&gt;</div>';
		this.prev.innerHTML = '<div class="bonk--slideshow-btn-semicircle">&lt;</div>';
		this.next.addEventListener('click', () => this.advance());
		this.prev.addEventListener('click', () => this.advance(-1));
		this.btns.appendChild(this.prev);
		this.btns.appendChild(this.next);
		this.root.appendChild(this.btns);

		for (let i in this.imgs) {
			let dot = document.createElement('div');
			dot.classList.add('bonk--slideshow-counter-dot');
			dot.addEventListener('click', () => {
				this.index = i;
			});
			this.counter.appendChild(dot);
	}
		this.root.appendChild(this.counter);
	}

	get index() { return this._index; }
	set index(i) { // main switching logic
		// i is new
		// this.index is old
		console.log(`Switching from ${this.index} to ${i}`);
		if (!this.imgs) return;
		
		// clamp new index to [0, length)
		let max = this.imgs.length;
		while (i < 0) i += max;
		i %= max;
		console.log(`Adjusted: Switching from ${this.index} to ${i}`);

		// don't not move
		if (i == this.index) return;

		// do the thing
		if (this.imgs[this.index])
			this.hide(this.index);
		this.show(i);

		// we have arrived
		this._index = i;
	}

	show(i) {
		this.imgs[i].classList.remove('bonk--slideshow-item-hidden');
		if (this.counter && this.counter.children && this.counter.children[i])
			this.counter.children[i].classList.add('bonk--slideshow-counter-current');
	}

	hide(i) {
		this.imgs[i].classList.add('bonk--slideshow-item-hidden');
		if (this.counter && this.counter.children && this.counter.children[i])
			this.counter.children[i].classList.remove('bonk--slideshow-counter-current');
	}

	advance(count = 1) { this.index += count; }

	get name() {
		return this.root.id;
	}
}

Bonkstrap.createSlideshow = (root) => {
	Bonkstrap.slideshows.push(new Bonkstrap.classes.Slideshow(root));
};

document.addEventListener('DOMContentLoaded', () => {
	for (let slideshowRoot of document.querySelectorAll('[data-bonk-slideshow]')) Bonkstrap.createSlideshow(slideshowRoot);
	for (let show of Bonkstrap.slideshows) show.advance();
});
