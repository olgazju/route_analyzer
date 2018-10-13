import { Component, OnInit, EventEmitter } from '@angular/core';
import {Route, Location } from './models';
import { RouteService } from './route.service';
import { Observable, of} from 'rxjs';
import { mapTo, delay, flatMap, concatAll, concatMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'route-app';


  // Flag indicating drawing line mode
  drawingMode = false;
     
  // Markers for drawing the line
  markers = [];
  
  routeNames:any = [];
  routes:any = [];

  selectedRouteId:any;

  lng: number = 34.7730261824675;
  lat: number = 32.0759398737466;
  zoom:number = 15;

  sub:any = null; // holds subscription to stop drawing individual route when new one is selected

  constructor(private routeService: RouteService) {
  }

  ngOnInit() {
    // Load list of routes
    this.routeService.loadRoutes().subscribe((data) => {
      this.routeNames = data;
    });
  }

  onMapClick(event: any) {
    if (this.drawingMode) {

      // If more than two markers, reset 
      if (this.markers.length > 1) {
        this.markers = []; // clear line markers
        this.routes = [];
      }

      this.markers.push(event.coords);  

      if (this.markers.length > 1) {
        // Find all routes intersecting with the line
        this.routeService.intersections(this.markers).subscribe(routeIds => {
          routeIds = Array.prototype.slice.call(routeIds);
          if(routeIds.length > 0) {
            for(var i = 0; i < routeIds.length; i++) {
              // Load each route and draw its points
              this.routeService.loadRoute(routeIds[i]).subscribe(routePoints => {
                this.routes.push(routePoints);
              });
            }
          }
        });
      }
    }
  }

  getColor(index) {
    var colors = [ "#ff0000", "#00ff00", "#0000ff" ];
    return colors[index % colors.length];
  }

  onSwitchDrawMode() {
    if (this.drawingMode) {
      this.markers = [];
    }

    this.routes = [];
    this.drawingMode = !this.drawingMode;
  }

  onRouteSelected(route_id) {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.routes = [[]];
    this.routeService.loadRoute(this.selectedRouteId).subscribe(routePoints => {
        console.log("Points", routePoints);

        this.lat = routePoints[0].latitude;
        this.lng = routePoints[0].longitude;
        this.zoom = 15;

        this.sub = of(routePoints).pipe(concatAll()) // unpack the array into single emissions
          .pipe(concatMap(val => of(val).pipe(delay(10)))) // delay each emission
          .subscribe(point => {
            this.routes[0].push(point);
        });
    });
  }

}
