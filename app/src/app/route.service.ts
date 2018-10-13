import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';

import {Route, Location } from './models';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  API_BASE = "http://127.0.0.1:8000/routes";

  constructor(private http: HttpClient) { 
  }

  loadRoutes() {
    return this.http.get(this.API_BASE + '/routes')
  }
  
  loadRoute(route_id) {
    return this.http.get(this.API_BASE + "/locations?route_id=" + route_id);
  }

  intersections(coordinates) {
    return this.http.post(this.API_BASE + '/intersections/', coordinates).pipe(map(data => data['routes']));
  }


}
