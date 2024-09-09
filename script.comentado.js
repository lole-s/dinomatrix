// Obtiene el elemento canvas del DOM
const canvas = document.getElementById('matrix');
// Obtiene el contexto 2D del canvas
const ctx = canvas.getContext('2d');
// Ajusta el ancho del canvas al ancho de la ventana
canvas.width = window.innerWidth;
// Ajusta la altura del canvas a la altura de la ventana
canvas.height = window.innerHeight;

// Crea un array de letras para el efecto de la matriz
const letters = Array(256).join(1).split('');
// Obtiene el elemento del dinosaurio del DOM
const dino = document.getElementById('dino');
// Obtiene el elemento de la puntuación del DOM
const scoreDisplay = document.getElementById('score');
// Obtiene el elemento de las vidas del DOM
const livesDisplay = document.getElementById('lives');

// Variables de estado del juego
let isJumping = false; // Indica si el dinosaurio está saltando
let dinoX = canvas.width / 2; // Posición horizontal del dinosaurio
let score = 0; // Puntuación inicial
let speed = 2; // Velocidad inicial del juego
let lives = 3; // Número inicial de vidas

// Arrays para almacenar cocos y bolas de fuego
const cocos = [];
const fireballs = [];
let fireballActive = false; // Indica si hay una bola de fuego activa

// Sonidos del juego
const collectSound = new Audio('./music/collect.mp3'); // Sonido al recolectar un coco
const loseLifeSound = new Audio('./music/lose_life.wav'); // Sonido al perder una vida
const gainLifeSound = new Audio('./gain_life.wav'); // Sonido para ganar una vida
const backgroundMusic = new Audio('./music/background_music.wav'); // Música de fondo
backgroundMusic.loop = true; // La música de fondo se repite en bucle
backgroundMusic.play(); // Reproduce la música de fondo

/**
 * Dibuja el efecto de la matriz en el fondo.
 */
function drawMatrix() {
    ctx.fillStyle = 'rgba(100, 0, 50, 0.05)'; // Color de fondo con transparencia
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Dibuja un rectángulo que cubre todo el canvas
    ctx.fillStyle = '#0FF'; // Color azul para las letras
    letters.map((y_pos, index) => {
        const text = ['*', '!', '.', '-'][Math.floor(Math.random() * 4)]; // Selecciona un carácter aleatorio
        const x_pos = index * 10; // Calcula la posición horizontal
        ctx.fillText(text, x_pos, y_pos); // Dibuja el carácter en la posición calculada
        letters[index] = y_pos > 758 + Math.random() * 1e4 ? 0 : y_pos + 10; // Actualiza la posición vertical
    });
}

/**
 * Crea un nuevo coco que cae desde la parte superior de la pantalla.
 */
function createCoco() {
    const coco = document.createElement('div'); // Crea un nuevo elemento div
    coco.className = 'coco'; // Asigna la clase 'coco' al div
    coco.style.position = 'absolute'; // Posiciona el div de forma absoluta
    coco.style.top = '0px'; // Posición inicial en la parte superior
    coco.style.left = `${(Math.random() * canvas.width) - 30}px`; // Posición horizontal aleatoria
    coco.style.width = '30px'; // Ancho del coco
    coco.style.height = '30px'; // Altura del coco
    coco.style.backgroundImage = 'url("./img/coco.png")'; // Imagen de fondo del coco
    coco.style.backgroundSize = 'contain'; // Ajusta la imagen al tamaño del div
    coco.style.backgroundRepeat = 'no-repeat'; // No repite la imagen
    document.body.appendChild(coco); // Añade el coco al DOM
    cocos.push(coco); // Añade el coco al array de cocos
}

/**
 * Crea un nuevo coco dorado que cae desde la parte superior de la pantalla.
 */
function createCocoGold() {
    const cocoGold = document.createElement('div'); // Crea un nuevo elemento div
    cocoGold.className = 'coco_gold'; // Asigna la clase 'coco_gold' al div
    cocoGold.style.position = 'absolute'; // Posiciona el div de forma absoluta
    cocoGold.style.top = '0px'; // Posición inicial en la parte superior
    cocoGold.style.left = `${(Math.random() * canvas.width) - 30}px`; // Posición horizontal aleatoria
    cocoGold.style.width = '60px'; // Ancho del coco dorado
    cocoGold.style.height = '60px'; // Altura del coco dorado
    cocoGold.style.backgroundImage = 'url("./img/coco_gold.png")'; // Imagen de fondo del coco dorado
    cocoGold.style.backgroundSize = 'contain'; // Ajusta la imagen al tamaño del div
    cocoGold.style.backgroundRepeat = 'no-repeat'; // No repite la imagen
    document.body.appendChild(cocoGold); // Añade el coco dorado al DOM
    cocos.push(cocoGold); // Añade el coco dorado al array de cocos
}

