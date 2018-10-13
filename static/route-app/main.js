(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "html, body {\r\n\tfont-family: Verdana;\r\n}\r\n\r\nselect:required:invalid {\r\n  color: black;\r\n}\r\n\r\noption[value=\"\"][disabled] {\r\n  display: none;\r\n}\r\n\r\noption {\r\n  color: black;\r\n}\r\n\r\n#header {\r\n    width: 100%;\r\n    height: 40px;\r\n    padding: 10px;\r\n    border-bottom: 1px solid #666;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 10000;\r\n    background-color: white;\r\n}\r\n\r\n#map {\r\n    top: 60px;\r\n}\r\n\r\n.actions {\r\n    float:left;\r\n}\r\n\r\n.title {\r\n    float: left;\r\n    padding: 10px;\r\n    font-size: 20px;\r\n    font-weight: 800;\r\n    margin-right: 100px;\r\n}\r\n\r\n.mode_label {\r\n    position: relative;\r\n    display: inline-block;\r\n    width: 180px;\r\n    font-size: 16px;\r\n\r\n    top: -10px;\r\n}\r\n\r\n.switch {\r\n    position: relative;\r\n    display: inline-block;\r\n    width: 60px;\r\n    height: 34px;\r\n}\r\n\r\n.switch input {\r\n    display: none;\r\n}\r\n\r\n.slider {\r\n    position: absolute;\r\n    cursor: pointer;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    background-color: #ccc;\r\n    transition: .4s;\r\n}\r\n\r\n.slider:before {\r\n    position: absolute;\r\n    content: \"\";\r\n    height: 26px;\r\n    width: 26px;\r\n    left: 4px;\r\n    bottom: 4px;\r\n    background-color: white;\r\n    transition: .4s;\r\n}\r\n\r\ninput:checked+.slider {\r\n    background-color: #2196F3;\r\n}\r\n\r\ninput:focus+.slider {\r\n    box-shadow: 0 0 1px #2196F3;\r\n}\r\n\r\ninput:checked+.slider:before {\r\n    -webkit-transform: translateX(26px);\r\n    transform: translateX(26px);\r\n}\r\n\r\n/* Rounded sliders */\r\n\r\n.slider.round {\r\n    border-radius: 34px;\r\n}\r\n\r\n.slider.round:before {\r\n    border-radius: 50%;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"header\">\n  <div class=\"title\">Route Analyzer</div>\n  <div class=\"actions\">\n    <label class=\"switch\">\n      <input type=\"checkbox\" (click)=\"onSwitchDrawMode()\">\n      <span class=\"slider round\"></span>\n    </label>\n    <span class=\"mode_label\">Draw Mode</span>\n  </div>\n  <div class=\"actions\" id=\"routes_checkbox\" *ngIf=\"!drawingMode\">\n    <select [(ngModel)]=\"selectedRouteId\" required (change)=\"onRouteSelected($event.target.value)\">\n      <option value=\"\" disabled selected>Select route\n      <option *ngFor=\"let r of route_names\" [ngValue]=\"r.id\">{{r.name}}\n    </select>\n  </div>\n</div>\n\n<agm-map [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"zoom\" (mapClick)=\"onMapClick($event)\">\n  <agm-marker \n      *ngFor=\"let m of markers; let i = index\"\n      [latitude]=\"m.lat\"\n      [longitude]=\"m.lng\">\n  </agm-marker>\n  <agm-polyline>\n    <agm-polyline-point \n      *ngFor=\"let m of markers; let i = index\"\n      [latitude]=\"m.lat\"\n      [longitude]=\"m.lng\">\n    </agm-polyline-point>\n  </agm-polyline>\n  <agm-polyline [strokeColor]=\"'#ff0000'\" *ngFor=\"let route of routes\">\n    <agm-polyline-point \n      *ngFor=\"let p of route; let i = index\"\n      [latitude]=\"p.latitude\"\n      [longitude]=\"p.longitude\">\n    </agm-polyline-point>\n  </agm-polyline>\n</agm-map>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _route_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.service */ "./src/app/route.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(routeService) {
        this.routeService = routeService;
        this.title = 'route-app';
        this.ROUTES_URL = "http://127.0.0.1:8000/routes";
        // Flag indicating drawing line mode
        this.drawingMode = false;
        // Markers for drawing the line
        this.markers = [];
        this.route_lines = [];
        this.user_line = null;
        this.timeout_ids = [];
        this.selectedRouteId = null;
        this.selectedRoutePoints = [];
        this.routePointsArr = [];
        this.lng = 34.7730261824675;
        this.lat = 32.0759398737466;
        this.zoom = 15;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routeService.loadRoutes().subscribe(function (data) {
            console.log(data);
            _this.route_names = data;
        });
    };
    AppComponent.prototype.onMapClick = function (event) {
        var _this = this;
        if (this.drawingMode) {
            console.log("Clicked", event);
            this.markers.push(event.coords);
            console.log(this.markers);
            if (this.markers.length > 1) {
                console.log(this.markers.length);
                this.routeService.intersections(this.markers).subscribe(function (routeIds) {
                    console.log("Route ids", routeIds);
                    _this.markers = []; // clear line markers
                    routeIds = Array.prototype.slice.call(routeIds);
                    if (routeIds.length > 0) {
                        for (var i = 0; i < routeIds.length; i++) {
                            _this.routeService.loadRoute(routeIds[i]).subscribe(function (routePoints) {
                                _this.routes.push(routePoints);
                            });
                        }
                    }
                });
            }
        }
    };
    AppComponent.prototype.onSwitchDrawMode = function () {
        if (this.drawingMode) {
            // Clear user markers and line
            this.markers = [];
        }
        else {
            // Clear all drawn routes
        }
        this.selectedRoutePoints = [];
        this.drawingMode = !this.drawingMode;
    };
    AppComponent.prototype.onRouteSelected = function (route_id) {
        var _this = this;
        console.log("Selected route:", route_id, this.selectedRouteId);
        this.routeService.loadRoute(this.selectedRouteId).subscribe(function (routePoints) {
            _this.routes = [];
            _this.routes.push(Array.prototype.slice.call(routePoints));
            Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(_this.routes[0]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatAll"])()) // unpack the array into single emissions
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["concatMap"])(function (val) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(val).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["delay"])(10)); })) // delay each emission
                .subscribe(function (point) {
                _this.selectedRoutePoints.push(point);
            });
            _this.lat = routePoints[0].latitude;
            _this.lng = routePoints[0].longitude;
            _this.zoom = 15;
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_route_service__WEBPACK_IMPORTED_MODULE_1__["RouteService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @agm/core */ "./node_modules/@agm/core/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _agm_core__WEBPACK_IMPORTED_MODULE_6__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyDjZJorWDLqP3PFA7RzqAp1jQJlbRv4QU0'
                })
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/route.service.ts":
/*!**********************************!*\
  !*** ./src/app/route.service.ts ***!
  \**********************************/
/*! exports provided: RouteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouteService", function() { return RouteService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RouteService = /** @class */ (function () {
    function RouteService(http) {
        this.http = http;
        this.API_BASE = "http://127.0.0.1:8000/routes";
    }
    RouteService.prototype.loadRoutes = function () {
        return this.http.get(this.API_BASE + '/routes');
    };
    RouteService.prototype.loadRoute = function (route_id) {
        return this.http.get(this.API_BASE + "/locations?route_id=" + route_id);
    };
    RouteService.prototype.intersections = function (coordinates) {
        return this.http.post(this.API_BASE + '/intersections/', coordinates).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data['routes']; }));
    };
    RouteService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], RouteService);
    return RouteService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! c:\Code\route_analyzer2\analyzer\app\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map