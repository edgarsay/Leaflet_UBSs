function _httpGet(theUrl = "") {
    let xmlHttp
    //sanitização
    //coerção
    xmlHttp = new XMLHttpRequest()
    //processo
    xmlHttp.open("GET", theUrl, false) // false for synchronous request
    xmlHttp.send(null)
    //retorno
    return xmlHttp.responseText
}

let data = JSON.parse(_httpGet("./ubs_CE.json"))
let points = []
//IF the request sucess:
// Map
let myMap = L.map('map').setView([-6, -39], 7)

// Setting up the map
L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        minZoom: 7,
        attribution: 'Map data &copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(myMap)

//plot UBSs
let radius = 50
//CircleStyle
function circleStyle() {
    return {
        fillColor: "red",
        color: "red",
        fillOpacity: 1,
        radius: radius
    }
}

// Setting Up optionsh
let options = {
    pointToLayer: (feature, latlng) => {
        let point, name, street, phoneNumber
        //Circle and style
        point = L.circle(latlng, circleStyle())
        //PopUp
        name = feature.properties[4].no_fantasia
        street = feature.properties[5].no_logradouro
        phoneNumber = feature.properties[8].nu_telefone
        phoneNumber = phoneNumber == "" ? " Não encontrado." : phoneNumber
        point.bindPopup(name + "<br>" + "Rua : " + street + "<br>" + "Fone : " + phoneNumber + "<br>")
        //store points
        points.push(point)
        //Result
        return point
    },
    filter: (geoJsonFeature) => {
        return geoJsonFeature.properties[10].uf == "CE"
    }
}

// add UBSs to the map
let ubs = L.geoJSON(data, options).addTo(myMap)

// update point size by zoom level
// myMap.on("zoomend", () => {
//     let zoom, newRadius
//     zoom = myMap.getZoom()
//     if (zoom > 7){
//         newRadius = 100
//     }
//     for (point of points)
//         point.setRadius(radius)
// })