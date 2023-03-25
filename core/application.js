import { Application, Assets, Sprite, Container, Graphics } from 'pixi.js';
import {isMobile, userAgent } from 'react-device-detect';
import tile1 from '../assets/tile1.png'
import tile2 from '../assets/tile2.png'

let app;
let widthDesktop = 800;
let heightDesktop = 800;
let noOfSquareslevel1 = 4;

if(isMobile){
    app = new Application( {width: 375, height: 667, backgroundColor: 0x000000, autoResize: true, resizeTo: window, resolution: window.devicePixelRatio > 1 ? 1:1 }); //check this
}else{
    app = new Application( {width: 800, height: 800, backgroundColor: 0x000000, autoResize: true, resolution: window.devicePixelRatio > 1 ? 2:1 });
}
globalThis.__PIXI_APP__ = app;

document.getElementById('canvasContainer').appendChild(app.view);

const textureTile1 = await Assets.load(tile1); //check this
const textureTile2 = await Assets.load(tile2); //check this

// // Setup the position of the bunny
// bunny.x = app.renderer.width / 2;
// bunny.y = app.renderer.height / 2;

// // Rotate around the center
// bunny.anchor.x = 0.5;
// bunny.anchor.y = 0.5;//

// // Add the bunny to the scene we are building
// app.stage.addChild(bunny);

// Listen for frame updates
app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    //bunny.rotation += 0.01;
});
var gameInit = function(){

    const parentContainer = new Container();
    app.stage.addChild(parentContainer);
    let width = widthDesktop/noOfSquareslevel1;
    let height = heightDesktop/noOfSquareslevel1;

    for(let i = 0; i < noOfSquareslevel1; i++){
        for(let j = 0; j < noOfSquareslevel1; j++){
            const squareContainer = new Container();
            squareContainer.x = i*width;
            squareContainer.y = j*height;

            squareContainer.name = "row_" + i + "_col_" + j;
            let square = new Graphics();
            square.beginFill(0x000000, 0.5);
            square.lineStyle(2, 0xFF0000);
            square.drawRect(0, 0, width, height);
            square.endFill();

            const tile1Image = new Sprite(textureTile1);
            tile1Image.anchor.set(0.5);
            tile1Image.x = tile1Image.width/2;
            tile1Image.y= tile1Image.height/2;
            const tile2Image = new Sprite(textureTile2);
            tile2Image.anchor.set(0.5);
            tile2Image.x = tile2Image.width/2;
            tile2Image.y= tile2Image.height/2;

            squareContainer.addChild(square);
            squareContainer.addChild(tile1Image);
            squareContainer.addChild(tile2Image);

            parentContainer.addChild(squareContainer);
        }
    }
}

var resizeCanvasContainer = function () {
    if(isMobile){
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
window.onresize = function(){

    if(isMobile){
        bunny.x = app.renderer.width / 2;
        bunny.y = app.renderer.height / 2;
        let scale  = window.innerWidth/375;
        bunny.scale.set(scale*0.5);
    }else{
        resizeCanvasContainer();
    }

}
window.onresize();
gameInit();

