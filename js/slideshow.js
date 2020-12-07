if (typeof Bonkstrap == 'undefined') Bonkstrap = {};

Bonkstrap.slideshows = []; // keep a list of them

class Slideshow {
	constructor(root) {
		this.imgs = [];
		for (let child of root.children)
			this.imgs.push(child);
		for (let img of this.imgs)
			img.classList.add('bonk--slideshow-item');
		for (let i in this.imgs)
			this.hide(i);
		this._index = null;
		this.index = 0;

		// add buttons
		this.next = document.createElement('button');
		this.prev = document.createElement('button');
		this.next.classList.add('bonk--slideshow-btn-next');
		this.prev.classList.add('bonk--slideshow-btn-prev');
		this.next.innerHTML = '&gt;';
		this.prev.innerHTML = '&lt;';
		this.next.addEventListener('click', () => this.advance());
		this.prev.addEventListener('click', () => this.advance(-1));
		root.append(this.next);
		root.prepend(this.prev);
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
		this.show(i);
		if (this.imgs[this.index])
			this.hide(this.index);

		// we have arrived
		this._index = i;
	}

	show(i) { this.imgs[i].classList.remove('bonk--slideshow-item-hidden'); }
	hide(i) { this.imgs[i].classList.add('bonk--slideshow-item-hidden'); }

	advance(count = 1) { this.index += count; }
}

Bonkstrap.createSlideshow = (root) => {
	Bonkstrap.slideshows.push(new Slideshow(root));
};

document.addEventListener('DOMContentLoaded', () => {
	for (let slideshowRoot of document.getElementsByClassName('bonk-slideshow')) Bonkstrap.createSlideshow(slideshowRoot);
});
