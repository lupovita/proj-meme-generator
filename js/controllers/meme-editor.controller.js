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
    if (getMemeImg()) {
        gCanvasImg.src = getMemeImg().url;
        gCanvasImg.onload = () => {
            coverCanvasWithImg(gCanvasImg);
            const { txt, size, color } = getMemeSelectedLine();
            drawText(gElCanvas.width / 2, 50, txt, size, color);
        };
    }
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

function onDownloadMeme(elLink) {
    elLink.href = gElCanvas.toDataURL();
}

// Upload to cloud.

function onUploadMeme(ev) {
    ev.preventDefault();
    const canvasData = gElCanvas.toDataURL('image/jpeg');

    // After a succesful upload, allow the user to share on Facebook (PDF page 5-6)
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl);

        document.querySelector('.share-container').innerHTML = `
        <a href="${uploadedImgUrl}" target="_blank">Uploaded picture</a>
        <p>Image url: ${uploadedImgUrl}</p>
        <button class="btn btn-primary btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
           Share on Facebook  
        </button>`;
    }

    uploadImg(canvasData, onSuccess);
}

function onClearCanvas() {
    // gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    // ~ Changing the size of the canvas clears it automatically. ~
    gElCanvas.height = CANVAS_SIZE;
    gCanvasImg.removeAttribute('src');
}

// Setters Getters for the Canvas.

function getCanvas() {
    return gElCanvas;
}

function getCtx() {
    return gCtx;
}

function getCanvasImg() {
    return gCanvasImg;
}