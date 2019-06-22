'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('patient', {
        username: {
            type: Datatypes.STRING,
            primaryKey: true,
            isAlphanumeric: true,
        },
        first_name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
        },
        last_name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
        },
        // questionnaire_id: {
        //     type: Datatypes.UUID,
        //     required: true,
        // },
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
