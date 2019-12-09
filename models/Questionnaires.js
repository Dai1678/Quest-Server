'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('questionnaire', {
        id: {
            type: Datatypes.STRING,
            primaryKey: true,
            isAlphanumeric: true,
        },
        result: {
            type: Datatypes.JSON,
            required: true,
            allowNull: false,
            defaultValue: '{}'
        },
    },
        {
            timestamps: true,
            indexes: [],
            collate: 'utf8mb4_bin',
            charset: 'utf8mb4',
            paranoid: true,
        })
};