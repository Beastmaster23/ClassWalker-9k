/**
 * The CenterControl adds a control to the map that recenters the map on
 * Current location.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CurrentPositionControl(controlDiv, map) {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.className = "controlUIDivBorder";
    controlUI.style.backgroundColor = '#ffff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to show Current location on map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.className = "controlUIDiv";
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Current location';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        getLocation(function (pos) {
            current_location = pos;
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
            map.setZoom(20);
            mypos={ lat: current_location.lat + .00002, lng: current_location.lng }
            load_map([
                {
                    pos: mypos, text: "Bedrooms"
                }])
        });

    });
}

function load_map(map_loc) {
    markers=[];
    for (var i = 0; i < map_loc.length; i++) {
        var marker = new google.maps.Marker({
            position: map_loc[i].pos,
            map: map,
            title: map_loc[i].text
          });
        markers.push(marker);
    }
}