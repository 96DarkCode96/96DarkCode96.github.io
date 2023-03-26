document.addEventListener("click", (event) => {
	if(isGalleryVisible()){
		var v = event.target.parentElement;
		while(v != null){
			if(v.classList.contains("hotelGalleryLarge")){
				return;
			}
			v = v.parentElement;
		}
		document.querySelectorAll("main .hotelContent .hotelGalleryLarge")[0].classList.remove("hotelGalleryLarge");
		document.querySelectorAll("main .hotelContent .hotelGalleryBlurVisible")[0].classList.remove("hotelGalleryBlurVisible");
	}
});
function isGalleryVisible(){
	return document.querySelectorAll("main .hotelContent .hotelGalleryLarge").length != 0;
}

function galleryImgClick(data, imgID){
	if(!isGalleryVisible()){
		document.querySelectorAll("main .hotelContent .hotelGallery")[0].classList.add("hotelGalleryLarge");
	}
	document.querySelectorAll("main .hotelContent .large-image .viewImage img")[0].src = data.src;
	document.querySelectorAll("main .hotelContent .large-image .viewImage p")[0].innerText = data.description;
	document.querySelectorAll("main .hotelContent .large-image .viewImage img")[0].dataset.id = imgID;
	document.querySelectorAll("main .hotelContent .hotelGalleryBlur")[0].classList.add("hotelGalleryBlurVisible");

	var div = document.querySelectorAll("main .hotelContent .hotelGalleryLarge .hotelGalleryContainer")[0];
	const gridComputedStyle = window.getComputedStyle(div);
	var adder;
	if(gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length % 2 == 0){
		adder = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length/2;
	}else{
		adder = (gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length-1)/2;
	}
	for(let i = 0; i < div.children.length; i++){
		let child = div.children[i];
		let order = (i - imgID + adder);
		if(order < 0){
			order += div.children.length;
		}
		if(order >= div.children.length){
            order -= div.children.length;
        }
		child.style.order = order;
	}
	document.querySelectorAll("main .hotelContent .hotelGalleryLarge > p")[0].innerText = (imgID+1) + " / " + div.children.length;
}