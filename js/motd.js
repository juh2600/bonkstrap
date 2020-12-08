if (typeof Bonkstrap == 'undefined') Bonkstrap = {};
if (typeof Bonkstrap.classes == 'undefined') Bonkstrap.classes = {};

Bonkstrap.motdRecpts = [];
Bonkstrap.updateMOTDs = () => {
	for (let mR of Bonkstrap.motdRecpts) mR.update();
};

Bonkstrap.classes.MOTDRecipient = class {
	constructor(node) {
		this.node = node;
	}

	update() {
		console.log('Updating...', this);
		console.log('calling ' + this.node.dataset.bonkMotd);
		const wrapper = async () => { return eval(this.node.dataset.bonkMotd); };
		wrapper().then(content => {
			this.node.innerHTML = content;
		}).catch(console.error);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	for (let motdRecpt of document.querySelectorAll('[data-bonk-motd]'))
		Bonkstrap.motdRecpts.push(new Bonkstrap.classes.MOTDRecipient(motdRecpt));
	Bonkstrap.updateMOTDs();
});
