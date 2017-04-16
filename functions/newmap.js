const placeMarker = require('./placemarker');
const midpoint = require('./midpoint');

var imageYrLoc = 'http://maps.google.com/mapfiles/kml/pal2/icon10.png';
var imageGuess = 'http://maps.google.com/mapfiles/kml/pal4/icon53.png';
var imagePano = 'http://maps.google.com/mapfiles/kml/pal4/icon61.png';


var testMidpoint = midpoint.getMidpoint(midpoint.test);
var testLocations = midpoint.test;


function newMap(midpoint, locations) {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: midpoint,
        zoom: 8,
        mapTypeId: 'roadmap',
        streetViewControl: false,
        mapTypeControl: false
    });

    placeMarker(midpoint, map);
    locations.forEach(location => {
        placeMarker(location, map, imageGuess);
    });

    // var infowindow = new google.maps.InfoWindow();
    // var service = new google.maps.places.PlacesService(map);

    // document.getElementById('map').addEventListener('click', function() {
    //     placeDetailsByPlaceId(service, map, infowindow);
    // })
};



module.exports = newMap;
