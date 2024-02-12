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


function main() {
    //Creation of AppView, adding to HTML
    const app = createPixiApp();
    document.body.appendChild(app.view);

    //Main Game-Loop
    app.ticker.add(function(delta){

    });
}

main();