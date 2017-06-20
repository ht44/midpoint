<!--

<div id="readme" class="readme blob instapaper_body">
  <article class="markdown-body entry-content" itemprop="text"><h1><a id="user-content-sprintr" class="anchor" href="#sprintr" aria-hidden="true"><svg aria-hidden="true" class="octicon octicon-link" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Midpoint</h1> -->

# Midpoint

### by James Proett, Crystal Tate, Jeff Helwig, Noni Manzano and Hayden Turek.
https://midpoint-center.herokuapp.com/

#### If you would rather not make an acccout use these credintails:
##### Username: user@gmail.com
##### Password: password

Our Galvanize "Quarter Two Project" — "Midpoint" — solves the problem of “Where to meet up” amongst our friends/peers. When a group tries to decide on which venue they should all meet, it can become complicated by the distance each person has to travel.  Ideally everyone would like to meet up at a venue that’s convenient for them.

Our project solves this problem by taking a mean center of each location and rendering pins that link to businesses within a certain radius beyond that center.

![gif](./public/image/hdmid.gif?raw=true)

Tech includes the Google Maps API, Express, Node.js, jQuery, Postgresql, EJS, and Knex.

Mean Center Calcuation:
A key function of this project was calculating the centroid of the user locations. The coordinates of each user location is provided in decimal degrees of latitude and longitude. In order to calculate the average, the angular measurements must be projected on to a 3D Cartesian coordinate system based on the assumption you are dealing with a perfect sphere. An arithmetic mean of the x, y, and z values is calculated. The resulting average x,y,z location is then converted back to latitude and longitude decimal degrees. 


```javascript
'use strict';

var midpoint = (function () {

  var arrayOfLocations = [{
      lat: 30.271781,
      lng: -97.832315
  }, {
      lat: 30.571781,
      lng: -97.632315
  }, {
      lat: 30.971781,
      lng: -97.732315
  }];

  function dToR(degr) {
    return degr * Math.PI / 180;
  }

  function rToD(radians) {
    return radians * 180 / Math.PI;
  }

  return {

    test: arrayOfLocations,

    getMidpoint: locations => {
      var meanCenter = {},
          sumofX = 0,
          sumofY = 0,
          sumofZ = 0,
          avgofX,
          avgofY,
          avgofZ,
          latR,
          lngR,
          lngD,
          hypD,
          latD

      locations.forEach(location => {
        latR = dToR(location.lat);
        lngR = dToR(location.lng);
        sumofX += Math.cos(latR) * Math.cos(lngR);
        sumofY += Math.cos(latR) * Math.sin(lngR);
        sumofZ += Math.sin(latR);
      });

        avgofX = sumofX / locations.length
        avgofY = sumofY / locations.length
        avgofZ = sumofZ / locations.length

        lngD = Math.atan2(avgofY, avgofX);
        hypD = Math.sqrt(avgofX * avgofX + avgofY * avgofY);
        latD = Math.atan2(avgofZ, hypD);

        meanCenter = {
            lat: rToD(latD),
            lng: rToD(lngD)
        };

        meanCenter.lat = rToD(latD),
        meanCenter.lng = rToD(lngD)
        return meanCenter;
      }
    }
})();
```
An interesting challenge that we were faced with was updating each user's location in the database without refreshing the map page. This was before we learned about single-page architecture, but we inferred that we would need AJAX and used vanilla JavaScript to dispatch the payload containing the coordinates:

```javascript
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
    xhr.open('PUT', 'https://midpoint-center.herokuapp.com/locations/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(location));
});
```
