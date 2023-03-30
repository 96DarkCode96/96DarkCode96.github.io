function setTheme(value) {
	const d = new Date();
	d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = "theme=" + value + ";" + expires + ";path=/";
	localStorage.setItem("theme", value);
	checkTheme();
}

function getTheme() {
	let name = "theme=";
	let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
	    if (c.indexOf(name) == 0) {
	         return c.substring(name.length, c.length);
	    }
    }
    return "";
}

function checkTheme() {
	let theme = getTheme();
	let html = document.querySelectorAll("html")[0];
    if (theme == "") {
        theme = localStorage.getItem("theme");
        if(theme == "" || theme == null){
            theme = "light-theme";
        }
    }
    html.className = theme;
    if(theme == "light-theme"){
        document.querySelectorAll("#light-theme-selector")[0].className = "active-theme";
        document.querySelectorAll("#dark-theme-selector")[0].className = "";
    }else{
        document.querySelectorAll("#light-theme-selector")[0].className = "";
        document.querySelectorAll("#dark-theme-selector")[0].className = "active-theme";
    }
}
checkTheme();