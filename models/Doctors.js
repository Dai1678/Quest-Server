'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('doctor', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
        },
        doctor_name: {
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
        created_at: { type: Datatypes.DATE },
        updated_at: { type: Datatypes.DATE },
    },
        {
            underscored: true,
            paranoid: true,
        })
};