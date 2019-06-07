'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (app) => {
    // app.use(middlewares.sessionIssue);

    fs.readdirSync(__dirname).forEach((filename) => {
        if (path.extname(filename) === '.js' && filename !== 'index.js') {
            const jsname = path.basename(filename, '.js');
            console.log(`routing /api/v1/${jsname}`);
            app.use(`/api/v1/${jsname}`, [
                require(`./${filename}`),
            ]);
        }
    });
};
