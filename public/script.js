$(document).ready(function() {

    var imageYrLoc = 'http://maps.google.com/mapfiles/kml/pal2/icon10.png';
    var imageGuess = 'http://maps.google.com/mapfiles/kml/pal4/icon53.png';
    var imagePano = 'http://maps.google.com/mapfiles/kml/pal4/icon61.png';

    var map
    var pos


    function newMap(yourLoc) {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 30.271781,
                lng: -97.732315
            },
            zoom: 9,
            mapTypeId: 'roadmap',
            streetViewControl: false,
            mapTypeControl: false
        });
        return map
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        return pos
    })


    console.log();
    getMeanCenter(arrayOfLocations)


    function placeMarker(location, markerFromSmwhr) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: markerFromSmwhr
            });
        }


    newMap()

    console.log();
    google.maps.event.addListener(map, 'click', function firstGuess(ev) {
        placeMarker(arrayOfLocations[0], imageGuess)
        placeMarker(arrayOfLocations[1], imageGuess)
        placeMarker(arrayOfLocations[2], imageGuess)
        placeMarker(meanCenter, imageYrLoc)


    })


})
