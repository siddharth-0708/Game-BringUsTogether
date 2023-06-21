import { Application, Assets, Sprite, Container, Graphics } from 'pixi.js';
import {isMobile, userAgent } from 'react-device-detect';
import gsap from 'gsap';
import tile1 from '../assets/tile1.png'
import tile2 from '../assets/tile2.png'
import apple from '../assets/apple.png'
import kiwi from '../assets/kiwi.png'
import mango from '../assets/mango.png'
import orange from '../assets/orange.png'
import dragonFruit from '../assets/dragonFruit.png'
import captainAmerica from '../assets/captainAmerica.png'

let app;
let widthDesktop = 800;
let heightDesktop = 800;
let noOfSquareslevel1 = 4;
let firstElement = null;
let secondElement = null;

if(isMobile){
    app = new Application( {width: 375, height: 667, backgroundAlpha: 1, backgroundColor: 0x000000, autoResize: true, resizeTo: window, resolution: window.devicePixelRatio > 1 ? 1:1 }); //check this
}else{
    app = new Application( {width: 800, height: 800, backgroundAlpha: 1,  backgroundColor: 0x000000, autoResize: true, resolution: window.devicePixelRatio > 1 ? 2:1 });
}
globalThis.__PIXI_APP__ = app;

document.getElementById('canvasContainer').appendChild(app.view);

const textureApple = await Assets.load(apple); //check this
const textureMango = await Assets.load(mango); //check this
const textureOrange = await Assets.load(orange); //check this
const textureDragonFruit = await Assets.load(dragonFruit); //check this
const textureCaptainAmerica = await Assets.load(captainAmerica); //check this

let assetsArray = [{id: 1, image:textureApple}, {id: 2, image:textureMango}, {id: 3, image:textureOrange}, {id: 4, image: textureDragonFruit}, {id: 5, image: textureCaptainAmerica}];

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
            squareContainer.x = j*width;
            squareContainer.y = i*height;

            squareContainer.name = "row_" + i + "_col_" + j;
            // let square = new Graphics(); 
            // square.beginFill(0x000000, 0.5);
            /*
            Question: what is beginFill and endFill?
            Specifies a simple one-color fill that subsequent calls to other Graphics methods (such as lineTo() or drawCircle()) use when drawing.
            */
            // square.lineStyle(2, 0xFF0000);
            // square.drawRect(0, 0, width, height);
            // square.endFill();

            let tile1Image = new Graphics();
            tile1Image.name = "tile1Image";
            tile1Image.beginFill(0xFFFDD0, 1);
            tile1Image.lineStyle(3, 0x000000);
            tile1Image.drawRect(0, 0, 200, 200);
            tile1Image.endFill();
            tile1Image.pivot.set(tile1Image.width/2, tile1Image.height/2);
            tile1Image.scale.set(800/(noOfSquareslevel1*200));
            tile1Image.x = tile1Image.width/2;
            tile1Image.y= tile1Image.height/2;

            let tile2Image = new Graphics();
            tile2Image.name = "tile2Image";
            tile2Image.beginFill(0xFFA500, 1);
            tile2Image.lineStyle(3, 0x000000);
            tile2Image.drawRect(0, 0, 200, 200);
            tile2Image.endFill();
            tile2Image.pivot.set(tile2Image.width/2, tile2Image.height/2);
            tile2Image.scale.set(800/(noOfSquareslevel1*200));
            tile2Image.x = tile2Image.width/2;
            tile2Image.y= tile2Image.height/2;

            let rnd = randomInteger(0,assetsArray.length - 1);
            const assetImage = new Sprite(assetsArray[rnd].image);
            assetImage.name = "asset";
            assetImage.anchor.set(0.5);
            assetImage.scale.set(800/(noOfSquareslevel1*200));
            assetImage.x = assetImage.width/2;
            assetImage.y= assetImage.height/2;
            assetImage.alpha = 0;

            //squareContainer.addChild(square);
            squareContainer.addChild(tile1Image);
            squareContainer.addChild(tile2Image);
            squareContainer.addChild(assetImage);
            squareContainer.id = assetsArray[rnd].id;

            parentContainer.addChild(squareContainer);
            tile2Image.interactive = true;
            tile2Image.cursor = 'pointer';

            tile1Image.interactive = true;
            tile1Image.cursor = 'pointer';

            tile1Image.on('pointerdown', (event) => { elemetCLicked(tile1Image, tile2Image, assetImage, squareContainer, "close")});
            tile2Image.on('pointerdown', (event) => { elemetCLicked(tile2Image, tile1Image, assetImage, squareContainer, "open")});
        }
    }
}
function elemetCLicked(tile2Image, tile1Image, assetImage, squareContainer, operation){
    if(operation == "open"){
        if(firstElement == null){
            firstElement = squareContainer;
        }else{
            secondElement = squareContainer;
        }
    }
    let toScale = 1;
    tile2Image.interactive = false;
    tile1Image.interactive = false;

    if(operation == "open"){
        tile1Image.scale.x = 0;
        tile1Image.scl = tile1Image.scale.x;
        tile2Image.scl = tile2Image.scale.x;
    
        assetImage.x = squareContainer.getBounds().width/2;
        assetImage.y=  squareContainer.getBounds().height/2;
    }else{
        assetImage.alpha = 0;

        tile2Image.scale.x = 0;
        tile2Image.scl = tile2Image.scale.x;
        tile1Image.scl = tile1Image.scale.x;
    }

    gsap.to(tile2Image, {scl: 0, duration: 0.1,
        onUpdate:()=>{
            tile2Image.scale.x = tile2Image.scl;
        },
        onComplete:()=>{
            gsap.to(tile1Image, {scl: toScale, duration: 0.1,
                onUpdate:()=>{
                    tile1Image.scale.x = tile1Image.scl;
                },
                onComplete:()=>{
                    if(operation == "open"){
                        gsap.to(assetImage, {alpha: 1, duration: 0.2,
                            onComplete:()=>{
                                //tile1Image.interactive = true;
                                getResults();
                            }
                        });
                    }else{
                        assetImage.alpha = 0; 
                        tile1Image.interactive = true;
                    }
                }
            });
        }
    });
}
function getResults(){
    if(firstElement !== null && secondElement !== null){
        if(firstElement.id == secondElement.id){
            console.log("matchedddd");
            firstElement.getChildByName('tile1Image').interactive = false;
            firstElement.getChildByName('tile2Image').interactive = false;

            secondElement.getChildByName('tile1Image').interactive = false;
            secondElement.getChildByName('tile2Image').interactive = false;

            firstElement = null;
            secondElement = null;
        }else{
            console.log("not matchedddd");
            firstElement.getChildByName('tile1Image').interactive = true;
            secondElement.getChildByName('tile1Image').interactive = true;
            setTimeout(() => {
                elemetCLicked(firstElement.getChildByName('tile1Image'), firstElement.getChildByName('tile2Image'), firstElement.getChildByName('asset'),firstElement, "close");
                elemetCLicked(secondElement.getChildByName('tile1Image'), secondElement.getChildByName('tile2Image'), secondElement.getChildByName('asset'),secondElement, "close");

                firstElement = null;
                secondElement = null;
            }, 100);
        }
    }
}
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

