let langButton = document.querySelector('button.changeLang');
let engDesc = document.querySelector('#engDesc');
let lithDesc = document.querySelector('#lithDesc');
langButton.addEventListener('click', () => {
	engDesc.classList.toggle('activeTab');
	lithDesc.classList.toggle('activeTab');
});
