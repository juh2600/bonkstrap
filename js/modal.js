if (typeof Bonkstrap == 'undefined') Bonkstrap = {};

Bonkstrap.createModal = (header, content) => {
	return Bonkstrap.createModalRaw(`<h1 class="bonk--auto-dialog-header">${header}</h1>${content}`);
};

Bonkstrap.createModalDetails = (header, content) => {
	return Bonkstrap.createModalRaw(`<details class="bonk--auto-dialog-details"><summary>${header}</summary>${content}</details>`);
};

Bonkstrap.createModalRaw = (content) => {
	const dialog = document.createElement('dialog');
	dialog.classList.add('bonk--auto-dialog');
	const closeButton = document.createElement('button')
	closeButton.classList.add('bonk--auto-dialog-close');
	closeButton.addEventListener('click', () => {
		dialog.remove();
	});

	dialog.innerHTML = content;
	closeButton.innerHTML = '&times;';
	dialog.appendChild(closeButton);
	document.querySelector('body').appendChild(dialog);
	dialog.showModal();
	return dialog;
};
