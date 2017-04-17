// !!!!so for this to work we will need to pass in an ARRAY of "location" objects!!!!!!


// make in to radians
// then make into a corrdenant plane
// get an average of the values
// convert back to lat lng
//
const m = Math

function dToR(degr) {return degr * m.PI / 180}

// Convert lat and lon to degrees. lat = lat * 180/PI lon = lon * 180/PI
function rToD(rad) {return rad * 180 / m.PI}

// this will work if we get to arrays of latitude and longuatude where the indexes
// correspond
//
//
var meanCenter = {}
function getMeanCenter(locations) {

    var sumX = 0
    var sumY = 0
    var sumZ = 0

    for (var i=0; i<locations.length; i++) {

        var lat = dToR(locations[i].lat)
        var lng = dToR(locations[i].lng)

// Convert lat/lon to Cartesian coordinates
// cos(lat1) * cos(lon1) Y1 = cos(lat1) * sin(lon1) Z1 = sin(lat1)
        sumofX += m.cos(lat) * m.cos(lng)
        sumofY += m.cos(lat) * m.sin(lng)
        sumofZ += m.sin(lat)
    }
//
    var avgX = sumofX / locations.length
    var avgY = sumofY / locations.length
    var avgZ = sumofZ / locations.length

// Convert average x, y, z coordinate to latitude and longitude.
// Lon = atan2(y, x) Hyp = sqrt(x * x + y * y) Lat = atan2(z, hyp)
    var lng = m.atan2(avgofY, avgofX)
    var hyp = m.sqrt(avgofX * avgofX + avgofY * avgofY)
    var lat = m.atan2(avgofZ, hyp)

    meanCenter = {lat: rToD(lat), lng: rToD(lng)};

    return meanCenter
};
