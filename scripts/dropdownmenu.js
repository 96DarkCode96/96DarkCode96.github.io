let buttons = document.querySelectorAll("header ul li.button:nth-child(n+2)");
let defaultButtons = document.querySelectorAll("header ul li.button:nth-child(n+2)");
let dropDownMenuValue = 1;
onResizeDropDownMenu(document.defaultView.innerWidth);
addEventListener("resize", (event) => {
	onResizeDropDownMenu(event.currentTarget.innerWidth);
});
document.addEventListener("click", (event) => {
	if(dropDownMenuValue){
		var v = event.target.parentElement;
		while(v != null){
			if(v.nodeName == "HEADER"){
				return;
			}
			v = v.parentElement;
		}
		hideDropDownMenu();
	}
});
function onResizeDropDownMenu(width){
	if(width > 1135){
		buttons = [];
    }else if(width >= 920){
		buttons = document.querySelectorAll("header ul li.button:nth-child(n+4)");
	}else if(width >= 755){
		buttons = document.querySelectorAll("header ul li.button:nth-child(n+3)");
	}else{
		buttons = document.querySelectorAll("header ul li.button:nth-child(n+2)");
	}
	hideDropDownMenu();
}
function dropDownMenu(){
	if(dropDownMenuValue == 1){
		hideDropDownMenu();
	}else{
		showDropDownMenu();
	}
}
function hideDropDownMenu(){
	dropDownMenuValue = 0;
	document.querySelectorAll("header ul li.menu-button")[0].classList.remove("active");
	document.querySelectorAll("header")[0].style.overflow = null;
}
function showDropDownMenu(){
	dropDownMenuValue = 1;
	document.querySelectorAll("header ul li.menu-button")[0].classList.add("active");
	document.querySelectorAll("header")[0].style.overflow = "visible";
}