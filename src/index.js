import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

import characterRun from '../assets/characterRun.png';
import characterDuck from '../assets/characterDuck.png';
//Create the App Window with some basic parameters so that the app is full screen.
async function createPixiApp() {
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: false,
        resolution: 1,
        backgroundColor: 0x23395D,
    });
    app.view.style.position = 'absolute';
    app.view.style.top = '0';
    app.view.style.left = '0';

    document.body.appendChild(app.view);
    return app;
}

async function loadAssetAndSetup(path, initX, initY) {
    const texture = await PIXI.Assets.load(path);
    const frames = createFrames(texture);
    const animatedSprite = new PIXI.AnimatedSprite(frames);
    animatedSprite.animationSpeed = 12 / 60; // 12 fps
    animatedSprite.x = initX;
    animatedSprite.y = initY;
    animatedSprite.play();
    return animatedSprite;
}

function createFrames(texture) {
    let frames = [];
    const frameWidth = 32;
    const frameHeight = 32;

    // Assuming 3 columns and 2 rows in the sprite sheet
    for (let i = 0; i < 2; i++) { // Rows
        for (let j = 0; j < 3; j++) { // Columns
            let frame = new PIXI.Rectangle(j * frameWidth, i * frameHeight, frameWidth, frameHeight);
            let textureFrame = new PIXI.Texture(texture.baseTexture, frame);
            frames.push(textureFrame);
        }
    }
    return frames;
}

async function main() {
    const app = await createPixiApp();
    const test = await loadAssetAndSetup(characterRun, 200, 210);
    app.stage.addChild(test);

    const test2 = await loadAssetAndSetup(characterDuck, 100, 210);
    app.stage.addChild(test2);
}

main().catch(console.error); 
