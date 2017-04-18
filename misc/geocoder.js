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
