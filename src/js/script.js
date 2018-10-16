const el = document.querySelector('.sample-icon');

let mousePos;

function loop () {
    if (mousePos) {
        el.style.left = `${mousePos[0]}px`;
        el.style.top = `${mousePos[1]}px`;
    }
    requestAnimationFrame(loop);
}

window.addEventListener('mousemove', (e) => {
    mousePos = [e.pageX, e.pageY];
});

requestAnimationFrame(loop);
