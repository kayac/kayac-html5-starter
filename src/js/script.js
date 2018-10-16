const SPEED = 0.1;

const el = document.querySelector('.sample-icon');

let mousePos;
let logoPos = [0, 0];

function loop () {
    if (mousePos) {
        logoPos = [
            logoPos[0] + (mousePos[0] - logoPos[0]) * SPEED,
            logoPos[1] + (mousePos[1] - logoPos[1]) * SPEED,
        ];
        el.style.left = `${logoPos[0]}px`;
        el.style.top = `${logoPos[1]}px`;
    }
    requestAnimationFrame(loop);
}

window.addEventListener('mousemove', (e) => {
    mousePos = [e.pageX, e.pageY];
});

requestAnimationFrame(loop);
