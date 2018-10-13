
ROUTES_URL = "http://127.0.0.1:8000/routes"

// Flag indicating drawing line mode
drawingLine = false;

// Markers for drawing the line
markers = [];
route_lines = [];
user_line = null;

timeout_ids = [];

function initMap() {
    var centerMap = new google.maps.LatLng(32.0759398737466, 34.7730261824675);

    map = new google.maps.Map(document.getElementById('map'), {
        center: centerMap,
        zoomControl: false,
        mapTypeControl: false,
        zoom: 15
    });

    map.addListener('click', function(event) {
    	if (!drawingLine)
    		return;

    	// Clear all markers and routes from map after second click
    	if (markers.length > 1) {
    		clearMarkersIfExist();
            clearRoutesIfExist();
    	}

        var marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            title: ''
        });

        markers.push(marker);

        // draw user line between 2 markers
        if (markers.length > 1) {

            var lineCoordinates = [
                { lat: markers[markers.length - 2].position.lat(), lng: markers[markers.length - 2].position.lng() },
                { lat: markers[markers.length - 1].position.lat(), lng: markers[markers.length - 1].position.lng() }
            ];

            user_line = new google.maps.Polyline({
                path: lineCoordinates,
                geodesic: true,
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            user_line.setMap(map);

            // send user_line coordinates for intersection checking
            $.post(ROUTES_URL + "/intersections/", JSON.stringify(lineCoordinates), function(data, status) {
                
                for (var id in data.routes){
                    // draw all routes that intersect user line
                    loadRoute(data.routes[id], is_timeout_needed=false);    
                }
            }, dataType="json");
        }

    });

    loadRoutes();
}

function clearRoutesIfExist(){

    // Clear all drawn routes
    if (route_lines.length) {
        for(var i = 0; i < route_lines.length; i++) {
            route_lines[i].setMap(null);
        }
        route_lines=[];
        stopTimeoutIfExist();
    }
}

function clearMarkersIfExist(){

    // Clear all markers and line 
    if (markers.length) {
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];
        user_line.setMap(null);

    }
}

function stopTimeoutIfExist(){
    timeout_ids.forEach(function(timeout_id) {
        clearTimeout(timeout_id);
    });
    timeout_ids = [];
}

function switchDrawMode() {
	if (drawingLine) {
        // Clear user markers and line
		clearMarkersIfExist();
        $( "#routes_checkbox" ).show();
	}
    else{

        // Clear all drawn routes
        clearRoutesIfExist();
        $( "#routes_checkbox" ).hide();

    }

    clearRoutesIfExist();

	drawingLine = !drawingLine;
}

function loadRoutes() {
    $.get(ROUTES_URL + "/routes", function(routes) {
        html = "<option value=0>No Routes</option>";

        for(var idx in routes) {
            html += "<option value=" + routes[idx].id + ">" +routes[idx].name + "</option>"
        }
        document.getElementById("routes").innerHTML = html;
    });
}

function selectRoute() {
    var route_id = document.getElementById("routes").value;
    loadRoute(route_id, is_timeout_needed=true);
}

function loadRoute(route_id, is_timeout_needed) {
	$.get(ROUTES_URL + "/locations?route_id=" + route_id, function(data) {
		route_points = [];
		for(var i = 1; i < data.length - 1; i++) {
			route_points.push({lat: parseFloat(data[i].latitude), lng: parseFloat(data[i].longitude)});
		}
		drawRoute(route_points, is_timeout_needed);
	});
}


function drawLineWithTimeout(lineCoordinates, timeout) {
    timeout_ids.push(setTimeout(function() {
        var route_line = new google.maps.Polyline({
                        path: lineCoordinates,
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });
        route_line.setMap(map);
        route_lines.push(route_line);
    }, timeout));
}

function drawLine(lineCoordinates, color) {

    var route_line = new google.maps.Polyline({
                    path: lineCoordinates,
                    geodesic: true,
                    strokeColor: color,
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
    route_line.setMap(map);
    route_lines.push(route_line);

}  

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawRoute(route_points, is_timeout_needed) {

    if(is_timeout_needed){
        map.setCenter(route_points[0]);
        map.setZoom(15);
        clearRoutesIfExist();
    }

    color = getRandomColor()

    for (var i = 1; i <= route_points.length - 1; i++) {
        var lineCoordinates = [route_points[i - 1], route_points[i]];
        if(is_timeout_needed){
            drawLineWithTimeout(lineCoordinates, i * 10);
        }
        else
        {
            drawLine(lineCoordinates, color)
        }
    }
}
