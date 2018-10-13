
API_BASE = "http://127.0.0.1:8000/routes"

// Flag indicating drawing line mode
drawingMode = false;

// Markers for drawing the line
markers = [];
routeLines = [];
userLine = null;

timeoutIDs = [];

function initMap() {
    var centerMap = new google.maps.LatLng(32.0759398737466, 34.7730261824675);

    map = new google.maps.Map(document.getElementById('map'), {
        center: centerMap,
        zoomControl: false,
        mapTypeControl: false,
        zoom: 15
    });

    map.addListener('click', function(event) {
    	if (!drawingMode)
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

            userLine = new google.maps.Polyline({
                path: lineCoordinates,
                geodesic: true,
                strokeColor: '#000000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            userLine.setMap(map);

            // send userLine coordinates for intersection checking
            $.post(API_BASE + "/intersections/", JSON.stringify(lineCoordinates), function(data, status) {
                
                for (var id in data.routes){
                    // draw all routes that intersect user line
                    loadRoute(data.routes[id], isTimeoutNeeded=false);    
                }
            }, dataType="json");
        }

    });

    loadRoutes();
}

function clearRoutesIfExist(){

    // Clear all drawn routes
    if (routeLines.length) {
        for(var i = 0; i < routeLines.length; i++) {
            routeLines[i].setMap(null);
        }
        routeLines=[];
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
        userLine.setMap(null);

    }
}

function stopTimeoutIfExist(){
    timeoutIDs.forEach(function(timeout_id) {
        clearTimeout(timeout_id);
    });
    timeoutIDs = [];
}

function switchDrawMode() {
	if (drawingMode) {
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

	drawingMode = !drawingMode;
}

function loadRoutes() {
    $.get(API_BASE + "/routes", function(routes) {
        html = "<option value=0>No Routes</option>";

        for(var idx in routes) {
            html += "<option value=" + routes[idx].id + ">" +routes[idx].name + "</option>"
        }
        document.getElementById("routes").innerHTML = html;
    });
}

function selectRoute() {
    var routeID = document.getElementById("routes").value;
    loadRoute(routeID, isTimeoutNeeded=true);
}

function loadRoute(routeID, isTimeoutNeeded) {
	$.get(API_BASE + "/locations?route_id=" + routeID, function(data) {
		routePoints = [];
		for(var i = 1; i < data.length - 1; i++) {
			routePoints.push({lat: parseFloat(data[i].latitude), lng: parseFloat(data[i].longitude)});
		}
		drawRoute(routePoints, isTimeoutNeeded);
	});
}


function drawLineWithTimeout(lineCoordinates, timeout) {
    timeoutIDs.push(setTimeout(function() {
        var routeLine = new google.maps.Polyline({
                        path: lineCoordinates,
                        geodesic: true,
                        strokeColor: '#FF0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2
                    });
        routeLine.setMap(map);
        routeLines.push(routeLine);
    }, timeout));
}

function drawLine(lineCoordinates, color) {

    var routeLine = new google.maps.Polyline({
                    path: lineCoordinates,
                    geodesic: true,
                    strokeColor: color,
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });
    routeLine.setMap(map);
    routeLines.push(routeLine);

}  

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawRoute(routePoints, isTimeoutNeeded) {

    if(isTimeoutNeeded){
        map.setCenter(routePoints[0]);
        map.setZoom(15);
        clearRoutesIfExist();
    }

    color = getRandomColor()

    for (var i = 1; i <= routePoints.length - 1; i++) {
        var lineCoordinates = [routePoints[i - 1], routePoints[i]];
        if(isTimeoutNeeded){
            drawLineWithTimeout(lineCoordinates, i * 10);
        }
        else
        {
            drawLine(lineCoordinates, color)
        }
    }
}
