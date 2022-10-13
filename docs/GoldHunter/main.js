title = "GOLD HUNTER";

description = ` CATCHING 
YELLOW/CYAN BLOCKS 
AND AVOID RED BLOCKS
`;

characters = [];

const G = {
	WIDTH: 200,
	HEIGHT: 150,

	ENEMIESBASESPEED: 1.5,
	ENEMIESUPSPEED: 2.0

};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    isReplayEnabled: true,
    captureCanvasScale: 2,
	isPlayingBgm:true,
	seed:605
};

/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
let player;

/**
 * @typedef {{
 * pos: Vector,
 * }} Enemy
 */

/**
 * @type { Enemy [] }
 */
let enemies;


/**
 * @typedef {{
 * pos: Vector,
 * }} DirectionEnemy
 */

/**
 * @type { DirectionEnemy [] }
 */
let directionEnemies;


/**
 * @type { number }
 */
 let currentDirectionEnemySpeed;



/**
 * @type { number }
 */
 let currentEnemySpeed;

/**
 * @typedef {{
 * pos: Vector,
 * }} Gold
 */

/**
 * @type { Gold [] }
 */
let golds;

/**
 * @typedef {{
 * pos: Vector,
 * }} HighValueGold
 */
   
/**
 * @type { HighValueGold [] }
 */
 let highValueGolds;
   

function update() {
	if (!ticks) {
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5)
		};

		golds = [];
		enemies = [];
		directionEnemies = [];
		highValueGolds = [];

	}

	player.pos = vec(input.pos.x, input.pos.y);
    player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	color ("green");
	box(player.pos, 6);

	if (enemies.length === 0) {
        currentEnemySpeed =
            rnd(G.ENEMIESBASESPEED, G.ENEMIESUPSPEED) * difficulty;
        for (let i = 0; i < 9; i++) {
            const posX = rnd(0, G.WIDTH);
            const posY = -rnd(i * G.HEIGHT * 0.1);
            enemies.push({ pos: vec(posX, posY) })
        }
    }


	if (directionEnemies.length === 0) {
        currentDirectionEnemySpeed =
            rnd(G.ENEMIESBASESPEED, G.ENEMIESUPSPEED) * difficulty;
        for (let i = 0; i < 9; i++) {
            const posX = -rnd(i * G.WIDTH * 0.1);
            const posY = rnd(0, G.HEIGHT);
            directionEnemies.push({ pos: vec(posX, posY) })
        }
    }

	if (golds.length === 0) {
		for(let i = 0; i < 3; i++){
        	const posX = rnd(0, G.WIDTH);
        	const posY = rnd(0, G.HEIGHT);
        	golds.push({ pos: vec(posX, posY) })
		}

    }

	if (highValueGolds.length === 0) {

        const posX = rnd(0, G.WIDTH);
        const posY = rnd(0, G.HEIGHT);
        highValueGolds.push({ pos: vec(posX, posY) })
    }

	remove(enemies, (e) => {
        e.pos.y += currentEnemySpeed;
        color("red");
        box(e.pos, 5);

		const isCollidingWithEnemies = box(e.pos, 5).isColliding.rect.green;
		if (isCollidingWithEnemies){
			color("red");
            particle (e.pos);
			end();
		}

        return (e.pos.y > G.HEIGHT);
    });


	remove(directionEnemies, (de) => {
        de.pos.x += currentEnemySpeed;
        color("red");
        box(de.pos, 5);

		const isCollidingWithEnemies = box(de.pos, 5).isColliding.rect.green;
		if (isCollidingWithEnemies){
			color("red");
            particle (de.pos);
			play("hit");
			end();
		}

        return (de.pos.x > G.WIDTH);
    });

	remove(golds, (g) => {
        color("yellow");
        box(g.pos, 5);

        const isCollidingWithGold = box(g.pos, 5).isColliding.rect.green;
        if(isCollidingWithGold){
            color("yellow");
            particle (g.pos);
            addScore(1, g.pos);
            play("coin");
        }

        return (isCollidingWithGold);
    });

	remove(highValueGolds, (vg) => {
        color("cyan");
        box(vg.pos, 5);

        const isCollidingWithHighValueGold = box(vg.pos, 5).isColliding.rect.green;
        if(isCollidingWithHighValueGold){
            color("cyan");
            particle (vg.pos);
            addScore(5, vg.pos);
            play("lucky");
        }

        return (isCollidingWithHighValueGold);
    });





}
