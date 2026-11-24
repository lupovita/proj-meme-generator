'use strict';

const POS_INCREMENT = 30;

let gMeme;
let gNewLinePos;

function createMeme(imgId, imgUrl, width, height) {
    gNewLinePos = { x: width / 2, y: POS_INCREMENT * 2 };
    gMeme = {
        selectedImgId: imgId || '',
        uploadedImg: imgUrl ? { url: imgUrl } : '',
        lines: [],
        width,
        height
    };
    addLine();
}

function _createLine() {
    const line = {
        id: getRandomId(),
        text: 'Add Text Here',
        size: 30,
        color: '#FFFFFF',
        posCenter: { ...gNewLinePos }
    };
    _incrementLinePos();
    return line;
}

function _incrementLinePos() {
    gNewLinePos.x = (gNewLinePos.x + POS_INCREMENT) % gMeme.width;
    gNewLinePos.y = (gNewLinePos.y + POS_INCREMENT) % gMeme.height;
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

function getLineIdx(line) {
    return gMeme.lines.findIndex(l => l.id === line.id);
}

function getIsLineDragging() {
    return gMeme.isLineDragging;
}

function setLineText(text) {
    getSelectedLine().text = text;
}

function setLineSize(size) {
    getSelectedLine().size = size;
}

function setLineColor(color) {
    getSelectedLine().color = color;
}

function setIsLineDragging(isLineDragging) {
    gMeme.isLineDragging = isLineDragging;
}

function setMemeDimensions(width, height) {
    gMeme.width = width;
    gMeme.height = height;
}

function selectLine(line) {
    gMeme.selectedLineIdx = getLineIdx(line);
}

function unselectLine() {
    gMeme.selectedLineIdx = -1;
}

function addLine() {
    gMeme.lines.push(_createLine());
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function deleteLine(selectedLineIdx) {
    gMeme.lines.splice(selectedLineIdx, 1);
    if (!gMeme.lines.length) {
        gNewLinePos = { x: gMeme.width / 2, y: POS_INCREMENT * 2 };
        addLine();
    }
    if (selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function moveSelectedLine(dx, dy) {
    const selectedLine = getSelectedLine();
    selectedLine.posCenter.x += dx;
    selectedLine.posCenter.y += dy;
}