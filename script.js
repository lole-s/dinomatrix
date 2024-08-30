const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(256).join(1).split('');
const dino = document.getElementById('dino');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

let isJumping = false;
let dinoX = canvas.width / 2;
let score = 0;
let speed = 2;
let lives = 3;

const cocos = [];
const fireballs = [];
let fireballActive = false;

// Sonidos
const collectSound = new Audio('./music/collect.mp3');
const loseLifeSound = new Audio('./music/lose_life.wav');
const gainLifeSound = new Audio('./gain_life.wav'); // Sonido para ganar una vida
const backgroundMusic = new Audio('./music/background_music.wav');
backgroundMusic.loop = true;
backgroundMusic.play();

/**
 * Dibuja el efecto de la matriz en el fondo.
 */
function drawMatrix() {
    ctx.fillStyle = 'rgba(100, 0, 50, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0FF'; // Color azul
    letters.map((y_pos, index) => {
        const text = ['*', '!', '.', '-'][Math.floor(Math.random() * 4)];
        const x_pos = index * 10;
        ctx.fillText(text, x_pos, y_pos);
        letters[index] = y_pos > 758 + Math.random() * 1e4 ? 0 : y_pos + 10;
    });
}

/**
 * Crea un nuevo coco que cae desde la parte superior de la pantalla.
 */
function createCoco() {
    const coco = document.createElement('div');
    coco.className = 'coco';
    coco.style.position = 'absolute';
    coco.style.top = '0px';
    coco.style.left = `${(Math.random() * canvas.width) - 30}px`;
    coco.style.width = '30px';
    coco.style.height = '30px';
    coco.style.backgroundImage = 'url("./img/coco.png")';
    coco.style.backgroundSize = 'contain';
    coco.style.backgroundRepeat = 'no-repeat';
    document.body.appendChild(coco);
    cocos.push(coco);
}

/**
 * Crea un nuevo coco dorado que cae desde la parte superior de la pantalla.
 */
function createCocoGold() {
    const cocoGold = document.createElement('div');
    cocoGold.className = 'coco_gold';
    cocoGold.style.position = 'absolute';
    cocoGold.style.top = '0px';
    cocoGold.style.left = `${(Math.random() * canvas.width) - 30}px`;
    cocoGold.style.width = '60px';
    cocoGold.style.height = '60px';
    cocoGold.style.backgroundImage = 'url("./img/coco_gold.png")';
    cocoGold.style.backgroundSize = 'contain';
    cocoGold.style.backgroundRepeat = 'no-repeat';
    document.body.appendChild(cocoGold);
    cocos.push(cocoGold);
}

/**
 * Crea una nueva bola de fuego que puede ser terrestre o aérea.
 * @param {string} type - El tipo de bola de fuego ('ground' o 'air').
 */
function createFireball(type) {
    if (fireballActive) return;

    const fireball = document.createElement('div');
    fireball.className = 'fireball';
    fireball.style.position = 'absolute';
    fireball.style.width = '50px';
    fireball.style.height = '50px';

    if (type === 'ground') {
        fireball.style.backgroundImage = 'url("./im/fireball_ground.png")';
        fireball.style.bottom = '10px';
        fireball.style.left = `${canvas.width - 30}px`; // Solo desde la derecha
    } else if (type === 'air') {
        fireball.style.backgroundImage = 'url("./im/fireball_air.png")';
        fireball.style.top = '0px';
        fireball.style.left = `${Math.random() * canvas.width}px`;
    }

    fireball.style.backgroundSize = 'contain';
    fireball.style.backgroundRepeat = 'no-repeat';
    document.body.appendChild(fireball);
    fireballs.push({ element: fireball, type: type });
    fireballActive = true;
}

/**
 * Actualiza la posición de los cocos y verifica colisiones con el Dino.
 */
