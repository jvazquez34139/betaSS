var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var map;
var tileset;
var layer;
var player;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.tilemapTiledJSON('map','js/maps.json');
    this.load.path = 'res/';
    this.load.image('bg','grassv2.png')
    this.load.spritesheet('dude', 'chararacter1.png', { frameWidth: 41, frameHeight: 109, spacing: 1 });
    this.load.image('tiles', 'gridtiles.png')
}

function create ()
{
    //world stuff
    this.cameras.main.setBounds(0, 0, 16 * 50 * 2, 16 * 38 * 2);
    this.physics.world.setBounds(0, 0, 16 * 50 * 2, 16 * 38 * 2);
    this.add.image(0,0, 'bg').setOrigin(0,0).setScale(50,38);
    map = this.make.tilemap({ key: 'map', tilewidth: 32, tileheight: 32});
    tileset = map.addTilesetImage('tiles');
    layer = map.createDynamicLayer('Level1', tileset).setScale(2);

    map.setCollision([ 20 , 48]);

    //player stuff
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(player, true, 0.1);
    this.anims.create({
        key: 'animate',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 17 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.existing(player);

    this.physics.add.collider(player, layer);

    //controlls stuff
    cursors = this.input.keyboard.createCursorKeys();
    asdw = this.input.keyboard.addKeys('W,S,A,D');
}

function update ()
{
    if (cursors.up.isDown || asdw.W.isDown){
        player.setVelocityY(-160);
        player.anims.play('animate', true);
    }else if (cursors.down.isDown || asdw.S.isDown){
        player.setVelocityY(160);
        player.anims.play('animate', true);
    }else{
      player.setVelocityY(0);
    }
    if (cursors.left.isDown || asdw.A.isDown){
        player.setVelocityX(-160);
        player.anims.play('animate', true);
    }else if (cursors.right.isDown || asdw.D.isDown){
        player.setVelocityX(160);
        player.anims.play('animate', true);
    }else {
      player.setVelocityX(0);
    }
}
