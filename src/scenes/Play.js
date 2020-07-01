//create a scene class called menu that inherits Phaser.Scene
class Play extends Phaser.Scene
{
    //new constructor in Menu that calls Phaser.Scene's constructor with the scene name menuScene
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        //load images and tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("rocket2", "./assets/rocket2.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create()
    {
        //place tile sprite background
        //things added first go further in the back by default
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, "starfield").setOrigin(0, 0); //making starfield a property of the play object so it can be used in update

        //white rectangle borders
        // x, y, width, height, color
        this.add.rectangle(5, 5, game.config.width-10, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, game.config.height-37, game.config.width-10, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 5, 32, game.config.height-10, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width-37, 5, 32, game.config.height-10, 0xFFFFFF).setOrigin(0,0);

        //colored UI background
        this.add.rectangle(37, 42, game.config.width-74, 64, 0x89add9).setOrigin(0,0);

        //add rocket [p1]
        //can use .setScale(0.5, 0.5) to halve size
        this.p1Rocket = new Rocket(this, game.config.width/2 - 10, game.config.height - 47, "rocket", 0);
        this.p2Rocket = new Rocket(this, game.config.width/2 + 10, game.config.height - 47, "rocket2", 0);
        
        //add ships
        this.ship01 = new Spaceship(this,game.config.width+192, 132, "spaceship", 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this,game.config.width+96, 196, "spaceship", 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this,game.config.width, 260, "spaceship", 0, 10).setOrigin(0, 0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //animation config create new anim in the animation manager and bind it to the scene
        this.anims.create
        ({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion",{start: 0, end: 9, first: 0}),
            frameRate: 15
        });

        //player turn display
        let turnConfig =
        {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#ff2b56",
            color: "#26000c",
            align: "left",
            padding:
            {
                top: 5,
                bottom: 5
            },
        }

        this.turnDisplay = this.add.text(game.config.width/2 - 70, 54, "Player 1", turnConfig);

        //score
        this.p1Score = 0;
        this.p2Score = 0;

        //score display
        let scoreConfig =
        {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding:
            {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - 170, 54, this.p2Score, scoreConfig);

        //game over flag
        this.gameOver = false;

        //player turn flag
        this.playerOneTurn = true;

        //15 to 30-second player switch clocks
        scoreConfig.fixedWidth = 0;
        this.switchClock1 = this.time.delayedCall(game.settings.switchTimer1, () =>
        {
            this.p1Rocket.reset();
            this.p2Rocket.reset();
            this.playerOneTurn = false;
            this.turnDisplay.setBackgroundColor("#00d92f");
            this.turnDisplay.setColor("#003d0d");
            this.turnDisplay.setText("Player 2");
        },
        null, this);
        this.switchClock2 = this.time.delayedCall(game.settings.switchTimer2, () =>
        {
            this.p1Rocket.reset();
            this.p2Rocket.reset();
            this.playerOneTurn = true;
            this.turnDisplay.setBackgroundColor("#ff2b56");
            this.turnDisplay.setColor("#26000c");
            this.turnDisplay.setText("Player 1");
        },
        null, this);
        this.switchClock3 = this.time.delayedCall(game.settings.switchTimer3, () =>
        {
            this.p1Rocket.reset();
            this.p2Rocket.reset();
            this.playerOneTurn = false;
            this.turnDisplay.setBackgroundColor("#00d92f");
            this.turnDisplay.setColor("#003d0d");
            this.turnDisplay.setText("Player 2");
        },
        null, this);

        //60 to 120-second play clock
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>
        {
            if (this.p1Score > this.p2Score)
            {
                this.add.text(game.config.width/2, game.config.height/2, "Player 1 Wins!", scoreConfig).setOrigin(0.5);
            }
            else if (this.p1Score < this.p2Score)
            {
                this.add.text(game.config.width/2, game.config.height/2, "Player 2 Wins!", scoreConfig).setOrigin(0.5);
            }
            else
            {
                this.add.text(game.config.width/2, game.config.height/2, "It was a tie!", scoreConfig).setOrigin(0.5);
            }
            this.add.text(game.config.width/2, game.config.height/2 + 64, "(F)/(L) to Restart or ← /(A) for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        },
        null, this);
    }

    update() //happens every frame
    {
        //check key input for restart
        if(this.gameOver && (Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keyL)))
        {
            this.scene.restart(this.p1Score);
            this.scene.restart(this.p2Score);
        }

        //check key input for menu
        if(this.gameOver && (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyA)))
        {
            this.scene.start("menuScene");
        }

        //scroll background tile sprite
        this.starfield.tilePositionY += 1;

        if(!this.gameOver)
        {
            if(this.playerOneTurn)
            {
                //update rocket
                this.p1Rocket.update();
            }
            else
            {
                //update rocket
                this.p2Rocket.update();
            }
            //update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            
        }

        //collision for player 1
        if(this.checkCollision(this.p1Rocket,this.ship03))
        {

            this.p1Rocket.reset();
            this.shipExplode(this.ship03, 1);
        }
        if(this.checkCollision(this.p1Rocket,this.ship02))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02, 1);
        }
        if(this.checkCollision(this.p1Rocket,this.ship01))
        {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01, 1);
        }

        //collision for player2
        if(this.checkCollision(this.p2Rocket,this.ship03))
        {

            this.p2Rocket.reset();
            this.shipExplode(this.ship03, 2);
        }
        if(this.checkCollision(this.p2Rocket,this.ship02))
        {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02, 2);
        }
        if(this.checkCollision(this.p2Rocket,this.ship01))
        {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01, 2);
        }
    }

    checkCollision(rocket, ship)
    {
        //simple AABB bounds checking
        //reduncies left for simplicity
        if((rocket.x - rocket.width/2) < ship.x + ship.width &&
           (rocket.x - rocket.width/2) + rocket.width/2 > ship.x &&
           (rocket.y - rocket.height/2) < ship.y + ship.height &&
           rocket.height/2 + (rocket.y - rocket.height/2) > ship.y)
        {
             return true;
        }
        else
        {
            return false;
        }
    }

    shipExplode(ship, rocketNum) //not necessarily the best way to do this
    {
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion at the ship's location
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        boom.anims.play("explode"); //play explosion animation
        boom.on("animationcomplete", () => //callback after animation completes
        {
            ship.reset(); //reset ship position
            ship.alpha = 1; //make ship visible again
            boom.destroy(); //remove explosion sprite
        });

        if (rocketNum == 1)
        {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        }
        else if (rocketNum == 2)
        {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        
        

        //play explosion sound
        this.sound.play("sfx_explosion");
    }
}