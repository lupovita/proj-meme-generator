'use strict';

const IMGS_PATH = 'img/meme-imgs/';
let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 };
let gImgs = [
    { id: '1', url: 'img/meme-imgs/003.jpg', keywords: ['funny', 'comic'] },
    { id: '2', url: 'img/meme-imgs/5.jpg', keywords: ['funny', 'comic', 'baby'] }
];

function getImgs() {
    return gImgs;
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId);
}