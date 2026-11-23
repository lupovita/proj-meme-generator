'use strict';

const SELECTORS = ['.gallery', '.meme-editor', '.saved-memes', '.about'];

function onNavClick(elNavLink, selector) {
    document.querySelectorAll('.main-nav a').forEach(elLink => elLink.classList.remove('active'));
    elNavLink.classList.add('active');
    SELECTORS.forEach(s => hideElement(s));
    showElement(selector);
}