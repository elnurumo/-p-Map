const map_area = document.querySelector(".map_area")

const form = document.querySelector("form")

const input = form.querySelector("input")

const ip_address = document.querySelector(".ip_address")

const loca = document.querySelector(".location")

const timezone = document.querySelector(".timezone")

const isp = document.querySelector(".isp")

var map = L.map('map').setView([40.384544, 49.983978], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// createMap()

async function getMapApi() {
    try {
        const map_api = `https://geo.ipify.org/api/v2/country,city?apiKey=at_g0VO3OrpE3MXyh6NM7HR6LRfI9CIY&ipAddress=${input.value}`
        const res = await fetch(map_api)
        const data = await res.json();
        console.log(data);
        ip_address.textContent = data.ip;
        loca.textContent = `${data.location.country}, ${data.location.region}, ${data.location.city}, ${data.location.postalCode}`
        timezone.textContent = `UTC ${data.location.timezone}`
        isp.textContent = data.isp
        createMap([data.location.lat, data.location.lng])
    } catch (error) {
        console.log(error.message);
        alert("Opss! Something went wrong");
    }
}



form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (input.value.trim() === "") {
        alert(`Please search some IP address or Domain`)
        return
    }
    getMapApi()
    input.value = ""
})

function createMap(latlon = [40.384544, 49.983978]) {
    document.querySelector("#map").remove()
    map_area.innerHTML = ` <div id="map"></div>`

    let map = L.map('map').setView(latlon, 13);
    let container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // map.setView(latlon, map.getZoom(), {
    //     "animate": true,
    //     "pan": {
    //         "duration": 10
    //     }
    // });


    var marker = L.marker(latlon).addTo(map)
        .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();

    var popup = L.popup()
        .setLatLng(latlon)
        .setContent('I am a standalone popup.')
        .openOn(map);

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent('You clicked the map at ' + e.latlng.toString())
            .openOn(map);

    }
    map.on('click', onMapClick);

}