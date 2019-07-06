'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('doctor', {
        username: {
            type: Datatypes.STRING,
            primaryKey: true,
            isAlphanumeric: true,
        },
        password: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
        },
        isAdmin: {
            type: Datatypes.BOOLEAN,
            required: true,
            allowNull: false,
            defaultValue: false,
        }
    },
        {
            timestamps: true,
            indexes: [],
            collate: 'utf8mb4_bin',
            charset: 'utf8mb4',
            underscored: true,
            paranoid: true,
        })
};