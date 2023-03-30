document.addEventListener("click", (event) => {
	if(isGalleryVisible()){
		var v = event.target.parentElement;
		while(v != null){
			if(v.classList.contains("hotelGalleryView-img")){
				return;
			}
			v = v.parentElement;
		}
		hideGallery();
	}
});
function isGalleryVisible(){
	return document.querySelectorAll("main .hotelGalleryView.visible").length != 0;
}
function hideGallery(){
	document.querySelectorAll("main .hotelContent .hotelGalleryView.visible")[0].classList.remove("visible");
    document.querySelectorAll("main .hotelContent .hotelGalleryViewBlur.visible")[0].classList.remove("visible");
}
document.addEventListener("keydown", (e) => {
	if (e.keyCode==27 && isGalleryVisible()) {
		hideGallery();
	}
});
function galleryImgClick(data, imgID){
	if(!isGalleryVisible()){
		document.querySelectorAll("main .hotelGalleryView")[0].classList.add("visible");
        document.querySelectorAll("main .hotelGalleryViewBlur")[0].classList.add("visible");
	}
	let d = document.querySelectorAll(".hotelGalleryView-img > img")[0];
	d.src = data[imgID].src;
	d.dataset.imgID = imgID;
	document.querySelectorAll(".hotelGalleryView-description-text")[0].innerText = data[imgID].description;
	document.querySelectorAll(".hotelGalleryView-description-img-count")[0].innerText = ((imgID+1) + ". obrázek z " + data.length);
}
function switchObecneInformace(){
	document.querySelectorAll("main .hotelContent .hotelContentSelector li.active")[0].classList.remove("active");
	document.querySelectorAll("main .hotelContent .hotelContentSelector #selector-obecne")[0].classList.add("active");
	document.querySelectorAll("main .hotelContent .hotelGallery")[0].classList.add("invisible");
	document.querySelectorAll("main .hotelContent .hotelData")[0].classList.remove("invisible");
}
function switchGalerie(){
	document.querySelectorAll("main .hotelContent .hotelContentSelector li.active")[0].classList.remove("active");
	document.querySelectorAll("main .hotelContent .hotelContentSelector #selector-galerie")[0].classList.add("active");
	document.querySelectorAll("main .hotelContent .hotelGallery")[0].classList.remove("invisible");
	document.querySelectorAll("main .hotelContent .hotelData")[0].classList.add("invisible");
}