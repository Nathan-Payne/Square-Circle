let thumbnail = document.getElementsByClassName('thumbnail');
//thumbProjects is array of selected stringified project fields required for thumbnail

var windowSize = window.matchMedia('(max-width: 767px)');
windowSize.addListener(disableGrid); //attaches listener function on state change to <767px
disableGrid(windowSize); //call listener funct

function disableGrid(x) {
	if (x.matches) {
		//gives all images unique id and remove grid positioning when windowSize<767px
		for (i = 0; i < thumbProjects.length; i++) {
			thumbnail[i].setAttribute('id', `image${i + 1}`);

			thumbnail[i].removeAttribute('style');
			thumbnail[i].removeAttribute('style');
		}
	} else {
		for (i = 0; i < thumbProjects.length; i++) {
			thumbnail[i].setAttribute('id', `image${i + 1}`);

			//for each thumbnail set grid positions from their retrieved database values (windowSize>767px)
			thumbnail[i].style.gridColumnStart = thumbProjects[i].xPosition;
			thumbnail[i].style.gridRowStart = thumbProjects[i].yPosition;
			thumbnail[i].style.transform = `translate(${thumbProjects[i].xFine}rem, ${thumbProjects[i].yFine}rem)`;
		}
	}
}
