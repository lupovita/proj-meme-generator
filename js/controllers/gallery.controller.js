'use strict';
// TODO: make it so that when the gallery is displayed the meme-editor isn't and vise versa.
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

// Switching to Meme Editor Page

function goToMemeEditor(imgId, uploadedImgUrl) {
    hideElement('.gallery');
    document.querySelector('.main-nav .active').classList.remove('active');
    window.scrollTo(0, 0);
    initMeme(imgId, uploadedImgUrl);
}