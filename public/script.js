function initMap() {

    var imageYrLoc = 'http://maps.google.com/mapfiles/kml/pal2/icon10.png',
        imageGuess = 'http://maps.google.com/mapfiles/kml/pal4/icon53.png',
        // imagePano = 'http://maps.google.com/mapfiles/kml/pal4/icon61.png',
        imagePano = 'http://maps.google.com/mapfiles/kml/pal3/icon20.png'

    var geo = navigator.geolocation;
    var usernames = [];
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            var parsed = JSON.parse(xhr.response);
            parsed.forEach(result => {
              if (result.username) {
                usernames.push(result.first + ' ' + result.last);
              }
            })
            console.log(usernames);
          }
        }
        xhr.open('GET', `http://localhost:3000/locations/users`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(null);

    /////////////////////////////////////////////////////////////////////////////

    var meanCenter = midpoint.getMidpoint(midpoint.test),
        centerPin,
        myPin,
        users = [],
        places = [],
        infowindow,
        circle,
        lineDistance;


    var map = new google.maps.Map(document.getElementById('map'), {
        center: meanCenter,
        zoom: 10,
        mapTypeId: 'roadmap',
        streetViewControl: false,
        mapTypeControl: false,
        scrollwheel: false,
        styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}]
    });

    var input = document.getElementById('search-box');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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
          closePlacesAr = [];

          if (circle) circle.setMap(null);
          circle = new google.maps.Circle({center:centerPin.getPosition(),
                                         radius: 8047,
                                         fillOpacity: 0.35,
                                         fillColor: "#93f293",
                                         strokeOpacity: 0.5,
                                         map: map});

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
                             '<a target="_blank" href =' + details.website + '>' + '<h2>' + 'website ' + '</h2>' + '</a>' +
                             '<h3>' + details.opening_hours.weekday_text[0] + '</h3>' +
                             '<h3>' + details.opening_hours.weekday_text[1] + '</h3>' +
                             '<h3>' + details.opening_hours.weekday_text[2] + '</h3>' +
                             '<h3>' + details.opening_hours.weekday_text[3] + '</h3>' +
                             '<h3>' + details.opening_hours.weekday_text[4] + '</h3>' +
                             '<h3>' + details.opening_hours.weekday_text[5] + '</h3>' +
                             '<h3>' + details.opening_hours.weekday_text[6] + '</h3>' +



                            //  '<a href=' + details.website + '</a>' +
                             '<div id="bodyContent">'+
                             '</div>'
                           });
                infowindow.open(map, this);
              });
            });

            lineDistance = (calculatingDistance(meanCenter, result.geometry.location));
            if(lineDistance<5){
                places.push(newPlace);
            } else {
                newPlace.setMap(null);
                newPlace = null;
            }
          });
    });

    $('#user-id').autocomplete({
      appendTo: '#build',
      source: usernames
    });

    var locate = new Promise((resolve, reject) => {
        geo.getCurrentPosition(position => {
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
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            myPin.username = xhr.response;
          }
        }
        xhr.open('PUT', `http://localhost:3000/locations/users`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(location));
        // xhr.send(JSON.stringify({lat: 69.69, lng: 69.69}));
    });

    /////////////////////////////////////////////////////////////////////////////

    // This is the autocomplete. right now its a child of the form element
    // with the id "build" ... if its not appended it gets appended to the dom.
    // if you need to change the flow ... dont forget to set the 'appendTo' to where you want.
    // i think if you just move the <form> around though youre fine
    //



    const addGroup = document.getElementById('groups');
    addGroup.addEventListener('click', (ev) => {
        var groupId = ev.target.id;
        // document.getElementById('group-id').value = null;
        // ajax get @ server
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              console.log(xhr.response);
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
                    newPin.firstName = result.first;
                    newPin.lastName = result.last;
                    newPin.lat = parseFloat(result.current_lat);
                    newPin.lng = parseFloat(result.current_lng);
                    newPin.username = result.username;
                    // NONIIIIIIIIIII NHAND INSIDE BELOW WHERE IT SAYS this
                    newPin.addListener('click', function (ev) {
                      closeWindow();
                      infowindow = new google.maps.InfoWindow({
                          content: '<div class="info">' +
                                   '<h1>' + this.firstName + " " + this.lastName + '</h1>' +
                                   '</div>'
                                 });
                      infowindow.open(map, this);

                    });
                  // })
                    users.push(newPin);
                });
                meanCenter = midpoint.getMidpoint(users);
                centerPin = dropPin(meanCenter, map, imagePano);
                map.setCenter(meanCenter);
                // below is a new function which updates the ui to list all users
                // see step1.js line 46 for more info
                addUsersToCount(xhr.response);
            }
        };
        xhr.open('GET', `http://localhost:3000/locations/groups/${groupId}`);
        xhr.send(null);
    });

    // GET user/:user_id
    const addUser = document.getElementById('add-user');
    addUser.addEventListener('click', (ev) => {
        console.log(users);
        ev.preventDefault();
        var existing = false;
        var fullName = document.getElementById('user-id').value
        document.getElementById('user-id').value = null;
        users.forEach(user => {
          if (user.firstName + ' ' + user.lastName === fullName) {
            existing = true;
          }
        });
        if (existing || !fullName) return;
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.response) {
              console.log(xhr.response);
              closeWindow();
              centerPin.setMap(null);
                var newPin;
                newPin = dropPin({
                    lat: parseFloat(xhr.response.current_lat),
                    lng: parseFloat(xhr.response.current_lng)
                }, map, imageGuess);
                newPin.userId = xhr.response.id;
                newPin.username = xhr.response.username;
                newPin.firstName = xhr.response.first;
                newPin.lastName = xhr.response.last;
                newPin.lat = parseFloat(xhr.response.current_lat);
                newPin.lng = parseFloat(xhr.response.current_lng);
                // this is what UPDATES THE COUNT
                addUserToCount(xhr.response.first, xhr.response.last);
                // NONIIIIIIIIIII NHAND INSIDE BELOW WHERE IT SAYS this
                newPin.addListener('click', function (ev) {
                  closeWindow();
                  infowindow = new google.maps.InfoWindow({
                      content: '<div class="info">' +
                               '<h1>' + this.firstName + " " + this.lastName + '</h1>' +
                               '</div>'
                             });
                  infowindow.open(map, this);
                });
                users.push(newPin);
                meanCenter = midpoint.getMidpoint(users);
                centerPin = dropPin(meanCenter, map, imagePano);
                map.setCenter(meanCenter);
            }
        };
        xhr.open('GET', `http://localhost:3000/locations/users/${fullName}`);
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
        removeUserFromCount();
      }
    });

    // POST /groups
    const groupName = document.getElementById('group-name');
    const saveGroup = document.getElementById('save-group');
    saveGroup.addEventListener('click', (ev) => {
      if (groupName.value == '') {
        return;
      }
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
          window.location.reload(true);
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
    function calculatingDistance(userInput, theTargetInput) {
        var lineOfDifferece = new google.maps.Polyline({
            path: [userInput, theTargetInput],
            geodesic: true,
            strokeColor: 'transparent',
            strokeOpacity: .9,
            strokeWeight: 2
        });

        // calculating distance of line
        lineOfDifferece.setMap(map);
        google.maps.LatLng.prototype.kmTo = function(a) {
            var e = Math,
                ra = e.PI / 180;
            var b = this.lat() * ra,
                c = a.lat() * ra,
                d = b - c;
            var g = this.lng() * ra - a.lng() * ra;
            var f = 2 * e.asin(e.sqrt(e.pow(e.sin(d / 2), 2) + e.cos(b) * e.cos(c) * e.pow(e.sin(g / 2), 2)));
            return f * 6378.137;
        }

        google.maps.Polyline.prototype.inKm = function(n) {
            var a = this.getPath(n),
                len = a.getLength(),
                dist = 0;
            for (var i = 0; i < len - 1; i++) {
                dist += a.getAt(i).kmTo(a.getAt(i + 1));
            }
            return dist;
        }
            return lineOfDifferece.inKm() * .621371192

    }
    /////////////////////////////////////////////////////////////////////////////

}
