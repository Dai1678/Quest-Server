'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('patient', {
        id: {
            type: Datatypes.UUID,
            primaryKey: true,
        },
        patient_name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false,
        },
        // questionnaire_id: {
        //     type: Datatypes.UUID,
        //     required: true,
        // },
        created_at: { type: Datatypes.DATE },
        updated_at: { type: Datatypes.DATE },
    },
        {
            underscored: true,
            paranoid: true,
        })
};
