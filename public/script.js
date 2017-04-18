function initMap() {

    var imageYrLoc = 'http://maps.google.com/mapfiles/kml/pal2/icon10.png';
    var imageGuess = 'http://maps.google.com/mapfiles/kml/pal4/icon53.png';
    var imagePano = 'http://maps.google.com/mapfiles/kml/pal4/icon61.png';

    /////////////////////////////////////////////////////////////////////////////

    var meanCenter = midpoint.getMidpoint(midpoint.test);
    var centerPin;
    var myLocation;
    var myPin;
    var locations = [];
    var userPins = [];
    var placesPins = [];
    var infoWindow;

    var map = new google.maps.Map(document.getElementById('map'), {
        center: meanCenter,
        zoom: 9,
        mapTypeId: 'roadmap',
        streetViewControl: false,
        mapTypeControl: false
    });


    var ac = new google.maps.places.Autocomplete(document.getElementById('place-search'), {
        types: ['establishment']
    });


    var locate = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }).then(location => {
        var userId = '1'; // hard code until auth
        meanCenter = location;
        myLocation = location;
        centerPin = dropPin(location, map, imagePano);
        myPin = dropPin(location, map, imageYrLoc);
        map.setCenter(location);
        locations.push(location);
        // ajax put @ server
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:3000/locations/users/${userId}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(location));

    });

    /////////////////////////////////////////////////////////////////////////////

    const addGroup = document.getElementById('add-group');
    addGroup.addEventListener('click', (ev) => {
        ev.preventDefault();
        var groupId = document.getElementById('group-id').value
        // ajax get @ server
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {

                userPins.forEach(pin => {
                    pin.setMap(null);
                });
                centerPin.setMap(null);
                userPins = [];
                locations = [];

                xhr.response.forEach(result => {
                    locations.push({
                        lat: parseFloat(result.current_lat),
                        lng: parseFloat(result.current_lng)
                    });
                    userPins.push(dropPin({
                        lat: parseFloat(result.current_lat),
                        lng: parseFloat(result.current_lng)
                    }, map, imageGuess));
                });

                locations.push(myLocation);
                meanCenter = midpoint.getMidpoint(locations);
                centerPin = dropPin(meanCenter, map, imagePano);
                map.setCenter(meanCenter);
            }
        };
        xhr.open('GET', `http://localhost:3000/locations/groups/${groupId}`);
        xhr.send(null);
    });

    const addUser = document.getElementById('add-user');
    addUser.addEventListener('click', (ev) => {
        ev.preventDefault();
        var userId = document.getElementById('user-id').value
        // ajax get @ server
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                centerPin.setMap(null);
                locations.push({
                  lat: parseFloat(xhr.response.current_lat),
                  lng: parseFloat(xhr.response.current_lng)
                });

                userPins.push(dropPin({
                    lat: parseFloat(xhr.response.current_lat),
                    lng: parseFloat(xhr.response.current_lng)
                }, map, imageGuess));

                meanCenter = midpoint.getMidpoint(locations);
                centerPin = dropPin(meanCenter, map, imagePano);
                map.setCenter(meanCenter);
            }
        };
        xhr.open('GET', `http://localhost:3000/locations/users/${userId}`);
        // xhr.setRequestHeader('from', 'front');
        xhr.send(null);
    });

    ////////////////////////////////////////////////////////////////////////////

    google.maps.event.addListener(ac, document.getElementById('place-search'), function() {
        var place = ac.getPlace();
    })

    ////////////////////////////////////////////////////////////////////////////


    const placeSearch = document.getElementById('add-places');
    placeSearch.addEventListener('click', (ev) => {



        ev.preventDefault();
        var placeType = document.getElementById('place-type').value || 'restaurant';
        var searchRadius = document.getElementById('search-radius').value || 10000;
        // this will draw a Circle of radius needs to go somewhere else but need a break
        //     new google.maps.Circle({
        //     strokeColor: '#78f42a',
        //     strokeOpacity: 0.5,
        //     strokeWeight: 2,
        //     fillColor: '#78f42a',
        //     fillOpacity: 0.24,
        //     map: map,
        //     center: meanCenter,
        //     radius: searchRadius * 1609.344 || 2* 1609.344
        // })

        renderPlaces({
            location: meanCenter,
            keyword: placeType,
            radius: searchRadius * 1609.344
        });
    });

    /////////////////////////////////////////////////////////////////////////////

    function dropPin(location, map, image, place) {
        return new google.maps.Marker({
            position: location,
            map: map,
            icon: image,
            place: place
        });
    }

    /////////////////////////////////////////////////////////////////////////////

    function renderPlaces(request) {
        placesPins.forEach(pin => {
            pin.setMap(null);
        });
        placesPins = [];
        var service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                results.forEach(result => {

                    var marker = dropPin(null, map, null, {
                        placeId: result.place_id,
                        location: result.geometry.location
                    });

                    marker.addListener('click', () => {
                        if (infoWindow) {
                            infoWindow.close();
                        }
                        service.getDetails({
                            placeId: result.place_id
                        }, (details, status) => {
                            //   console.log(details);
                            infoWindow = new google.maps.InfoWindow({
                                content: '<div class="info">' +
                                    '<h1>' + details.name + '</h1>' +
                                    '<p>' + details.formatted_address + '</p>' +
                                    '<h1>' + details.formatted_phone_number + '</h1>' +
                                    '</div>',
                            });
                            infoWindow.open(map, marker);
                            map.addListener('click', () => {
                                infoWindow.close();
                            });
                        });
                    });
                    placesPins.push(marker);
                });
            }
        });
    }
};
