$(document).ready(function() {

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

    function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
    placeMarker()

    newMap()

    google.maps.event.addListener(map, 'click', function firstGuess(ev) {
            guessedLocation = ev.latLng;
            placeMarker(pos);

            return guessedLocation
        })


})
