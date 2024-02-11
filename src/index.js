const PIXI = require('pixi.js');
require('@pixi/graphics-extras');

function createPixiApp() { 
    //Create the App Window with some basic parameters so that the app is full screen.
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

    return app;
}

function addRectangleToStage(app, x, y, width, height, color) {
    // Create a new Graphics object, set size, position and color and add it to the stage
    const rectangle = new PIXI.Graphics();

    rectangle.beginFill(color);
    rectangle.drawRect(x, y, width, height);
    rectangle.endFill();

    app.stage.addChild(rectangle);
}

function addTorusToStage(app, x, y, radiusInner, radiusOuter, startArc, endArc, color) {

    const torus = new PIXI.Graphics();

    torus.beginFill(color);
    torus.drawTorus(x, y, radiusInner, radiusOuter, startArc, endArc);
    torus.endFill();

    app.stage.addChild(torus);
}
// TAG #1 (Creating Rand Object at intervall)
// function addRandomSquare(app, size, color) {
//     const square = new PIXI.Graphics();
//     square.beginFill(color);
//     square.drawRect(0, 0, size, size);
//     square.endFill();
//     square.x = Math.random() * (app.screen.width - size);
//     square.y = Math.random() * (app.screen.height - size);
//     app.stage.addChild(square);
// }

// let elapsed = 0.0;
// const interval = 1; // Interval in milliseconds




function main() {
    const app = createPixiApp();
    addRectangleToStage(app, 50, 50, 100, 100, 0xFF3300);
    document.body.appendChild(app.view);
    addTorusToStage(app, 300, 300, 60, 100, 0.6, Math.PI * 1.7, 0x3498db);
    addTorusToStage(app, 300, 300, 40, 70, 0, Math.PI * 1.5, 0xe74c3c);
    
    //app.renderer.backgroundColor = 0x23395D;
    //app.renderer.resize(500, 500);

    // TAG #1 (Creating Rand Object at intervall)
    // app.ticker.add((delta) => {
    //     elapsed += delta;
    //     if (elapsed >= interval / 16.66667) { // Approximately convert ms to frames (60fps -> 16.66667ms per frame)
    //         addRandomSquare(app, 10, 0xFFFFFF);
    //         elapsed = 0;
    //     }
    // });
}

main();