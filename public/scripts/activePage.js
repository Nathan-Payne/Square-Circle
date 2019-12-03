let currentPage = location.pathname;
let navElements = document.querySelectorAll("nav a")
navElements.forEach(el => {
    if (currentPage == `/${el.id}`){
        el.className += "activePage";
    };
});

// console.log(navElements, currentPage);