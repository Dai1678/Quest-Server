require('dotenv').config();

const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const node_env = process.env.NODE_ENV;

const config = {
    local: {
        db: {
            username,
            password,
            database,
            host,
        }
    },
    develop: {},
    production: {
        db: {
            username,
            password,
            database,
            host
        }
    }
};

module.exports = config[node_env];
