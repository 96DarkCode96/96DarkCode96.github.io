function hidePageLoader(){
	let element = document.querySelectorAll(".pageLoader")[0];
    element.style.display = "none";
}
function showPageLoader(){
	let element = document.querySelectorAll(".pageLoader")[0];
	element.style.display = "flex";
}
showPageLoader();
document.addEventListener("keydown", (e) => {
	if (e.ctrlKey && e.keyCode==72) {
        e.stopPropagation();
        e.preventDefault();
        hidePageLoader();
	}
	if (e.ctrlKey && e.keyCode==85) {
        e.stopPropagation();
        e.preventDefault();
        showPageLoader();
    }
});