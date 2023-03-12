let dir = document.querySelectorAll(".travel-cards")[0];

setTimeout(reloadAllTravelData, 1000);

function reloadAllTravelData(){
	var div = document.createElement("iframe");
	div.src = "hotels.json";
	div.id = "dataTravel";
	div.style.display = "none";
	div.addEventListener('message', event => {
      if (event.origin.startsWith('http://your-first-site.com')) {
        console.log(event.data);
      } else {
        return;
      }
    });
	div.onload = (function(){
		var a = null;
		div.contentWindow.postMessage(a, null);
		console.log(a);
		var data = JSON.parse(div.contentWindow.document.body.querySelectorAll("pre")[0].innerHTML);
		console.log(data);
		while (dir.firstChild) {
            dir.removeChild(dir.firstChild);
        }
        dir.style.setProperty('--travel_card_max_per_row', Math.min(data.length, 3));
        for(var i = 0; i < data.length; i++){
            createTravelCard(data[i]);
        }
        hidePageLoader();
	});
	document.body.appendChild(div);
}

function createTravelCard(dataHotel){
	console.log(dataHotel);
    var div = document.createElement("div");
    div.classList.add("travel-card");
    div.appendChild(createImage(dataHotel.imgPath));

    var dar = document.createElement("div");
    dar.classList.add("travel-card-content");

    var contentLayer = document.createElement("div");
    contentLayer.classList.add("travel-card-content-grid-layer");
    contentLayer.appendChild(createName(dataHotel));
    contentLayer.appendChild(createStars(dataHotel.rating, dataHotel.price));
    dar.appendChild(contentLayer);


    div.appendChild(dar);
    div.appendChild(createNextButton());
    dir.appendChild(div);
}

function createName(dataHotel){
	var element = document.createElement("div");
	element.classList.add("travel-card-hotel-display");

	var country = document.createElement("h3");
	country.innerText = dataHotel.name;
	element.appendChild(country);

	country = document.createElement("h3");
    country.innerHTML = dataHotel.region;
    element.appendChild(country);

	return element;
}

function createNextButton(){
	var div = document.createElement("a");
	div.href = "#";
	var a = document.createElement("span");
    a.innerText = "VÍCE";
    div.classList.add("travelCardNext");
    div.appendChild(a);
    return div;
}
function createImage(imgSrc){
    var img = document.createElement("img");
    img.src = imgSrc;
    return img;
}
function createStars(stars, price){
    var divStars = document.createElement("div");
    var divStarsStars = document.createElement("div");
    var randomDiv = document.createElement("div");
    divStars.classList.add("travel-card-stars");
    var counter = stars;
    for(var i = 0; i < 5; i++){
        var star = document.createElement("img");
        star.src = "./res/star.png";
        if(counter >= 1){
            star.classList.add("full_star");
            counter -= 1;
        }else if(counter >= 0.5){
            star.classList.add("half_star");
            star.src = "./res/half_star.png";
            divStarsStars.appendChild(star);
            star = document.createElement("img");
            star.classList.add("half_empty_star");
            star.src = "./res/half_empty_star.png";
            counter -= 0.5;
        }else{
            counter = 0;
        }
        divStarsStars.appendChild(star);
    }
    var h4 = document.createElement("h4");
    h4.innerText = stars;
    var priceElement = document.createElement("h5");
    priceElement.innerText = price;
    randomDiv.appendChild(divStarsStars);
    randomDiv.appendChild(h4);
    divStars.appendChild(randomDiv);
    divStars.appendChild(priceElement);
    return divStars;
}
