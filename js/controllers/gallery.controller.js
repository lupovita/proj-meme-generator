'use strict';

function renderGallery() {
    const strHTML = getImgs().map(img =>
        `<img src="${img.url}" alt="Saved Image" onclick="onSelectImg('${img.id}')">`
    ).join('');
    document.querySelector('.imgs-container').innerHTML = strHTML;
}

function onSelectImg(imgId) {
    setImg(imgId);
    renderMeme();
}