/**
 * Crea una nueva bola de fuego que puede ser terrestre o aérea.
 * @param {string} type - El tipo de bola de fuego ('ground' o 'air').
 */
function createFireball(type) {
    if (fireballActive) return; // Si ya hay una bola de fuego activa, no hace nada

    const fireball = document.createElement('div'); // Crea un nuevo elemento div
    fireball.className = 'fireball'; // Asigna la clase 'fireball' al div
    fireball.style.position = 'absolute'; // Posiciona el div de forma absoluta
    fireball.style.width = '40px'; // Ancho de la bola de fuego
    fireball.style.height = '40px'; // Altura de la bola de fuego

    if (type === 'ground') {
        fireball.style.backgroundImage = 'url("./img/fireball_ground.png")'; // Imagen de fondo para la bola de fuego terrestre
        fireball.style.bottom = '10px'; // Posición vertical cerca del suelo
        fireball.style.left = `${canvas.width + 40}px`; // Posición inicial fuera de la pantalla a la derecha
    } else if (type === 'air') {
        fireball.style.backgroundImage = 'url("./img/fireball_air.png")'; // Imagen de fondo para la bola de fuego aérea
        fireball.style.top = '0px'; // Posición inicial en la parte superior
        fireball.style.left = `${Math.random() * canvas.width}px`; // Posición horizontal aleatoria
    }

    fireball.style.backgroundSize = 'contain'; // Ajusta la imagen al tamaño del div
    fireball.style.backgroundRepeat = 'no-repeat'; // No repite la imagen
    document.body.appendChild(fireball); // Añade la bola de fuego al DOM
    fireballs.push({ element: fireball, type: type }); // Añade la bola de fuego al array de bolas de fuego
    fireballActive = true; // Marca que hay una bola de fuego activa
}

/**
 * Actualiza la posición de los cocos y verifica colisiones con el Dino.
 */
