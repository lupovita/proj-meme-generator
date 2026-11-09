'use strict';

let gElCanvas;
let gCtx;
const gCanvasImg = new Image();
const CANVAS_SIZE = 400;

function initCanvas() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
    resizeCanvas();
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.clientWidth;
    renderMeme();
}

function renderMeme() {
    gCanvasImg.src = getMemeImg().url;
    gCanvasImg.onload = () => {
        coverCanvasWithImg(gCanvasImg);
        const { txt, size, color } = getMemeSelectedLine();
        drawText(gElCanvas.width / 2, 50, txt, size, color);
    };
}

function coverCanvasWithImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function drawText(x, y, text, size, color) {
    // gCtx.lineWidth = 1.5;
    // gCtx.strokeStyle = 'brown';
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Arial`;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';

    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function onChangeText(text) {
    setLineText(text);
    renderMeme();
}