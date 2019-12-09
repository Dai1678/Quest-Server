'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('patient', {
        id: {
            type: Datatypes.STRING,
            primaryKey: true,
            isAlphanumeric: true,
        },
        firstName: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
            defaultValue: 'ユーザー',
        },
        lastName: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
            defaultValue: '',
        },
        firstNameReading: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
            defaultValue: '',
        },
        lastNameReading: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
            defaultValue: '',
        },
        gender: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
            defaultValue: '',
        },
        ageRange: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
            defaultValue: '',
        }
    },
        {
            timestamps: true,
            indexes: [],
            collate: 'utf8mb4_bin',
            charset: 'utf8mb4',
            paranoid: true,
        })
};
