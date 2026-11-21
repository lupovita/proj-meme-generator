'use strict';

const gCanvasImg = new Image();
const CANVAS_SIZE = 400;

let gElCanvas;
let gCtx;
let gStartDragPos;

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
    if (getImg()) {
        gCanvasImg.src = getImg().url;
        gCanvasImg.onload = () => {
            coverCanvasWithImg(gCanvasImg);
            getMeme().lines.forEach((line, idx) => drawLineText(line, idx));
        };
    }
}

function renderMemeEditor() {
    const { text, size, color } = getSelectedLine();
    document.querySelector('input.line-text').value = text;
    document.querySelector('input.line-font-size').value = size;
    document.querySelector('input.line-color').value = color;

}

function coverCanvasWithImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

// Set and draw line events

function drawLineText(line, lineIdx) {
    // gCtx.lineWidth = 1.5;
    // gCtx.strokeStyle = 'brown';
    const { text, size, color, posCenter } = line;
    gCtx.fillStyle = color;
    gCtx.font = `${size}px Arial`;
    gCtx.textAlign = 'center';
    gCtx.textBaseline = 'middle';
    const { x, y } = posCenter;
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);

    calculateLineFrameMetrics(line);

    if (getMeme().selectedLineIdx === lineIdx) drawLineFrame(line);
}

function calculateLineFrameMetrics(line) {
    const { text, size, posCenter } = line;
    const metrics = gCtx.measureText(text);
    const padding = size / 3;
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const textWidth = metrics.width;
    line.posTopLeft = {
        x: posCenter.x - textWidth / 2 - padding,
        y: posCenter.y - metrics.actualBoundingBoxAscent - padding
    };
    line.width = textWidth + padding * 2;
    line.height = textHeight + padding * 2;
}

function drawLineFrame({ posTopLeft, width, height }) {
    gCtx.save();
    gCtx.strokeStyle = 'red';
    gCtx.lineWidth = 2;
    gCtx.strokeRect(posTopLeft.x, posTopLeft.y, width, height);
    gCtx.restore();
}

function onSetLineText(text) {
    setLineText(text);
    renderMeme();
}

function onSetLineSize(size) {
    setLineSize(size);
    renderMeme();
}

function onSetLineColor(color) {
    setLineColor(color);
    renderMeme();
}

function onSwitchLine() {
    switchLine();
    renderMeme();
    renderMemeEditor();
}

function onAddLine() {
    addLine();
    renderMeme();
    renderMemeEditor();
}

function onDeleteLine() {
    deleteLine(getMeme().selectedLineIdx);
    renderMeme();
    renderMemeEditor();
}

// Touch and click events for the canvas.

function onDown(ev) {
    const pos = getEvPos(ev);
    const selectedLine = getSelectedLineByPos(pos);
    
    if (!selectedLine) return;
    setIsLineDragging(selectedLine, true);
    selectLine(selectedLine);
    renderMeme();
    renderMemeEditor();
    //Save the pos we start from
    gStartDragPos = pos;
    document.body.style.cursor = 'move';
}

// TODO: finish the dragging action, check if it works on mobile as well.
// TODO: check how to be able to write(or even make the whole font-editor-panel hover over the line line in word) on top of the canvas and not from the input textbox, also I want to add text cursor when the user double clicks the text on the canvas, and then he'll be able to edit. if the text cursor will flicker that will be perfect.
// TODO: check after done if there are redundent functions and delete them.

function onMove(ev) {
    const pos = getEvPos(ev);
    // const { isDrawing } = getBrush();
    // setPos(pos);

    // if (isDrawing) draw();
    // else renderCanvas();
}

function onUp() {
    // setIsDrawing(false);
    // getCanvasImg().src = getCanvas().toDataURL();
}

function onCanvasLeave() {
    // const { isDrawing } = getBrush();
    // if (isDrawing) onUp();
    // setPos(null);
    // renderCanvas();
}

function getEvPos(ev) {
    const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend'];
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    };

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault();
        // Gets the first touch point
        ev = ev.changedTouches[0];
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        };
    }
    return pos;
}

// Upload to cloud and download events.

function onDownloadMeme(elLink) {
    elLink.href = gElCanvas.toDataURL();
}

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