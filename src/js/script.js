const SPEED = 0.1;

const el = document.querySelector('.sample-icon');

let mousePos;
let logoPos = [0, 0];
let logoRotate = 0;

function loop () {
    if (mousePos) {
        logoPos = [
            logoPos[0] + (mousePos[0] - logoPos[0]) * SPEED,
            logoPos[1] + (mousePos[1] - logoPos[1]) * SPEED,
        ];
        logoRotate = 360 * Math.atan2(
            mousePos[1] - logoPos[1],
            mousePos[0] - logoPos[0],
        ) / (Math.PI * 2) + 90;
        el.style.left = `${logoPos[0]}px`;
        el.style.top = `${logoPos[1]}px`;
        el.style.transform = `rotate(${logoRotate}deg)`;
    }
    requestAnimationFrame(loop);
}

window.addEventListener('mousemove', (e) => {
    mousePos = [e.pageX, e.pageY];
});

requestAnimationFrame(loop);
