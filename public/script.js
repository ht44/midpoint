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

  function newMap(midpoint, locations, placeType, radius) {

      var request = {
        location: midpoint,
        radius: radius,
        type: placeType
      };

      var map = new google.maps.Map(document.getElementById('map'), {
          center: midpoint,
          zoom: 8,
          mapTypeId: 'roadmap',
          streetViewControl: false,
          mapTypeControl: false
      });

      var service = new google.maps.places.PlacesService(map);
      // 1
      placeMarker(midpoint, map, imagePano).addListener('click', () => {
        console.log('hey');
      });

      // 2
      locations.forEach(location => {
          placeMarker(location, map, imageGuess).addListener('click', () => {
            console.log('hi');
          })
      });

      // 3
      service.nearbySearch(request, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          // var infowindow;

          results.forEach(result => {

            var marker = placeMarker(null, map, null, {
              placeId: result.place_id,
              location: result.geometry.location
            })

            marker.addListener('click', () => {
              service.getDetails({placeId: result.place_id}, (details, status) => {
                var infowindow = new google.maps.InfoWindow({
                  content:
                    '<div class="info">' +
                    '<h1>' + details.name + '</h1>' +
                    '<p>' + details.formatted_address + '</p>' +
                    '<h1>' + details.formatted_phone_number + '</h1>' +
                    '</div>',
                });

                infowindow.open(map, marker);
                map.addListener('click', () => {
                  infowindow.close();
                });
              });
            });
          });
        }
      });
    }
  newMap(testMidpoint, testLocations, 'gas_station', 10000);
};
