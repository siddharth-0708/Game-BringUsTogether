import {isMobile, isDesktop } from 'react-device-detect';

//This wont work with exports because this framework uses file script and not webpack
var _app = _app || {};

_app.screenDetails = function () {
    this.viewType = "VD";
    this.viewScale = 1;
    this.viewScaleX = 1;
    this.viewScaleY = 1;
    this.DPR = Math.min(window.devicePixelRatio || 1, 2);
    this.orientation = "landscape";
    this.isDesktop = isDesktop;
    this.isMobile - isMobile;

    window.addEventListener('resize', function(){
        setTimeout(function(){
            this.resize();
        }.bind(this), 50);
    }.bind(this), false);

    this.resize();
}
var p = _app.screenDetails.prototype;

p.resizeCanvasContainer = function () {
    if(this.isMobile){
        return
    }
    /* our scaling is based on 1280x720*/
    var maxWidth = 1280;
    var maxHeight = 720;
    var canvasMargin = 0.9;
    var ratio = Math.min(window.innerWidth / maxWidth, window.innerHeight / maxHeight) * canvasMargin;

    if (window.innerWidth * canvasMargin < maxWidth || window.innerHeight * canvasMargin < maxHeight) {
        document.getElementById("canvasContainer").style.transform = "scale(" + ratio + ")";
    }
};

p.resize = function(){
    console.log("hehehe");
    this.resizeCanvasContainer();
}
