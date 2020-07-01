//create a scene class called menu that inherits Phaser.Scene
class Menu extends Phaser.Scene
{
    //new constructor in Menu that calls Phaser.Scene's constructor with the scene name menuScene
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        //load audio
        this.load.audio("sfx_select", "./assets/blip_select12.wav");
        this.load.audio("sfx_explosion", "./assets/explosion38.wav");
        this.load.audio("sfx_rocket", "./assets/rocket_shot.wav");
    }

    create()
    {
        //menu text configuration
        let menuConfig =
        {
            fontFamily: "Courier",
            fontSize: "28px",
            //backgroundColor: "#F3B141",
            color: "#00ff1a",
            align: "right",
            padding:
            {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, "BRIGHTLY-COLORED LEECHES", menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#ff4583";
        menuConfig.fontSize = "18px";
        this.add.text(centerX, centerY, "use ← → /(A)(D) to move & (F)/(L) to leap", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, "press ← /(A) for Easy or → /(D) for Hard", menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyA))
        {
            //easy mode
            game.settings =
            {
                spaceshipSpeed: 3,
                gameTimer: 120000,
                switchTimer1: 30000,
                switchTimer2: 60000,
                switchTimer3: 90000,
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyD))
        {
            //hard mode
            game.settings =
            {
                spaceshipSpeed: 4,
                gameTimer: 60000,
                switchTimer1: 15000,
                switchTimer2: 30000,
                switchTimer3: 45000,
            }
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
    }
}

    //these methods must be run in this order
    /*
    init()
    {
        //sets the stage
    }

    preload()
    {
        //loads assets n stuff
    }

   create()
   {
       this.add.text(20, 20, "Rocket Patrol Menu");
   }

   /*
   update()
   {
       //loop
   }
   */