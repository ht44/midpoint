function initMap() {

    var imageYrLoc = 'http://maps.google.com/mapfiles/kml/pal2/icon10.png',
        imageGuess = 'http://maps.google.com/mapfiles/kml/pal4/icon53.png',
        imagePano = 'http://maps.google.com/mapfiles/kml/pal4/icon61.png';

    /////////////////////////////////////////////////////////////////////////////

    var meanCenter = midpoint.getMidpoint(midpoint.test),
        centerPin,
        myPin,
        users = [],
        places = [],
        infowindow;

    var map = new google.maps.Map(document.getElementById('map'), {
        center: meanCenter,
        zoom: 9,
        mapTypeId: 'roadmap',
        streetViewControl: false,
        mapTypeControl: false,
        scrollwheel: false
    });

    var input = document.getElementById('search-box');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var service = new google.maps.places.PlacesService(map);

    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    map.addListener('click', () => {
      closeWindow();
    });

    searchBox.addListener('places_changed', () => {
          var results = searchBox.getPlaces();
          places.forEach(place => {
            place.setMap(null);
          });
          places = [];
          results.forEach(result => {
            var newPlace,
              icon = {
              url: result.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            newPlace = dropPin(result.geometry.location, map, icon);
            newPlace.title = result.name;
            newPlace.placeId = result.place_id;
            newPlace.addListener('click', function() {
              closeWindow();
              service.getDetails({placeId: this.placeId}, (details, status) => {
                infowindow = new google.maps.InfoWindow({
                    content: '<div class="info">' +
                             '<h1>' + details.name + '</h1>' +
                             '<h3>' + details.rating + ' Stars</h3>' +
                             '<p>' + details.formatted_address + '</p>' +
                             '<h1>' + details.formatted_phone_number + '</h1>' +
                             '</div>'
                           });
                infowindow.open(map, newPlace);
              });
            });
            places.push(newPlace);
          });
    });

    var locate = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }).then(location => {
        centerPin = dropPin(location, map, imagePano);
        meanCenter = location;
        myPin = dropPin(location, map, imageYrLoc);
        myPin.lat = location.lat;
        myPin.lng = location.lng;
        myPin.userId = 'session';
        users.push(myPin);
        map.setCenter(location);
        // ajax put @ server
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:3000/locations/users`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(location));
        // xhr.send(JSON.stringify({lat: 69.69, lng: 69.69}));
    });

    /////////////////////////////////////////////////////////////////////////////

    //

    const addGroup = document.getElementById('add-group');
    addGroup.addEventListener('click', (ev) => {
        ev.preventDefault();
        var groupId = document.getElementById('group-id').value
        // ajax get @ server
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              closeWindow();
              centerPin.setMap(null);
                users.forEach(user => {
                    user.setMap(null);
                });
                users = [];
                myPin.setMap(map);
                users.push(myPin);
                var newPin;
                xhr.response.forEach(result => {
                    newPin = dropPin({
                        lat: parseFloat(result.current_lat),
                        lng: parseFloat(result.current_lng)
                    }, map, imageGuess);
                    newPin.userId = result.id;
                    newPin.lat = parseFloat(result.current_lat);
                    newPin.lng = parseFloat(result.current_lng);
                    users.push(newPin);
                });
                meanCenter = midpoint.getMidpoint(users);
                centerPin = dropPin(meanCenter, map, imagePano);
                map.setCenter(meanCenter);
            }
        };
        xhr.open('GET', `http://localhost:3000/locations/groups/${groupId}`);
        xhr.send(null);
    });

    // GET user/:user_id
    const addUser = document.getElementById('add-user');
    addUser.addEventListener('click', (ev) => {
        ev.preventDefault();
        var userId = document.getElementById('user-id').value
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.response) {
              closeWindow();
              centerPin.setMap(null);
                var newPin;
                newPin = dropPin({
                    lat: parseFloat(xhr.response.current_lat),
                    lng: parseFloat(xhr.response.current_lng)
                }, map, imageGuess);

                newPin.userId = xhr.response.id;
                newPin.lat = parseFloat(xhr.response.current_lat);
                newPin.lng = parseFloat(xhr.response.current_lng);

                users.push(newPin);
                meanCenter = midpoint.getMidpoint(users);
                centerPin = dropPin(meanCenter, map, imagePano);
                map.setCenter(meanCenter);
            }
        };
        xhr.open('GET', `http://localhost:3000/locations/users/${userId}`);
        xhr.send(null);
    });

    const removeUser = document.getElementById('remove-user');
    removeUser.addEventListener('click', (ev) => {
      if (users.length > 1) {
        closeWindow();
        users.pop().setMap(null);
        centerPin.setMap(null);
        meanCenter = midpoint.getMidpoint(users);
        centerPin = dropPin(meanCenter, map, imagePano);
      }
    });

    // POST /groups
    const groupName = document.getElementById('group-name');
    const saveGroup = document.getElementById('save-group');
    saveGroup.addEventListener('click', (ev) => {
      ev.preventDefault();
      var newGroup = [];
      users.forEach(user => {
        newGroup.push({
          user_id: user.userId
        });
      });
      newGroup.push({
        name: groupName.value
      });
      xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          console.log(xhr.status);
        }
      }
      xhr.open('POST', 'http://localhost:3000/locations/groups');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(newGroup));
    });

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    function dropPin(location, map, image) {
        return new google.maps.Marker({
            position: location,
            map: map,
            icon: image
        });
    }

    function closeWindow() {
      if (infowindow) {
        infowindow.close();
        infowindow = null;
      }
    }
    /////////////////////////////////////////////////////////////////////////////
}
