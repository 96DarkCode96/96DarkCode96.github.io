const queryParams = new URLSearchParams(window.location.search);
if (!queryParams.has("hotelID")) {
	window.location.href = "./";
} else {
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
function loadHotel() {
	let hotelID = queryParams.get("hotelID");
	var div = document.createElement("iframe");
	div.src = "hotels.json";
	div.style.display = "none";
	div.onload = (function () {
		var data = JSON.parse(div.contentWindow.document.body.querySelectorAll("pre")[0].innerHTML).hotels
			.filter(function (entry) {
				return entry.id == hotelID;
			});

		if (data.length == 0) {
			window.location.href = "/";
		} else {
			loadHotelData(data[0]);
		}

		document.body.removeChild(div);
		document.querySelector(".hotelData").classList.remove("fakeHide");
		document.querySelector(".pageLoader").hidePageLoader();
	});
	document.body.appendChild(div);
}

function loadHotelData(hotelData) {
	createHotelData(hotelData);
	createHotelGallery(hotelData.gallery);
}

function createHotelData(hotelData) {
	document.querySelector("#hotel-name").innerHTML = hotelData["name"];
	document.querySelector("#hotel-destination").innerHTML = hotelData["region"];
	document.querySelector("#hotel-image").src = hotelData["imgPath"];
	document.querySelector("#hotel-price").innerHTML = hotelData["price"] + "<span>za týden</span>";
	var rating = 0.0;
	let d = document.querySelector(".hotelData-rating-users");
	if (hotelData["rating"].length) {
		for (var i = 0; i < hotelData["rating"].length; i++) {
			var dat = hotelData["rating"][i];
			rating = parseFloat(rating) + parseFloat(dat["rating"]);
			if (i <= 14) {
				var el = document.createElement("p");
				el.innerHTML = dat["name"] + "<span>" + dat["rating"] + "</span>";
				d.appendChild(el);
			}
			if (i == 14) {
				var el = document.createElement("p");
				el.innerHTML = "...";
				d.appendChild(el);
			}
		}
		rating = rating / hotelData["rating"].length;
		document.querySelector("#hotel-rating").innerHTML = toFixedIfNecessary(rating, 2) + "<span>/5</span>";
	} else {
		document.querySelector("#hotel-rating").innerHTML = "?<span>/5</span>";
	}
	document.querySelector("#hotel-description").innerHTML = (hotelData["description"]) ? hotelData["description"].replaceAll("\n", "<br><br>") : 
	"<span style='color: #F7F;'>Nepotařilo se načíst popisek hotelu!</span>";
	d = undefined;
}
function toFixedIfNecessary(value, dp) {
	return +parseFloat(value).toFixed(dp);
}
function createHotelGallery(gallery) {
	if (gallery == null || gallery.length == 0) {
		return;
	}
	var containerIMG = document.querySelectorAll(".hotelGallery")[0];

	for (var i = 0; i < gallery.length; i++) {
		const data = gallery[i];

		const imgContainer = document.createElement("div");

		const img = document.createElement("img");
		img.src = data.src;

		const finalID = i;

		imgContainer.classList.add("small-image");
		imgContainer.onclick = (function (ev) {
			ev.preventDefault();
			ev.stopPropagation();
			galleryImgClick(gallery, finalID);
			return false;
		});
		imgContainer.appendChild(img);
		containerIMG.appendChild(imgContainer);
	}

	document.querySelectorAll(".hotelGalleryView > img")[0].onclick = (function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		let id = document.querySelectorAll(".hotelGalleryView-img > img")[0].dataset.imgID;
		id--;
		if (id < 0) {
			id = gallery.length - 1;
		}
		galleryImgClick(gallery, id);
		return false;
	});
	document.querySelectorAll(".hotelGalleryView > img")[1].onclick = (function (ev) {
		ev.preventDefault();
		ev.stopPropagation();
		let id = document.querySelectorAll(".hotelGalleryView-img > img")[0].dataset.imgID;
		id++;
		if (id >= gallery.length) {
			id = 0;
		}
		galleryImgClick(gallery, id);
		return false;
	});
}
function bookIt(){
	var el = document.createElement("div");
	el.innerHTML = "<div><h1>Rezervační systém není k dispozici!</h1></div>";
	el.addEventListener("click", (e) => {
		document.body.removeChild(el);
		document.body.style.overflow = "unset";
	});
	document.body.style.overflow = "hidden";
	el.classList.add("bookError");
	document.body.appendChild(el);
}