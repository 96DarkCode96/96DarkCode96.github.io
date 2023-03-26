const queryParams = new URLSearchParams(window.location.search);
if(!queryParams.has("hotelID")){
	window.location.href = "./";
}else{
	setTimeout(loadHotel, 1000);
}

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
            unknownHotel();
        }else{
            loadHotelData(data[0]);
        }

        document.body.removeChild(div);
        hidePageLoader();
    });
    document.body.appendChild(div);
}

function unknownHotel(){
	let container = document.createElement("div");
	let innerContainer = document.createElement("div");

	let errorCode = document.createElement("h1");
	let errorMsg = document.createElement("h2");
	let errorMsgContent = document.createElement("h3");
	let errorHelp = document.createElement("h4");

	errorCode.innerText = "404";
	errorMsg.innerText = "ERROR";
	errorMsgContent.innerText = "STRÁNKA NENALEZENA";
	errorHelp.innerText = "ZADAL/A JSTE ŠPATNOU URL ADRESU HOTELU";

	innerContainer.appendChild(errorCode);
	innerContainer.appendChild(errorMsg);
	innerContainer.appendChild(errorMsgContent);
	innerContainer.appendChild(errorHelp);

	container.classList.add("errorCode");
	container.appendChild(innerContainer);
	document.body.querySelectorAll("main")[0].appendChild(container);
}

function loadHotelData(hotelData){
	let container = document.createElement("div");

	//container.appendChild(loadHotelMap(hotelData.mapID));
	container.appendChild(createHotelGallery(hotelData.gallery));
	container.classList.add("hotelContent");
	document.body.querySelectorAll("main")[0].appendChild(container);
}

function loadHotelMap(hotelMapID){
	var iframe = document.createElement("iframe");
	iframe.classList.add("hotelMap");
	iframe.src = "https://frame.mapy.cz/s/" + hotelMapID;
	iframe.frameborder = "0";
	iframe.style.border = "none";
	return iframe;
}

function createHotelGallery(gallery){
	if(gallery == null || gallery.length == 0){
		return document.createElement("div");
	}
	var blur = document.createElement("div");
    blur.classList.add("hotelGalleryBlur");

    var containerAndButtons = document.createElement("div");
    containerAndButtons.classList.add("hotelGallery");

	var containerIMG = document.createElement("div");
	containerIMG.classList.add("hotelGalleryContainer");

	for(var i = 0; i < gallery.length; i++){
		const data = gallery[i];

		const imgContainer = document.createElement("div");

		const img = document.createElement("img");
		img.src = data.src;

		const finalID = i;

		imgContainer.classList.add("small-image");
		imgContainer.onclick = (function (){
			galleryImgClick(data, finalID);
		});
		imgContainer.appendChild(img);
		containerIMG.appendChild(imgContainer);
	}

	{

		var imgContainer = document.createElement("div");

		var button = document.createElement("div");
        button.classList.add("galleryButton");

        var buttonImg = document.createElement("img");
        buttonImg.src = "./hotels/res/left-arrow.png";
        buttonImg.onclick = (function () {
            var id = document.querySelectorAll("main .hotelContent .large-image .viewImage img")[0].dataset.id;
            if(id <= 0){
                id = gallery.length-1;
            }else{
                id--;
            }
            galleryImgClick(gallery[id], id);
        });

		button.appendChild(buttonImg);

        imgContainer.appendChild(button);

		var imgC = document.createElement("div");
        var img = document.createElement("img");

		imgC.classList.add("viewImage");

		var p = document.createElement("p");
        imgC.appendChild(p);

        imgContainer.classList.add("large-image");
        imgC.appendChild(img);
        imgContainer.appendChild(imgC);

		var button = document.createElement("div");
        button.classList.add("galleryButton");

        var buttonImg = document.createElement("img");
        buttonImg.src = "./hotels/res/right-arrow.png";
        buttonImg.onclick = (function () {
            var id = document.querySelectorAll("main .hotelContent .large-image .viewImage img")[0].dataset.id;
            if(id >= gallery.length-1){
                id = 0;
            }else{
                id++;
            }
            galleryImgClick(gallery[id], id);
        });

        button.appendChild(buttonImg);

        imgContainer.appendChild(button);

        containerAndButtons.appendChild(imgContainer);

	}

	{
		var text = document.createElement("p");
		text.classList.add("galleryStatus");

		containerAndButtons.appendChild(text);
	}

	containerAndButtons.appendChild(containerIMG);
	blur.appendChild(containerAndButtons);
	return blur;
}