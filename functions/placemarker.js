function placeMarker(position, map, icon) {
  return new google.maps.Marker({
      position: position,
      map: map,
      icon: icon
  });
}

module.exports = placeMarker;
