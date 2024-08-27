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

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    letters.map((y_pos, index) => {
        const text = String.fromCharCode(3e4 + Math.random() * 33);
        const x_pos = index * 10;
        ctx.fillText(text, x_pos, y_pos);
        letters[index] = y_pos > 758 + Math.random() * 1e4 ? 0 : y_pos + 10;
    });
}

function createCoco() {
    const coco = document.createElement('div');
    coco.className = 'coco';
    coco.style.position = 'absolute';
    coco.style.top = '0px';
    coco.style.left = `${Math.random() * canvas.width}px`;
    coco.style.width = '30px';
    coco.style.height = '30px';
    coco.style.backgroundColor = 'brown'; // Color de fondo temporal para pruebas
    document.body.appendChild(coco);
    cocos.push(coco);
}

function createFireball(type) {
    if (fireballActive) return;

    const fireball = document.createElement('div');
    fireball.className = 'fireball';
    fireball.style.position = 'absolute';
    fireball.style.width = '30px';
    fireball.style.height = '30px';
    fireball.style.backgroundColor = 'red'; // Color de fondo temporal para pruebas

    if (type === 'ground') {
        fireball.style.bottom = '10px';
        fireball.style.left = `${Math.random() * canvas.width}px`;
    } else if (type === 'air') {
        fireball.style.top = '0px';
        fireball.style.left = `${Math.random() * canvas.width}px`;
    }

    document.body.appendChild(fireball);
    fireballs.push({ element: fireball, type: type });
    fireballActive = true;
}

function updateCocos() {
    cocos.forEach((coco, index) => {
        let cocoY = parseFloat(coco.style.top) || 0;
        cocoY += speed;
        coco.style.top = `${cocoY}px`;

        if (cocoY > canvas.height) {
            document.body.removeChild(coco);
            cocos.splice(index, 1);
            lives--;
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
            score += 10;
            if (score % 1000 === 0) {
                speed += 1;
            }
        }
    });
}

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
            document.body.removeChild(fireball.element);
            fireballs.splice(index, 1);
            lives--;
            if (lives <= 0) {
                alert('Game Over');
                location.reload();
            }
            fireballActive = false;
        }
    });
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`;
}

function gameLoop() {
    drawMatrix();
    updateCocos();
    updateFireballs();
    updateScore();
    updateLives();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        dino.style.transition = 'bottom 0.5s';
        dino.style.bottom = '100px';
        setTimeout(() => {
            dino.style.bottom = '10px';
            setTimeout(() => {
                isJumping = false;
            }, 500);
        }, 500);
    } else if (event.code === 'ArrowLeft') {
        dinoX -= 20;
        dino.style.left = `${dinoX}px`;
        if (!isJumping) {
            dino.style.transition = 'left 0.1s';
        }
    } else if (event.code === 'ArrowRight') {
        dinoX += 20;
        dino.style.left = `${dinoX}px`;
        if (!isJumping) {
            dino.style.transition = 'left 0.1s';
        }
    }
});

setInterval(createCoco, 2000);
setInterval(() => {
    if (score >= 10 && score < 2000) {
        if (Math.random() < 0.5) {
            createFireball('air');
		} else {
			createFireball('ground');
		}
	}	
}, 2000);

gameLoop();
