'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('hospital', {
        id: {
            type: Datatypes.STRING,
            primaryKey: true,
        },
        name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
            defaultValue: '',
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