function updateCocos() {
    cocos.forEach((coco, index) => {
        let cocoY = parseFloat(coco.style.top) || 0; // Obtiene la posición vertical del coco
        cocoY += speed; // Aumenta la posición vertical según la velocidad
        coco.style.top = `${cocoY}px`; // Actualiza la posición del coco

        if (cocoY > canvas.height) { // Si el coco sale de la pantalla
            document.body.removeChild(coco); // Elimina el coco del DOM
            cocos.splice(index, 1); // Elimina el coco del array
            lives--; // Reduce el número de vidas
            loseLifeSound.play(); // Reproduce el sonido de perder una vida
            if (lives <= 0) { // Si no quedan vidas
                alert('Game Over'); // Muestra un mensaje de fin del juego
                location.reload(); // Recarga la página para reiniciar el juego
            }
        }

        // Verifica colisiones entre el Dino y el coco
        const dinoRect = dino.getBoundingClientRect();
        const cocoRect = coco.getBoundingClientRect();
        if (
            dinoRect.left < cocoRect.left + cocoRect.width &&
            dinoRect.left + dinoRect.width > cocoRect.left &&
            dinoRect.top < cocoRect.top + cocoRect.height &&
            dinoRect.height + dinoRect.top > cocoRect.top
        ) {
            document.body.removeChild(coco); // Elimina el coco del DOM
            cocos.splice(index, 1); // Elimina el coco del array
            if (coco.className === 'coco_gold') {
                lives++; // Aumenta el número de vidas si es un coco dorado
                gainLifeSound.play(); // Reproduce el sonido de ganar una vida
            } else {
                score += 10; // Aumenta la puntuación si es un coco normal
                collectSound.play(); // Reproduce el sonido de recolectar un coco
                if (score % 1000 === 0) {
                    speed += 1; // Aumenta la velocidad del juego cada 1000 puntos
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
            let fireballX = parseFloat(fireball.element.style.left) || 0; // Obtiene la posición horizontal de la bola de fuego
            fireballX -= speed; // Reduce la posición horizontal según la velocidad
            fireball.element.style.left = `${fireballX}px`; // Actualiza la posición de la bola de fuego

            if (fireballX < 0) { // Si la bola de fuego sale de la pantalla
                document.body.removeChild(fireball.element); // Elimina la bola de fuego del DOM
                fireballs.splice(index, 1); // Elimina la bola de fuego del array
                fireballActive = false; // Marca que no hay una bola de fuego activa
            }
        } else if (fireball.type === 'air') {
            let fireballY = parseFloat(fireball.element.style.top) || 0; // Obtiene la posición vertical de la bola de fuego
            fireballY += speed; // Aumenta la posición vertical según la velocidad
            fireball.element.style.top = `${fireballY}px`; // Actualiza la posición de la bola de fuego

            if (fireballY > canvas.height) { // Si la bola de fuego sale de la pantalla
                document.body.removeChild(fireball.element); // Elimina la bola de fuego del DOM
                fireballs.splice(index, 1); // Elimina la bola de fuego del array
                fireballActive = false; // Marca que no hay una bola de fuego activa
            }
        }

        // Verifica colisiones entre el Dino y la bola de fuego
        const dinoRect = dino.getBoundingClientRect();
        const fireballRect = fireball.element.getBoundingClientRect();
        if (
            dinoRect.left < fireballRect.left + fireballRect.width &&
            dinoRect.left + dinoRect.width > fireballRect.left &&
            dinoRect.top < fireballRect.top + fireballRect.height &&
            dinoRect.height + dinoRect.top > fireballRect.top
        ) {
            if (fireball.type === 'air' || (fireball.type === 'ground' && dinoRect.bottom > fireballRect.top)) {
                document.body.removeChild(fireball.element); // Elimina la bola de fuego del DOM
                fireballs.splice(index, 1); // Elimina la bola de fuego del array
                lives--; // Reduce el número de vidas
                loseLifeSound.play(); // Reproduce el sonido de perder una vida
                if (lives <= 0) { // Si no quedan vidas
                    alert('Game Over'); // Muestra un mensaje de fin del juego
                    location.reload(); // Recarga la página para reiniciar el juego
                }
                fireballActive = false; // Marca que no hay una bola de fuego activa
            }
        }
    });
}

/**
 * Actualiza la puntuación en pantalla.
 */
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`; // Actualiza el texto del elemento de puntuación
}

/**
 * Actualiza las vidas en pantalla.
 */
function updateLives() {
    livesDisplay.textContent = `Lives: ${lives}`; // Actualiza el texto del elemento de vidas
}

/**
 * Bucle principal del juego.
 */
function gameLoop() {
    drawMatrix(); // Dibuja el efecto de la matriz
    updateCocos(); // Actualiza la posición de los cocos
    updateFireballs(); // Actualiza la posición de las bolas de fuego
    updateScore(); // Actualiza la puntuación en pantalla
    updateLives(); // Actualiza las vidas en pantalla
    requestAnimationFrame(gameLoop); // Solicita la siguiente animación del bucle del juego
}

/**
 * Maneja los eventos de teclado para el movimiento y salto del Dino.
 */
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) { // Si se presiona la barra espaciadora y el Dino no está saltando
        isJumping = true; // Marca que el Dino está saltando
        dino.style.bottom = '100px'; // Mueve el Dino hacia arriba
        setTimeout(() => {
            dino.style.bottom = '10px'; // Mueve el Dino hacia abajo después de un tiempo
            setTimeout(() => {
                isJumping = false; // Marca que el Dino ha terminado de saltar
            }, 100);
        }, 1000);
    } else if (event.code === 'ArrowLeft') { // Si se presiona la flecha izquierda
        dinoX -= 20; // Mueve el Dino hacia la izquierda
        dino.style.left = `${dinoX}px`; // Actualiza la posición del Dino
    } else if (event.code === 'ArrowRight') { // Si se presiona la flecha derecha
        dinoX += 20; // Mueve el Dino hacia la derecha
        dino.style.left = `${dinoX}px`; // Actualiza la posición del Dino
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
            createFireball('ground'); // Crea una bola de fuego terrestre
        } else {
            createFireball('air'); // Crea una bola de fuego aérea
        }
    }
}, 2000);

// Iniciar el bucle del juego
gameLoop(); // Comienza el bucle principal del juego
