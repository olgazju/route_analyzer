function initMap() {
    var chicago = new google.maps.LatLng(41.850, -87.650);

    var map = new google.maps.Map(document.getElementById('map'), {
        center: chicago,
        zoom: 3
    });

    markers = [];

    map.addListener('click', function(event) {
        console.log(event);

        markers.push(event.latLng);
        //map.setZoom(8);
        map.setCenter(event.latLng);

        var marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            title: 'Hello World!'
        });

        console.log("Markers", markers, markers.length);
        if (markers.length > 1) {
            console.log("draw line", markers[markers.length - 1].lat());
            var lineCoordinates = [
                { lat: markers[markers.length - 2].lat(), lng: markers[markers.length - 2].lng() },
                { lat: markers[markers.length - 1].lat(), lng: markers[markers.length - 1].lng() }
            ];

            var route = new google.maps.Polyline({
                path: lineCoordinates,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            route.setMap(map);
        }

    });

    loadRoute(map, 'travel_log_1', drawRoute);
}

function loadRoute(map, name, callback) {
	console.log("Loading file:", name);
	route_path = "http://127.0.0.1:8080/logs/" + name + ".csv";
	$.get(route_path, function(data) {
		console.log("Loaded");

		var lines = data.split("\n");
		//console.log("Lines:", lines.length);

		coordinates = [];
		for(var i = 1; i < lines.length - 1; i++) {
			//console.log("Line", i, ":", lines[i]);
			fields = lines[i].split(',');

			coordinates.push({lat: parseFloat(fields[1]), lng: parseFloat(fields[2])});
		}

		console.log("coordinates:", coordinates);
		callback(map, coordinates);
	});
}

function drawRoute(map, route) {
    // route = [
    //     { lat: 34.7730261824675, lng: 32.0759398737466 },
    //     { lat: 34.7730267203206, lng: 32.0759402987293 },
    //     { lat: 34.7730273460635, lng: 32.0759407931577 },
    //     { lat: 34.7730260636617, lng: 32.0759397798726 },
    //     { lat: 34.7730269975078, lng: 32.0759405177477 },
    //     { lat: 34.7730287988466, lng: 32.075941941069 },
    //     { lat: 34.7730291008063, lng: 32.0759421796613 },
    // ]

    // start = route[0];
    // route = route.splice(1);

    console.log("Map:", map);

    map.setCenter(route[0]);
    map.setZoom(30);

    for (var i = 1; i <= route.length - 1; i++) {
        (function(i) {
            setTimeout(function() {
                console.log(route[i - 1], route[i]);
                var lineCoordinates = [route[i - 1], route[i]];
                var route_line = new google.maps.Polyline({
                    path: lineCoordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                route_line.setMap(map);
            }, 100 * i);
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