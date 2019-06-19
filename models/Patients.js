'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('patient', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
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
        // questionnaire_id: {
        //     type: Datatypes.UUID,
        //     required: true,
        // },
    },
        {
            underscored: true,
            paranoid: true,
        })
};
