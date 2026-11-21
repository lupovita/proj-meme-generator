'use strict';

const POS_INCREMENT = 30, CANVAS_WIDTH = 400, CANVAS_HEIGHT = 350;
const INITIAL_LINE_POS = { x: CANVAS_WIDTH / 2, y: 50 };
const ID_LENGTH = 6;

let gMeme;
let gNewLinePos;

_createMeme();

function _createMeme() {
    gNewLinePos = { ...INITIAL_LINE_POS };
    gMeme = {
        selectedLineIdx: 0,
        lines: [_createLine()]
    };
}

function _createLine() {
    const line = {
        id: getRandomId(ID_LENGTH),
        text: 'Add Text Here',
        size: 30,
        color: '#FFFFFF',
        posCenter: { ...gNewLinePos }
    };
    _incrementLinePos();
    return line;
}

function _incrementLinePos() {
    gNewLinePos.x = (gNewLinePos.x + POS_INCREMENT) % CANVAS_WIDTH;
    gNewLinePos.y = (gNewLinePos.y + POS_INCREMENT) % CANVAS_HEIGHT;
}

function getMeme() {
    return gMeme;
}

function getImg() {
    if (gMeme.uploadedImg) return gMeme.uploadedImg;
    return getImgById(gMeme.selectedImgId);
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getSelectedLineByPos(pos) {
    const selectedLines = gMeme.lines.filter(line =>
        pos.x >= line.posTopLeft.x && pos.x <= line.posTopLeft.x + line.width &&
        pos.y >= line.posTopLeft.y && pos.y <= line.posTopLeft.y + line.height
    );
    return selectedLines.toSorted((l1, l2) => l1.width - l2.width)[0];
}

// function getLineIdx(line) {
//     return gMeme.lines.findIndex(l => l.id === line.id);
// }

// function setSelectedLineIdx(selectedLineIdx) {
//     gMeme.selectedLineIdx = selectedLineIdx;
// }

function setLineText(text) {
    getSelectedLine().text = text;
}

function setLineSize(size) {
    getSelectedLine().size = size;
}

function setLineColor(color) {
    getSelectedLine().color = color;
}

function setIsLineDragging(line, isDragging) {
    line.isDragging = isDragging;
}

function switchLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length;
}

function selectLine(line) {
    gMeme.selectedLineIdx = gMeme.lines.findIndex(l => l.id === line.id);
}

function addLine() {
    gMeme.lines.push(_createLine());
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine(selectedLineIdx) {
    gMeme.lines.splice(selectedLineIdx, 1);
    if (!gMeme.lines.length) {
        gNewLinePos = { ...INITIAL_LINE_POS };
        addLine();
    }
    if (selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
    gMeme.uploadedImg = '';
}

function getUploadedImg() {
    return gMeme.uploadedImg;
}

function setUploadedImg(img) {
    gMeme.uploadedImg = { url: img.src };
    gMeme.selectedImgId = '';
}