function updateCocos() {
    cocos.forEach((coco, index) => {
        let cocoY = parseFloat(coco.style.top) || 0;
        cocoY += speed;
        coco.style.top = `${cocoY}px`;

        if (cocoY > canvas.height) {
            document.body.removeChild(coco);
            cocos.splice(index, 1);
            lives--;
            loseLifeSound.play();
            if (lives <= 0) {
                alert('Game Over');
                location.reload();
            }
        }

        const dinoRect = dino.getBoundingClientRect();
        const cocoRect = coco.getBoundingClientRect();
        if (
            dinoRect.left < cocoRect.left + cocoRect.width &&
            dinoRect.left + dinoRect.width > cocoRect.left &&
            dinoRect.top < cocoRect.top + cocoRect.height &&
            dinoRect.height + dinoRect.top > cocoRect.top
        ) {
            document.body.removeChild(coco);
            cocos.splice(index, 1);
            if (coco.className === 'coco_gold') {
                lives++;
                gainLifeSound.play();
            } else {
                score += 10;
                collectSound.play();
                if (score % 1000 === 0) {
                    speed += 1;
                }
            }
        }
    });
}

/**
 * Actualiza la posición de las bolas de fuego y verifica colisiones con el Dino.
 */
function updateFireballs() {
    fireballs.forEach((fireball, index) => {
        if (fireball.type === 'ground') {
            let fireballX = parseFloat(fireball.element.style.left) || 0;
            fireballX -= speed;
            fireball.element.style.left = `${fireballX}px`;

            if (fireballX < 0) {
                document.body.removeChild(fireball.element);
                fireballs.splice(index, 1);
                fireballActive = false;
            }
        } else if (fireball.type === 'air') {
            let fireballY = parseFloat(fireball.element.style.top) || 0;
            fireballY += speed;
            fireball.element.style.top = `${fireballY}px`;

            if (fireballY > canvas.height) {
                document.body.removeChild(fireball.element);
                fireballs.splice(index, 1);
                fireballActive = false;
            }
        }

        const dinoRect = dino.getBoundingClientRect();
        const fireballRect = fireball.element.getBoundingClientRect();
        if (
            dinoRect.left < fireballRect.left + fireballRect.width &&
            dinoRect.left + dinoRect.width > fireballRect.left &&
            dinoRect.top < fireballRect.top + fireballRect.height &&
            dinoRect.height + dinoRect.top > fireballRect.top
        ) {
            if (fireball.type === 'air' || (fireball.type === 'ground' && dinoRect.bottom > fireballRect.top)) {
                document.body.removeChild(fireball.element);
                fireballs.splice(index, 1);
                lives--;
                loseLifeSound.play();
                if (lives <= 0) {
                    alert('Game Over');
                    location.reload();
                }
                fireballActive = false;
            }
        }
    });
}

/**
 * Actualiza la puntuación en pantalla.
 */
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

/**
 * Actualiza las vidas en pantalla.
 */
function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`;
}

/**
 * Bucle principal del juego.
 */
function gameLoop() {
    drawMatrix();
    updateCocos();
    updateFireballs();
    updateScore();
    updateLives();
    requestAnimationFrame(gameLoop);
}

/**
 * Maneja los eventos de teclado para el movimiento y salto del Dino.
*/
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        dino.style.bottom = '100px';
        setTimeout(() => {
            dino.style.bottom = '10px';
            setTimeout(() => {
                isJumping = false;
            }, 100);
        }, 1000);
    } else if (event.code === 'ArrowLeft' ) {
        dinoX -= 20;
        dino.style.left = `${dinoX}px`;
    } else if (event.code === 'ArrowRight') {
        dinoX += 20;
        dino.style.left = `${dinoX}px`;
    }
});
/*
    } else if (event.code === 'ArrowLeft' && dinoX > 30) {
    } else if (event.code === 'ArrowRight' && dinoX < (canvas.width-30)) {
*/

// Crear cocos cada 2.5 segundos
setInterval(createCoco, 2500);

// Crear cocos dorados cada 20 segundos
setInterval(createCocoGold, 20000);

// Crear bolas de fuego según la puntuación
setInterval(() => {
	if (score >= 100) {
		if (Math.random() > 0.4) {
			createFireball('ground');
		} else {
            createFireball('air');
		}
    }
}, 2000);

// Iniciar el bucle del juego
gameLoop();
