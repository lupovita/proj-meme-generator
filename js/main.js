'use strict';

function onInit() {
    renderGallery();
    initCanvas();
}

function onResize() {
    resizeCanvas();
    renderMeme();
}

function onScroll() {
    setPosLineEditorPanel();
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
    const elBtn = document.querySelector('.btn-toggle-menu');
    elBtn.innerText = document.body.classList.contains('menu-open') ? 'X' : '☰';
}