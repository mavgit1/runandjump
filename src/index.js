import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

import characterRun from '../assets/characterRun.png';
import characterDuck from '../assets/characterDuck.png';

//Create the App Window in fullscreen. This is the "Background"
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

// async function createGameContainer(app) {
//     let appWidth;
//     let appHeight;
//     if (app.width / 16 < app.height / 9){
//         appWidth = app.width;
//         appHeight = Math.floor(appWidth / 16 * 9)
//     }
//     else {
//         appHeight = app.height;
//         appWidth = Math.floor(appHeight / 9 * 16)
//     }
//     const game = new PIXI.Container({
//         width: appWidth,
//         height: appHeight,
//         resolution: 1,
//         backgroundColor: 0xCD5126,
//     });
//     return game;
// }

async function createGameContainer(app) {
    // Calculate the dimensions for the 16:9 frame
    let frameWidth, frameHeight;
    if (app.screen.width / 16 < app.screen.height / 9) {
        frameWidth = app.screen.width;
        frameHeight = Math.floor(frameWidth / 16 * 9);
    } else {
        frameHeight = app.screen.height;
        frameWidth = Math.floor(frameHeight / 9 * 16);
    }

    // Create a graphics object for the frame background
    const frameBackground = new PIXI.Graphics();
    frameBackground.beginFill(0xCD5126); // Orange/red color for visibility
    frameBackground.drawRect(0, 0, frameWidth, frameHeight);
    frameBackground.endFill();

    // Position the frameBackground centrally
    frameBackground.x = (app.screen.width - frameWidth) / 2;
    frameBackground.y = (app.screen.height - frameHeight) / 2;

    // Create the container for game elements
    const gameContainer = new PIXI.Container();

    // Add the frame background to the main app stage for visibility
    app.stage.addChild(frameBackground);
    // Add the gameContainer to the frameBackground for logical grouping (optional)
    // This step might vary depending on whether you want the background within the same container
    // or just use it for positioning.
    frameBackground.addChild(gameContainer);

    // Now, gameContainer can be used to add game elements at absolute positions within the 16:9 area
    // Any sprites or other elements added to gameContainer should be positioned
    // relative to the top-left corner of the frameBackground.

    return { frameBackground, gameContainer };
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
    const { frameBackground, gameContainer } = await createGameContainer(app);

    
    const test = await loadAssetAndSetup(characterRun, 200, 210);
    gameContainer.addChild(test);

    const test2 = await loadAssetAndSetup(characterDuck, 100, 210);
    gameContainer.addChild(test2);
}

main().catch(console.error); 
