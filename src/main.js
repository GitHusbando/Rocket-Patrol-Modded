//I modded Rocket Patrol to replace sounds and sprites, and to add (basic) alternating multiplayer and a second set of controls
//I made the art myself and the sounds were under the creative commons license (except the menu selct sound, which i made with my face), then edited in audacity

//create game configuration object
console.log("creating game configuration object...");

let config =
{
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play], //keep these in order, defaults to starting from the first one
};

//create main game object
console.log("creating main game object...");
let game = new Phaser.Game(config);

//define game settings
game.settings =
{
    spaceshipSpeed: 3,
    gameTimer: 120000,
    switchTimer1: 30000,
    switchTimer2: 60000,
    switchTimer3: 90000,
}

//reserve some keyboard bindings
let keyF, keyL, keyLEFT, keyA, keyRIGHT, keyD;