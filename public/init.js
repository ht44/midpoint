function initMap() {

  var testMidpoint = midpoint.getMidpoint(midpoint.test);
  var testLocations = midpoint.test;

  var imageYrLoc = 'http://maps.google.com/mapfiles/kml/pal2/icon10.png';
  var imageGuess = 'http://maps.google.com/mapfiles/kml/pal4/icon53.png';
  var imagePano = 'http://maps.google.com/mapfiles/kml/pal4/icon61.png';

  function placeMarker(location, map, image, place) {
    return new google.maps.Marker({
        position: location,
        map: map,
        icon: image,
        place: place
    });
  }

  function newMap(midpoint, locations) {

      var map = new google.maps.Map(document.getElementById('map'), {
          center: midpoint,
          zoom: 9,
          mapTypeId: 'roadmap',
          streetViewControl: false,
          mapTypeControl: false
      });
    }
  newMap(testMidpoint, testLocations, 'restaurant', 10000);
};
