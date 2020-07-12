//I attempted both S-tier assignments

//first, I modded Rocket Patrol to replace sounds, sprites, and some of the rectangle/text colors to make the game have a silly leech-based underwater theme
//I made the art myself and the sounds were under the creative commons license (except the menu selct sound, which i made with my face), then edited in audacity

//second, I added (basic) alternating multiplayer and a second set of controls (so that both players could have their hands on the keyboard at once)
    //(both sets of controls can be used by either player; I didn't see the point in restricting the controls to one player or another since only one can play at once and this allows them to choose what controls they want to use at any given moment)
//I added a title at the top to tell players when it was their turn and changed the game over text to say who won
    //If I was being more ambitious, I would have added a buffer time between players for players to switch off more smoothly
    //I also would have added a clearer indication of whose score was whose at the top of the screen, but I figured if a player increased their score at all, it would become fairly obvious

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