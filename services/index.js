'use strict';

const fs = require('fs');
const path = require('path');

fs.readdirSync(__dirname).forEach((filename) => {
    if (path.extname(filename) === '.js' && filename !== 'index.js') {
        const jsname = path.basename(filename, '.js');
        exports[jsname] = require(`./${filename}`);
    } else if (fs.statSync(path.join(__dirname, filename)).isDirectory()) {
        exports[filename] = require(`./${filename}`);
    }
});