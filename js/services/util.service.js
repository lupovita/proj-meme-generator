'use strict';

const ID_LENGTH = 6;

// Random generators

function getRandomId(idLength = ID_LENGTH) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for (let i = 0; i < idLength; i++) {
        id += chars.charAt(getRandomInt(0, chars.length));
    }
    return id;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function showElement(selector) {
    document.querySelector(selector).classList.remove('hide');
}

function hideElement(selector) {
    document.querySelector(selector).classList.add('hide');
}