const PIXI = require('pixi.js');

let app = new PIXI.Application({ 
    width: 256, 
    height: 256,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
});

document.body.appendChild(app.view);
