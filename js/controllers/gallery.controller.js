'use strict';
// TODO: make it so that when the gallery is displayed the meme-editor isn't and vise versa.
function renderGallery() {
    const strHTML = getImgs().map(img =>
        `<img src="${img.url}" alt="Saved Image" onclick="onSelectImg('${img.id}')">`
    ).join('');
    document.querySelector('.imgs-container').innerHTML = strHTML;
}

function onSelectImg(imgId) {
    setImg(imgId);
    renderMemeEditor();
    renderMeme();
}

// Upload image from user device.

function onImgInput(ev) {
    loadImageFromInput(ev, (img) => {
        setUploadedImg(img);
        renderMeme();
    });
}