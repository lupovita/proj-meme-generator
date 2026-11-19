'use strict';

let gMeme = {
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Add text here',
            size: 30,
            color: 'white'
        }
    ]
};

function getMeme() {
    return gMeme;
}

function getMemeImg() {
    if (gMeme.uploadedImg) return gMeme.uploadedImg;
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
    gMeme.uploadedImg = '';
}

function getUploadedImg() {
    return gMeme.uploadedImg;
}

function setUploadedImg(img) {
    gMeme.uploadedImg = { url: img.src };
    gMeme.selectedImgId = '';
}