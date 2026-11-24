'use strict';

const IMGS_PATH = 'img/meme-imgs/';

let gKeywordSearchCountMap;
let gImgs;

_createImgs();

function _createImgs() {
    gImgs = [
        _createImg('003.jpg', ['trump', 'politics', 'speech', 'pointing', 'serious']),
        _createImg('5.jpg', ['baby', 'dog', 'sleeping', 'cute', 'nap']),
        _createImg('004.jpg', ['dog', 'puppy', 'cute', 'love']),
        _createImg('005.jpg', ['baby', 'dog', 'sleeping', 'cute']),
        _createImg('006.jpg', ['cat', 'sleeping', 'computer', 'work']),
        _createImg('12.jpg', ['man', 'pointing', 'funny', 'reaction']),
        _createImg('19.jpg', ['man', 'surprised', 'reaction']),
        _createImg('2.jpg', ['woman', 'singing', 'mountains', 'happy']),
        _createImg('8.jpg', ['willy wonka', 'smile', 'sarcastic', 'reaction']),
        _createImg('9.jpg', ['baby', 'laughing', 'happy']),
        _createImg('Ancient-Aliens.jpg', ['aliens', 'conspiracy', 'history', 'reaction']),
        _createImg('One-Does-Not-Simply.jpg',
            ['lord of the rings', 'boromir', 'difficulty', 'reaction']),
        _createImg('Oprah-You-Get-A.jpg', ['oprah', 'excited', 'giving', 'reaction']),
        _createImg('X-Everywhere.jpg', ['toy story', 'buzz lightyear', 'everywhere', 'reaction']),
        _createImg('drevil.jpg', ['austin powers', 'dr evil', 'villain', 'reaction']),
        _createImg('img11.jpg', ['obama', 'laughing', 'politics', 'reaction']),
        _createImg('img12.jpg', ['basketball', 'sports', 'kiss', 'funny']),
        _createImg('img2.jpg', ['kids', 'dancing', 'celebration', 'funny']),
        _createImg('img4.jpg', ['trump', 'politics', 'angry', 'reaction']),
        _createImg('img5.jpg', ['baby', 'surprised', 'reaction']),
        _createImg('img6.jpg', ['dog', 'lying down', 'funny', 'reaction']),
        _createImg('leo.jpg', ['leonardo dicaprio', 'cheers', 'party', 'celebration']),
        _createImg('meme1.jpg', ['matrix', 'morpheus', 'serious', 'reaction']),
        _createImg('patrick.jpg', ['patrick stewart', 'star trek', 'smile', 'reaction']),
        _createImg('putin.jpg', ['putin', 'politics', 'speech', 'reaction'])
    ];
    _initKeywordSearchCountMap();
}

function _createImg(imgName, keywords) {
    return { id: getRandomId(), url: IMGS_PATH + imgName, keywords };
}

function _initKeywordSearchCountMap() {
    gKeywordSearchCountMap = gImgs.reduce((acc, img) => {
        img.keywords.forEach(k => !acc[k] ? acc[k] = 1 : ++acc[k]);
        return acc;
    }, {});
}

function getImgs() {
    return gImgs;
}

function getImgById(imgId) {
    return gImgs.find(img => img.id === imgId);
}