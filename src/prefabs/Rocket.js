//Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite
{
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        //add object to existing scene
        //in the current context, this refers to the sprite
        scene.add.existing(this);

        //create a custom property for the rocket to track firing status
        this.isFiring = false;
        
        //add rocket sound effect
        this.sfxRocket = scene.sound.add("sfx_rocket");
    }

    update()
    {
        //left/right movement
        if(!this.isFiring)
        {
            if( (keyLEFT.isDown || keyA.isDown) && this.x >= 47)
            {
                this.x -= 2;
            }
            else if( (keyRIGHT.isDown || keyD.isDown) && this.x <= game.config.width - 47)
            {
                this.x +=2;
            }
        }

        //isDown checks if button is down coninuously, JustDown is for single presses
        //fire button
        if((Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keyL)) && !this.isFiring)
        {
            this.isFiring = true;
            
            //play sound effect
            this.sfxRocket.play();
        }

        //if fired, move up
        if (this.isFiring & this.y >= 108)
        {
            this.y -= 2;
        }

        //reset on miss
        if (this.y <= 108)
        {
            this.isFiring = false;
            this.y = game.config.height - 47;
        }
    }

    //reset rocket to the ground
    reset()
    {
        this.isFiring = false;
        this.y = game.config.height - 47;
    }
}