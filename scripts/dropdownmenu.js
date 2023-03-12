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
	if(width > 900){
		buttons = [];
	}else if(width >= 891){
		buttons = document.querySelectorAll("header ul li.button:nth-child(n+4)");
	}else if(width >= 579){
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
	for(let i = 0; i < defaultButtons.length; i++){
		defaultButtons[i].style.display = null;
	}
	for(let i = 0; i < buttons.length; i++){
		var button = buttons[i];
		button.style.display = "none";
	}
	dropDownMenuValue = 0;
	document.querySelectorAll("header ul li.menu-button")[0].classList.remove("active");
}
function showDropDownMenu(){
	for(let i = 0; i < buttons.length; i++){
		var button = buttons[i];
		button.style.display = "inline-flex";
	}
	dropDownMenuValue = 1;
	document.querySelectorAll("header ul li.menu-button")[0].classList.add("active");
}