import { Application, Assets, Sprite } from 'pixi.js';
import bunny1 from '../assets/bunny.png'

const app = new Application( {width: 1280, height: 720, backgroundColor: 0x000000, autoResize: true, resolution: window.devicePixelRatio > 1 ? 2:1 });
globalThis.__PIXI_APP__ = app;

document.getElementById('canvasContainer').appendChild(app.view);

const texture = await Assets.load(bunny1);
const bunny = new Sprite(texture);
// Setup the position of the bunny
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;

// Rotate around the center
bunny.anchor.x = 0.5;
bunny.anchor.y = 0.5;//

// Add the bunny to the scene we are building
app.stage.addChild(bunny);

// Listen for frame updates
app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
});
var resizeCanvasContainer = function () {
    /* our scaling is based on 1280x720*/
    var maxWidth = 1280;
    var maxHeight = 720;
    var canvasMargin = 0.9;
    var ratio = Math.min(window.innerWidth / maxWidth, window.innerHeight / maxHeight) * canvasMargin;

    if (window.innerWidth * canvasMargin < maxWidth || window.innerHeight * canvasMargin < maxHeight) {
        document.getElementById("canvasContainer").style.transform = "scale(" + ratio + ")";
    }
};
resizeCanvasContainer();
window.onresize = function(){
    resizeCanvasContainer();
    console.log("from master");
}

