'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('doctor', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
        },
        user_name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
        },
        password: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
        },
        first_name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
        },
        last_name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
        },
    },
        {
            underscored: true,
            paranoid: true,
        })
};