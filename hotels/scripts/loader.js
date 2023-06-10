const queryParams = new URLSearchParams(window.location.search);
if(!queryParams.has("hotelID")){
	window.location.href = "./";
}else{
	setTimeout(loadHotel, 1000);
}
document.querySelector(".pageLoader").hidePageLoader = () => {
	let element = document.querySelectorAll(".pageLoader")[0];
	element.style.display = "none";
};
document.querySelector(".pageLoader").showPageLoader = () => {
	let element = document.querySelectorAll(".pageLoader")[0];
	element.style.display = "flex";
};
function loadHotel(){
	let hotelID = queryParams.get("hotelID");
	var div = document.createElement("iframe");
    div.src = "hotels.json";
    div.style.display = "none";
    div.onload = (function(){
        var data = JSON.parse(div.contentWindow.document.body.querySelectorAll("pre")[0].innerHTML).hotels
        .filter(function (entry) {
            return entry.id == hotelID;
        });

        if(data.length == 0){
			window.location.href = "/";
		}else{
            loadHotelData(data[0]);
        }

        document.body.removeChild(div);
        document.querySelector(".pageLoader").hidePageLoader();
    });
    document.body.appendChild(div);
}

function loadHotelData(hotelData){
	createHotelData(hotelData);
	createHotelGallery(hotelData.gallery);
}

function createHotelData(hotelData){

}

function createHotelGallery(gallery){
	if(gallery == null || gallery.length == 0){
		return;
	}
	var containerIMG = document.querySelectorAll(".hotelGallery")[0];

	for(var i = 0; i < gallery.length; i++){
		const data = gallery[i];

		const imgContainer = document.createElement("div");

		const img = document.createElement("img");
		img.src = data.src;

		const finalID = i;

		imgContainer.classList.add("small-image");
		imgContainer.onclick = (function (ev){
			ev.preventDefault();
            ev.stopPropagation();
			galleryImgClick(gallery, finalID);
			return false;
		});
		imgContainer.appendChild(img);
		containerIMG.appendChild(imgContainer);
	}

	document.querySelectorAll(".hotelGalleryView > img")[0].onclick = (function (ev){
		ev.preventDefault();
        ev.stopPropagation();
		let id = document.querySelectorAll(".hotelGalleryView-img > img")[0].dataset.imgID;
		id--;
		if(id < 0){
			id = gallery.length-1;
		}
		galleryImgClick(gallery, id);
		return false;
	});
	document.querySelectorAll(".hotelGalleryView > img")[1].onclick = (function (ev){
        ev.preventDefault();
        ev.stopPropagation();
        let id = document.querySelectorAll(".hotelGalleryView-img > img")[0].dataset.imgID;
        id++;
        if(id >= gallery.length){
            id = 0;
        }
        galleryImgClick(gallery, id);
        return false;
    });
}