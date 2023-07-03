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

import frontTile from '../assets/new/frontTile.png'
import backTile from '../assets/new/backTile.png'
import batman from '../assets/new/batman.png'
import harleyQuinn from '../assets/new/harleyQuinn.png'
import joker from '../assets/new/joker.png'
import spiderman from '../assets/new/spiderman.png'
import superman from '../assets/new/superman.png'
import thanos from '../assets/new/thanos.png'
import wonderWoman from '../assets/new/wonderWoman.png'

import aquaman from '../assets/new/aquaman.png'
import captainmarvel from '../assets/new/captainmarvel.png'
import catwoman from '../assets/new/catwoman.png'
import doctorstrange from '../assets/new/doctorstrange.png'
import flash from '../assets/new/flash.png'
import hulk from '../assets/new/hulk.png'
import ironman from '../assets/new/ironman.png'
import shehulk from '../assets/new/shehulk.png'
import storm from '../assets/new/storm.png'
import thor from '../assets/new/thor.png'
import wolverine from '../assets/new/wolverine.png'

let app;
let elementsArray = [];
let containersArray = [];
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

// const textureApple = await Assets.load(apple); //check this
// const textureMango = await Assets.load(mango); //check this
// const textureOrange = await Assets.load(orange); //check this
// const textureDragonFruit = await Assets.load(dragonFruit); //check this
// const textureCaptainAmerica = await Assets.load(captainAmerica); //check this

const textureFrontTile = await Assets.load(frontTile); //check this
const textureBackTile = await Assets.load(backTile); //check this
const textureBatman = await Assets.load(batman); //check this
const textureHarleyQuinn = await Assets.load(harleyQuinn); //check this
const textureJoker = await Assets.load(joker); //check this
const textureSpiderman = await Assets.load(spiderman); //check this
const textureSuperman = await Assets.load(superman); //check this
const textureThanos = await Assets.load(thanos); //check this
const textureWonderWoman = await Assets.load(wonderWoman); //check this

const textureAquaman = await Assets.load(aquaman); //check this
const textureCaptainmarvel = await Assets.load(captainmarvel); //check this
const textureCatwoman = await Assets.load(catwoman); //check this
const textureDoctorstrange = await Assets.load(doctorstrange); //check this
const textureFlash = await Assets.load(flash); //check this
const textureHulk = await Assets.load(hulk); //check this
const textureIronman = await Assets.load(ironman); //check this
const textureStorm = await Assets.load(storm); //check this
const textureThor = await Assets.load(thor); //check this
const textureWolverine = await Assets.load(wolverine); //check this
const textureShehulk = await Assets.load(shehulk); //check this

