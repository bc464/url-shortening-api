let modalToggle = false;
const modalContainer = document.querySelector(".modal-container");
const mobileModal = document.querySelector(".mobile-modal");
const btnMobileNav = document.querySelector(".btn-mobile-nav");
const iconMobileNav = document.querySelector(".icon-mobile-nav");
const menuOutline = document.getElementById("menu-outline");
const closeOutline = document.getElementById("close-outline")
const heroHeadingMobile =  document.querySelector(".hero-heading");

window.onresize = function () {
	if(!modalToggle || window.innerWidth > 400) {
		modalContainer.style.display = "none";
		mobileModal.style.display = "none";

	}
	if (modalToggle && window.innerWidth < 400) {
		modalContainer.style.display = "block";
		mobileModal.style.display = "block";
	}
};

btnMobileNav.addEventListener("click", function () {
	if(!modalToggle) {
		modalToggle = true;
		modalContainer.style.display = "block";
		mobileModal.style.display = "block";
		closeOutline.style.display = "block"
		menuOutline.style.display = "none";
		heroHeadingMobile.classList.add("hero-heading-mobile")


	} else {
		modalToggle = false;
		modalContainer.style.display = "none";
		mobileModal.style.display = "none";
		menuOutline.style.display = "block"
		closeOutline.style.display = "none"
		heroHeadingMobile.classList.remove("hero-heading-mobile")
	}
})


const form = document.querySelector(".URL-form");
const URLinput = document.getElementById("URL-input");
const BtnShortenIt = document.querySelector(".shorten-it");
const URLresultsContainer = document.querySelector(".url-results-container");
const URLresultsText = document.querySelector(".url-result-text");
const error = document.querySelector(".error");

form.addEventListener("submit", addURL);

window.addEventListener("DOMContentLoaded", setupItems);

function addURL(e) {
	e.preventDefault();
	const value = URLinput.value;
	const id = new Date().getTime().toString();
	const shortenAPI = `https://api.shrtco.de/v2/shorten?url=${value}`;

	if(value !== "") {

	fetch(shortenAPI)
    .then(res => res.json())
    .then(res2 => {
      const result = res2.result.full_short_link;

    const element = document.createElement("div");
	let attr = document.createAttribute("data-id");
		attr.value = id;
		element.setAttributeNode(attr);
		element.classList.add("url-result-text");
		element.innerHTML = `<div class="url-test">
          <p>${value}</p>
        </div>
        <div class="url-outcome flex">
          <p>${result}</p>
          <button class="btn btn-copy">Copy</button>
          <button class="btn btn-copied">Copied!</button>
        </div> `;

        URLresultsContainer.appendChild(element);

        URLresultsContainer.classList.add("show-container");

        addToLocalStorage(id, value, result);

    	setBackToDefault();

		const btnCopy = document.querySelectorAll(".btn-copy");
		const btnCopied = document.querySelector(".btn-copied");
		btnCopy.forEach(function(btn){
		btn.addEventListener("click", function(e) {

		const copiedLink = e.target.previousElementSibling.textContent;
		navigator.clipboard.writeText(copiedLink);
		
			btn.style.backgroundColor = "var(--clr-dark-violet-primary)";
			btn.style.color = "white"
			btn.textContent = "Copied"
		})
	})
	
	}).catch(err => {
		if(err) {
			error.style.display = "block";
			URLinput.style.border = "1px solid red";
			URLinput.value = "";
		}
	})
	}
}

function setBackToDefault() {
	URLinput.value = "";
	error.style.display = "none";
			URLinput.style.border = "none";
}



// LOCAL STORAGE 
function  addToLocalStorage(id, value, result) {
	const URL = {id, value, result};
	let items = getLocalStorage();
	items.push(URL);
	localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
	return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

// SETUP ITEMS

function setupItems() {
	let items = getLocalStorage();

	if(items.length > 0) {
		items.forEach(function(item) {
			createURLitem(item.id, item.value, item.result);
		});
		URLresultsContainer.classList.add("show-container");
	}
}

function createURLitem(id, value, result) {
	const element = document.createElement("div");
		let attr = document.createAttribute("data-id");
		attr.value = id;
		element.setAttributeNode(attr);
		element.classList.add("url-result-text");
		element.innerHTML = `<div class="url-test">
          <p>${value}</p>
        </div>
        <div class="url-outcome flex">
          <p>${result}</p>
          <button class="btn btn-copy">Copy</button>
          <button class="btn btn-copied">Copied!</button>
        </div> `;
        const btnCopy = document.querySelectorAll(".btn-copy");
        const btnCopied = document.querySelector(".btn-copied");
		btnCopy.forEach(function(btn){
		btn.addEventListener("click", function(e) {

		const copiedLink = e.target.previousElementSibling.textContent;
		navigator.clipboard.writeText(copiedLink);
		
			btn.style.backgroundColor = "var(--clr-dark-violet-primary)";
			btn.style.color = "white"
			btn.textContent = "Copied"
		})
	})

        URLresultsContainer.appendChild(element);
}