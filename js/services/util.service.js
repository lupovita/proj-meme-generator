'use strict';

// Random generators

function getRandomId(idLength) {
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