let assetsArray = [
{id: 1, image:textureBatman},
{id: 2, image:textureHarleyQuinn}, 
{id: 3, image:textureJoker}, 
{id: 4, image: textureSpiderman}, 
{id: 5, image: textureSuperman}, 
{id: 6, image: textureThanos}, 
{id: 7, image: textureWonderWoman},
{id: 8, image:textureAquaman}, 
{id: 9, image:textureCaptainmarvel}, 
{id: 10, image: textureCatwoman}, 
{id: 11, image: textureDoctorstrange}, 
{id: 12, image: textureFlash}, 
{id: 13, image: textureHulk},
{id: 14, image:textureIronman}, 
{id: 15, image: textureStorm}, 
{id: 16, image: textureThor}, 
{id: 17, image: textureWolverine}, 
{id:18, image: textureShehulk}
];
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

            let frontImage = new Sprite(textureFrontTile);
            //let frontImage = new Graphics();
            frontImage.name = "frontImage";
            //frontImage.beginFill(0xFFA500, 1);
            //frontImage.lineStyle(3, 0x000000);
            //frontImage.drawRect(0, 0, 200, 200);
            //frontImage.endFill();
            frontImage.anchor.set(0.5);
            //frontImage.pivot.set(frontImage.width/2, frontImage.height/2);
            frontImage.scale.set(800/(noOfSquareslevel1*200));
            frontImage.x = frontImage.width/2;
            frontImage.y= frontImage.height/2;

            // const assetImage = new Sprite(assetsArray[rnd].image);
            // assetImage.name = "asset";
            // assetImage.anchor.set(0.5);
            // assetImage.scale.set(800/(noOfSquareslevel1*200));
            // assetImage.x = assetImage.width/2;
            // assetImage.y= assetImage.height/2;
            // assetImage.alpha = 0;

            //let backImage = new Graphics();
            let backImage = new Sprite(assetsArray[0].image);
            backImage.name = "backImage";
            // backImage.beginFill(0xFFFDD0, 1);
            // backImage.lineStyle(3, 0x000000);
            // backImage.drawRect(0, 0, 200, 200);
            // backImage.endFill();
            //backImage.pivot.set(backImage.width/2, backImage.height/2);
            backImage.anchor.set(0.5);
            backImage.scale.set(800/(noOfSquareslevel1*200));
            backImage.x = backImage.width/2;
            backImage.y= backImage.height/2;
            //backImage.interactive = false;

            let borderGraphics = new Graphics();
            borderGraphics.name = "borderGraphics";
            borderGraphics.beginFill(0xFFFFFF, 0.1);
            borderGraphics.lineStyle(2, 0x000000);
            borderGraphics.drawRect(0, 0, 200, 200);
            borderGraphics.endFill();
            borderGraphics.pivot.set(borderGraphics.width/2, borderGraphics.height/2);
            borderGraphics.scale.set(800/(noOfSquareslevel1*200));
            borderGraphics.x = borderGraphics.width/2;
            borderGraphics.y= borderGraphics.height/2;

            //squareContainer.addChild(square);
            squareContainer.addChild(backImage);
            squareContainer.addChild(frontImage);
            //squareContainer.addChild(assetImage);
            squareContainer.addChild(borderGraphics);
            squareContainer.backImage = backImage;
            squareContainer.frontImage = frontImage;
            //squareContainer.assetImage = assetImage;
            squareContainer.id = assetsArray[0].id;

            parentContainer.addChild(squareContainer);
            elementsArray.push({frontImage: frontImage, id: squareContainer.id});
            containersArray.push(squareContainer);
            frontImage.interactive = true;
            frontImage.cursor = 'pointer';

            backImage.interactive = true;
            backImage.cursor = 'pointer';

            //backImage.on('pointerdown', (event) => { elemetCLicked(backImage, frontImage, assetImage, squareContainer, "close")});
            frontImage.on('pointerdown', (event) => { elemetCLicked(frontImage, backImage, null, squareContainer, "open")});
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
    addTextures();

    blackLayer.interactive = true;
    blackLayer.visible = false;
    blackOverlayGraphics = blackLayer;
    blackLayer.on('pointerdown', (event) => { blackLayerClicked()});

}
function blackLayerClicked(){
    console.log("black overlauuuuuu")
    return;
}
function addTextures(){
    let assetLength = Math.min(assetsArray.length, noOfSquareslevel1);
    let iterator = 0;

    while(containersArray.length > 0){
        if(iterator > assetLength - 1){
            iterator = 0;
        };
        let rnd = randomInteger(0,containersArray.length - 1);
        let cont = containersArray[rnd];
        cont.id = assetsArray[iterator].id;
        let backImage = cont.getChildByName('backImage');
        backImage.texture = assetsArray[iterator].image;
        backImage.anchor.set(0.5);
        backImage.scale.set(800/(noOfSquareslevel1*200));
        backImage.x = backImage.width/2;
        backImage.y= backImage.height/2;
        console.log("image added is ", assetsArray[iterator].id);
        containersArray.splice(rnd, 1);
        iterator++;
    }
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
    let toScale = frontImage.scale.x;
    frontImage.interactive = false;

    if(operation == "open"){
        backImage.scale.x = 0;
        backImage.scl = backImage.scale.x;
        frontImage.scl = frontImage.scale.x;
    
        // assetImage.x = squareContainer.getBounds().width/2;
        // assetImage.y=  squareContainer.getBounds().height/2;
    }else{
        //assetImage.alpha = 0;

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
                        //assetImage.alpha = 1;
                        blackOverlayGraphics.visible = false;
                        getResults();
                        // gsap.to(assetImage, {alpha: 1, duration: 0,
                        //     onComplete:()=>{
                        //         blackOverlayGraphics.visible = false;
                        //         //backImage.interactive = true;
                        //         getResults();
                        //     }
                        // });
                    }else{
                        //assetImage.alpha = 0; 
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
                    elemetCLicked(firstElement.backImage, firstElement.frontImage, null, firstElement, "close");
                    elemetCLicked(secondElement.backImage, secondElement.frontImage, null, secondElement, "close");
    
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

