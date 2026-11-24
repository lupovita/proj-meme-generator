'use strict';

function renderGallery() {
    const strHTML = getImgs().map(img =>
        `<img src="${img.url}" alt="Saved Image" onclick="onSelectImg('${img.id}')">`
    ).join('');
    document.querySelector('.imgs-container').innerHTML = strHTML;
}

function onSelectImg(imgId) {
    goToMemeEditor(imgId);
}

// Upload image from user device.

function onImgInput(ev) {
    loadImageFromInput(ev, (img) => goToMemeEditor(undefined, img.src));
}

// Switch to Meme Editor Section

function goToMemeEditor(imgId, uploadedImgUrl) {
    hideElement('.gallery');
    showElement('.meme-editor');
    document.querySelector('.main-nav .active').classList.remove('active');
    window.scrollTo(0, 0);
    initMeme(imgId, uploadedImgUrl);
}