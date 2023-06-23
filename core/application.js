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
let elementsArray = [];
let elementsSelectedId = new Map();
let widthDesktop = 800;
let heightDesktop = 800;
let noOfSquareslevel1 = 4;
let firstElement = null;
let secondElement = null;
let blackOverlayGraphics = null;

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

            let backImage = new Graphics();
            backImage.name = "backImage";
            backImage.beginFill(0xFFFDD0, 1);
            backImage.lineStyle(3, 0x000000);
            backImage.drawRect(0, 0, 200, 200);
            backImage.endFill();
            backImage.pivot.set(backImage.width/2, backImage.height/2);
            backImage.scale.set(800/(noOfSquareslevel1*200));
            backImage.x = backImage.width/2;
            backImage.y= backImage.height/2;
            backImage.interactive = false;

            let frontImage = new Graphics();
            frontImage.name = "frontImage";
            frontImage.beginFill(0xFFA500, 1);
            frontImage.lineStyle(3, 0x000000);
            frontImage.drawRect(0, 0, 200, 200);
            frontImage.endFill();
            frontImage.pivot.set(frontImage.width/2, frontImage.height/2);
            frontImage.scale.set(800/(noOfSquareslevel1*200));
            frontImage.x = frontImage.width/2;
            frontImage.y= frontImage.height/2;

            let rnd = randomInteger(0,assetsArray.length - 1);
            const assetImage = new Sprite(assetsArray[rnd].image);
            assetImage.name = "asset";
            assetImage.anchor.set(0.5);
            assetImage.scale.set(800/(noOfSquareslevel1*200));
            assetImage.x = assetImage.width/2;
            assetImage.y= assetImage.height/2;
            assetImage.alpha = 0;

            //squareContainer.addChild(square);
            squareContainer.addChild(backImage);
            squareContainer.addChild(frontImage);
            squareContainer.addChild(assetImage);
            squareContainer.backImage = backImage;
            squareContainer.frontImage = frontImage;
            squareContainer.assetImage = assetImage;
            squareContainer.id = assetsArray[rnd].id;

            parentContainer.addChild(squareContainer);
            elementsArray.push({frontImage: frontImage, id: squareContainer.id});
            frontImage.interactive = true;
            frontImage.cursor = 'pointer';

            backImage.interactive = true;
            backImage.cursor = 'pointer';

            //backImage.on('pointerdown', (event) => { elemetCLicked(backImage, frontImage, assetImage, squareContainer, "close")});
            frontImage.on('pointerdown', (event) => { elemetCLicked(frontImage, backImage, assetImage, squareContainer, "open")});
        }
    }
    const blackLayerContainer = new Container();
    blackLayerContainer.name = "blackLayerContainer";
    let blackLayer = new Graphics();
    blackLayer.name = "blackLayer";
    blackLayer.interactive = false;
    blackLayer.beginFill(0x000000, 0.001);
    blackLayer.drawRect(0, 0, widthDesktop, heightDesktop);
    blackLayer.endFill();
    blackLayerContainer.addChild(blackLayer);
    app.stage.addChild(blackLayerContainer);

    blackLayer.interactive = true;
    blackLayer.visible = false;
    blackOverlayGraphics = blackLayer;
    blackLayer.on('pointerdown', (event) => { blackLayerClicked()});

}
function blackLayerClicked(){
    console.log("black overlauuuuuu")
    return;
}
function elemetCLicked(frontImage, backImage, assetImage, squareContainer, operation){ //during reverse flip, front and back arguments gets interchanged
    blackOverlayGraphics.visible = true;

    if(operation == "open"){
        if(firstElement == null){
            firstElement = squareContainer;
        }else{
            secondElement = squareContainer;
        }
    }
    let toScale = 1;
    frontImage.interactive = false;

    if(operation == "open"){
        backImage.scale.x = 0;
        backImage.scl = backImage.scale.x;
        frontImage.scl = frontImage.scale.x;
    
        assetImage.x = squareContainer.getBounds().width/2;
        assetImage.y=  squareContainer.getBounds().height/2;
    }else{
        assetImage.alpha = 0;

        frontImage.scale.x = 0;
        frontImage.scl = frontImage.scale.x;
        backImage.scl = backImage.scale.x;
    }

    gsap.to(frontImage, {scl: 0, duration: 0.1,
        onUpdate:()=>{
            frontImage.scale.x = frontImage.scl;
        },
        onComplete:()=>{
            gsap.to(backImage, {scl: toScale, duration: 0.1,
                onUpdate:()=>{
                    backImage.scale.x = backImage.scl;
                },
                onComplete:()=>{
                    if(operation == "open"){
                        gsap.to(assetImage, {alpha: 1, duration: 0.2,
                            onComplete:()=>{
                                blackOverlayGraphics.visible = false;
                                //backImage.interactive = true;
                                getResults();
                            }
                        });
                    }else{
                        assetImage.alpha = 0; 
                        backImage.interactive = true;
                        blackOverlayGraphics.visible = false;
                    }
                }
            });
        }
    });
}
function getResults(){
    if(firstElement !== null && secondElement !== null){
        blackOverlayGraphics.visible = true;

        if(firstElement.id == secondElement.id){
            console.log("matchedddd");
            elementsSelectedId.set(firstElement.id, firstElement);
            elementsSelectedId.set(secondElement.id, secondElement);
            //firstElement.getChildByName('backImage').interactive = false;
            firstElement.getChildByName('frontImage').interactive = false;

            //secondElement.getChildByName('backImage').interactive = false;
            secondElement.getChildByName('frontImage').interactive = false;

            firstElement = null;
            secondElement = null;
            blackOverlayGraphics.visible = false;
        }else{
            console.log("not matchedddd");

            setTimeout(() => {
                if(firstElement !== null && secondElement !== null){
                    console.log("I am hereeeeeeeeeeeeeeeeeeeeeeee")
                    elemetCLicked(firstElement.backImage, firstElement.frontImage, firstElement.assetImage, firstElement, "close");
                    elemetCLicked(secondElement.backImage, secondElement.frontImage, secondElement.assetImage, secondElement, "close");
    
                    firstElement = null;
                    secondElement = null;
                    blackOverlayGraphics.visible = false;     
                }
            }, 500);
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

