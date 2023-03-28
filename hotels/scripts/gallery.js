document.addEventListener("click", (event) => {
	if(isGalleryVisible()){
		var v = event.target.parentElement;
		while(v != null){
			if(v.classList.contains("hotelGalleryLarge")){
				return;
			}
			v = v.parentElement;
		}
		hideGallery();
	}
});
function isGalleryVisible(){
	return document.querySelectorAll("main .hotelContent .hotelGalleryLarge").length != 0;
}
function hideGallery(){
	document.querySelectorAll("main .hotelContent .hotelGalleryLarge")[0].classList.remove("hotelGalleryLarge");
    document.querySelectorAll("main .hotelContent .hotelGalleryBlurVisible")[0].classList.remove("hotelGalleryBlurVisible");
}
document.addEventListener("keydown", (e) => {
	if (e.keyCode==27 && isGalleryVisible()) {
		hideGallery();
	}
});
function galleryImgClick(data, imgID){
	if(!isGalleryVisible()){
		document.querySelectorAll("main .hotelContent .hotelGallery")[0].classList.add("hotelGalleryLarge");
	}
	document.querySelectorAll("main .hotelContent .large-image .viewImage img")[0].src = data.src;
	document.querySelectorAll("main .hotelContent .large-image .viewImage p")[0].innerText = data.description;
	document.querySelectorAll("main .hotelContent .large-image .viewImage img")[0].dataset.id = imgID;
	document.querySelectorAll("main .hotelContent .hotelGalleryBlur")[0].classList.add("hotelGalleryBlurVisible");

	var div = document.querySelectorAll("main .hotelContent .hotelGalleryLarge .hotelGalleryContainer")[0];
	document.querySelectorAll("main .hotelContent .hotelGalleryLarge > p")[0].innerText = (imgID+1) + " / " + div.children.length;
}