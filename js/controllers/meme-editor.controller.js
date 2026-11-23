'use strict';

// TODO: check after done if there are redundent functions and delete them.

// Globals and Initialization

const gCanvasImg = new Image();
const CANVAS_SIZE = 400;

let gElCanvas;
let gCtx;
let gStartDragPos;

function initCanvas() {
    gElCanvas = document.querySelector('canvas');
    gCtx = gElCanvas.getContext('2d');
}

function initMeme(imgId, uploadedImg) {
    createMeme(imgId, uploadedImg);
    renderMemeEditor();
    resizeCanvas();
}

// Resizing & Rendering

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.clientWidth;
    renderMeme();
}

function renderMeme() {
    if (getMeme() && getImg()) {
        gCanvasImg.src = getImg().url;
        gCanvasImg.onload = () => {
            coverCanvasWithImg(gCanvasImg);
            getMeme().lines.forEach((line, idx) => drawLineText(line, idx));
            setPosLineEditorPanel();
        };
    }
}

function renderMemeEditor() {
    const selectedLine = getSelectedLine();
    const elMemeEditor = document.querySelector('.meme-editor');
    const elBtn = elMemeEditor.querySelector('.btn.delete-line');
    showElement('.meme-editor');

    if (!selectedLine) {
        elBtn.disabled = true;
    } else {
        elBtn.disabled = false;
        const { text, size, color } = selectedLine;
        elMemeEditor.querySelector('input.line-text').value = text;
        elMemeEditor.querySelector('input.line-font-size').value = size;
        elMemeEditor.querySelector('input.line-color').value = color;
    }
}

function coverCanvasWithImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width;
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

// Line manipulation events.

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

// Touch & Click events (Also Line manipulation).

function onDown(ev) {
    const pos = getEvPos(ev);
    const selectedLine = getSelectedLineByPos(pos);

    if (!selectedLine) {
        unselectLine();
        closeLineEditorPanel();
        document.body.style.cursor = 'default';
    } else {
        selectLine(selectedLine);
        setIsLineDragging(true);
        gStartDragPos = pos;
        document.body.style.cursor = 'grabbing';
    }
    renderMeme();
    renderMemeEditor();
}

function onMove(ev) {
    const pos = getEvPos(ev);
    const isLineDragging = getIsLineDragging();

    if (isLineDragging) {
        moveSelectedLine(pos.x - gStartDragPos.x, pos.y - gStartDragPos.y);
        gStartDragPos = pos;
        renderMeme();
    } else {
        const selectedLine = getSelectedLineByPos(pos);
        if (selectedLine) document.body.style.cursor = 'grab';
        else document.body.style.cursor = 'default';
    }
}

function onUp() {
    setIsLineDragging(false);
    document.body.style.cursor = 'default';
}

function onDblClick() {
    const selectedLine = getSelectedLine();
    if (selectedLine) openLineEditorPanel();
}

function onScroll() {
    setPosLineEditorPanel();
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

// UI

function openLineEditorPanel() {
    showElement('.line-editor-panel');
    setPosLineEditorPanel();
}

function closeLineEditorPanel() {
    hideElement('.line-editor-panel');
}

function setPosLineEditorPanel() {
    const elPanel = document.querySelector('.line-editor-panel');
    const elMemeEditor = document.querySelector('.meme-editor');
    if (elMemeEditor.classList.contains('hide') || elPanel.classList.contains('hide')) return;

    const canvasRect = gElCanvas.getBoundingClientRect();
    const selectedLine = getSelectedLine();
    if (!selectedLine || !selectedLine.posTopLeft) return;

    const x = canvasRect.x; // const x = canvasRect.x + selectedLine.posTopLeft.x;
    const y = canvasRect.y + selectedLine.posTopLeft.y + selectedLine.height;

    elPanel.style.left = `${x}px`;
    elPanel.style.top = `${y}px`;
}

// Helper functions

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