const SPEED = 0.1;

const el = document.querySelector('.sample-icon');

let mousePos;
let logoPos = [window.innerWidth / 2, window.innerHeight / 2];
let logoRotate = 0;

function update() {
    if (mousePos) {
        logoPos = [
            logoPos[0] + (mousePos[0] - logoPos[0]) * SPEED,
            logoPos[1] + (mousePos[1] - logoPos[1]) * SPEED,
        ];
        logoRotate = 360 * Math.atan2(
            mousePos[1] - logoPos[1],
            mousePos[0] - logoPos[0],
        ) / (Math.PI * 2) + 90;
    }
}

function render() {
    el.style.transform = [
        `translate(${logoPos[0]}px, ${logoPos[1]}px)`,
        `rotate(${logoRotate}deg)`
    ].join(' ');
}

function loop () {
    update();
    render();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

window.addEventListener('mousemove', (e) => {
    mousePos = [e.pageX, e.pageY];
});
