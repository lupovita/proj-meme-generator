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

// Storage

function saveToStorage(key, value) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
}

function loadFromStorage(key) {
    const json = localStorage.getItem(key);
    return JSON.parse(json);
}