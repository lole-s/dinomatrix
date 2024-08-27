const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(256).join(1).split('');

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

setInterval(drawMatrix, 50);

const dino = document.getElementById('dino');
let isJumping = false;

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
    }
});
