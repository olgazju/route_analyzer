

// Flag indicating drawing line mode
drawingLine = false;

// Markers for drawing the line
markers = [];
route_lines = [];
user_line = null;

function initMap() {
    var chicago = new google.maps.LatLng(41.850, -87.650);

    map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 3
    });

    map.addListener('click', function(event) {
    	if (!drawingLine)
    		return;

    	// Clear all markers and line after second click
    	if (markers.length > 1) {
    		markers.forEach(function(marker) {
    			marker.setMap(null);
    		});
    		markers = [];
    		user_line.setMap(null);

    	}

        var marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            title: ''
        });

        markers.push(marker);

        if (markers.length > 1) {
            var lineCoordinates = [
                { lat: markers[markers.length - 2].position.lat(), lng: markers[markers.length - 2].position.lng() },
                { lat: markers[markers.length - 1].position.lat(), lng: markers[markers.length - 1].position.lng() }
            ];

            user_line = new google.maps.Polyline({
                path: lineCoordinates,
                geodesic: true,
                strokeColor: '#00FF00',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            user_line.setMap(map);
        }

    });

    //loadRoute(map, 'travel_log_2', drawRoute);
    loadRoutes();
}


function switchDrawMode() {
	if (drawingLine) {
		markers = [];
	}

	drawingLine = !drawingLine;
}

function loadRoutes() {
    $.get("http://127.0.0.1:8000/routes/routes", function(routes) {
        console.log(routes);
        html = "";
        for(var idx in routes) {
            console.log("Route", routes[idx])
            html += "<option value=" + routes[idx].id + ">" +routes[idx].name + "</option>"
        }
        document.getElementById("routes").innerHTML = html;
    });

    // Draw first route in the loaded list
    loadRoute(1);
}

function selectRoute() {
    var route_id = document.getElementById("routes").value;
    loadRoute(route_id)
}

function loadRoute(route_id) {
    console.log(route_id);
	route_path = "http://127.0.0.1:8000/routes/locations?route_id=" + route_id;
	$.get(route_path, function(data) {
		coordinates = [];
		for(var i = 1; i < data.length - 1; i++) {
			coordinates.push({lat: parseFloat(data[i].latitude), lng: parseFloat(data[i].longitude)});
		}

		drawRoute(coordinates);
	});
}

function drawRoute(route) {

    map.setCenter(route[0]);
    map.setZoom(16);

    if (route_lines) {
        for(var i = 0; i < route_lines.length; i++) {
            route_lines[i].setMap(null);
        }
    }

    for (var i = 1; i <= route.length - 1; i++) {
        (function(i) {
            setTimeout(function() {
                var lineCoordinates = [route[i - 1], route[i]];
                var route_line = new google.maps.Polyline({
                    path: lineCoordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                route_line.setMap(map);
                route_lines.push(route_line);
            }, 10 * i);
        }(i));
    }

}


var TILE_SIZE = 256;


// The mapping between latitude, longitude and pixels is defined by the web
// mercator projection.
function project(latLng) {
    var siny = Math.sin(latLng.lat() * Math.PI / 180);

    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);

    return new google.maps.Point(
        TILE_SIZE * (0.5 + latLng.lng() / 360),
        TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
}