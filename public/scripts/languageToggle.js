let langButton = document.querySelector('button.changeLang');
let engDesc = document.querySelector('#engDesc');
let lithDesc = document.querySelector('#lithDesc');
let titleEng = document.querySelector('#titleEng');
let titleLith = document.querySelector('#titleLith');
langButton.addEventListener('click', () => {
	engDesc.classList.toggle('activeTab');
	lithDesc.classList.toggle('activeTab');
	titleEng.classList.toggle('activeTab');
	titleLith.classList.toggle('activeTab');
});
