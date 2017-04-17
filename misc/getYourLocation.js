
navigator.geolocation.getCurrentPosition(function(position) {
    pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    return pos
})
