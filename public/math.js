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

console.log(midpoint.getMidpoint(midpoint.test));

module.exports = midpoint;
