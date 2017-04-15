// how to get lat lng from adress

geocoder = new google.maps.Geocoder();

function getCoordanits (adress, callback) {
    var coordinates;
    geocoder.geocode({adress: adress}, (results, status) => {
        coors_obj = results[0].geometry.location;
        coordinates = [coors_obj.nd, coors_obj.ob];
        callback(coordinates)
    })
}
