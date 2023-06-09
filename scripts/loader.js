let dir = document.querySelectorAll(".travel-cards")[0];
document.querySelector(".pageLoader").hidePageLoader = () => {
    let element = document.querySelectorAll(".pageLoader")[0];
    element.style.display = "none";
};
document.querySelector(".pageLoader").showPageLoader = () => {
    let element = document.querySelectorAll(".pageLoader")[0];
    element.style.display = "flex";
};
reloadAllTravelData();

function reloadAllTravelData() {
    document.querySelector(".pageLoader").showPageLoader();
    var div = document.createElement("iframe");
    div.src = "hotels.json";
    div.style.display = "none";
    div.onload = (function () {
        const data = JSON.parse(div.contentWindow.document.body.querySelectorAll("pre")[0].innerHTML);
        while (dir.firstChild) {
            dir.removeChild(dir.firstChild);
        }
        dir.style.setProperty('--travel_card_max_per_row', Math.min(data.hotels.length, 3));
        for (var i = 0; i < data.hotels.length; i++) {
            createTravelCard(data, data.hotels[i]);
        }
        document.body.removeChild(div);
        document.querySelector(".pageLoader").hidePageLoader();
    });
    document.body.appendChild(div);
}

function createTravelCard(wholeData, dataHotel) {
    var div = document.createElement("div");
    div.classList.add("travel-card");
    div.appendChild(createImage(dataHotel.imgPath));

    var dar = document.createElement("div");
    dar.classList.add("travel-card-content");

    var contentLayer = document.createElement("div");
    contentLayer.classList.add("travel-card-content-grid-layer");
    contentLayer.appendChild(createName(dataHotel));
    var rating = 0.0;
    if (dataHotel["rating"].length) {
        for (var i = 0; i < dataHotel["rating"].length; i++) {
            rating = parseFloat(rating) + parseFloat(dataHotel["rating"][i]["rating"]);
        }
        rating = rating / dataHotel["rating"].length;
    }
    contentLayer.appendChild(createStars(rating, dataHotel.price));
    dar.appendChild(contentLayer);

    contentLayer = document.createElement("div");
    contentLayer.classList.add("travel-card-content-flex-layer");
    contentLayer.appendChild(createEmotes(wholeData, dataHotel));
    dar.appendChild(contentLayer);


    div.appendChild(dar);
    div.appendChild(createNextButton(dataHotel.id));
    dir.appendChild(div);
}

function createEmotes(wholeData, hotelData) {
    var element = document.createElement("div");
    element.classList.add("travel-card-status-display");

    var badges = hotelData.badges;
    var badgeList = wholeData.badges;

    for (var i = 0; i < badges.length; i++) {
        var div = document.createElement("div");

        var img = document.createElement("img");
        img.src = badgeList[badges[i]].img;
        img.loading = "lazy";
        if (badges[i].background != null) {
            img.classList.add("background-custom");
        }
        div.appendChild(img);

        var text = document.createElement("h3");
        text.innerText = badgeList[badges[i]].text;
        div.appendChild(text);

        element.appendChild(div);
    }

    return element;
}

function createName(dataHotel) {
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

function createNextButton(hotelID) {
    var div = document.createElement("a");
    div.href = "./hotels/?hotelID=" + hotelID;
    var a = document.createElement("span");
    a.innerText = "VÍCE";
    div.classList.add("travelCardNext");
    div.appendChild(a);
    return div;
}
function createImage(imgSrc) {
    var img = document.createElement("img");
    img.style.background = "#000000";
    img.src = imgSrc;
    return img;
}
function createStars(stars, price) {
    var divStars = document.createElement("div");
    var divStarsStars = document.createElement("div");
    var randomDiv = document.createElement("div");
    divStars.classList.add("travel-card-stars");
    var counter = stars;
    for (var i = 0; i < 5; i++) {
        var star = document.createElement("img");
        star.src = "./res/star.png";
        star.loading = "lazy";
        if (counter >= 1) {
            star.classList.add("full_star");
            counter -= 1;
        } else if (counter >= 0.5) {
            star.classList.add("half_star");
            star.src = "./res/half_star.png";
            divStarsStars.appendChild(star);
            star = document.createElement("img");
            star.classList.add("half_empty_star");
            star.loading = "lazy";
            star.src = "./res/half_empty_star.png";
            counter -= 0.5;
        } else {
            counter = 0;
        }
        divStarsStars.appendChild(star);
    }
    var h4 = document.createElement("h4");
    h4.innerText = toFixedIfNecessary(stars, 2);
    var priceElement = document.createElement("h5");
    priceElement.innerText = price;
    randomDiv.appendChild(divStarsStars);
    randomDiv.appendChild(h4);
    divStars.appendChild(randomDiv);
    divStars.appendChild(priceElement);
    return divStars;
}
function toFixedIfNecessary(value, dp) {
    return +parseFloat(value).toFixed(dp);
}