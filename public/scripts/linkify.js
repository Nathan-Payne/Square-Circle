function linkify(textarr) {
	let urlRegex = /(https?:\/\/[^\s]+)/g;
	let linkarr = [];
	textarr.forEach((text) => {
		let newText = text.innerText.replace(urlRegex, (url) => {
			return `<a href="${url}">${url}</a>`;
		});
		linkarr.push(newText);
	});
	return linkarr;
}
textToCheck = document.querySelectorAll('p');
replacedUrls = linkify(textToCheck);
textToCheck.forEach((text, i) => {
	textToCheck[i].innerHTML = replacedUrls[i];
});
