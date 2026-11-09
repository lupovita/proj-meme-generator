'use strict';

let gMeme = {
    selectedImgId: '1',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            color: 'red'
        }
    ]
};

function getMeme() {
    return gMeme;
}

function getMemeImg() {
    return getImgById(gMeme.selectedImgId);
}

function getMemeSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setLineText(text) {
    getMemeSelectedLine().txt = text;
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
}