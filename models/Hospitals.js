'use strict';

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('hospital', {
        id: {
            type: Datatypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        hospital_name: {
            type: Datatypes.STRING,
            isAlphanumeric: true,
            required: true,
            allowNull: false
        },
    },
    {
        underscored: true,
        paranoid: true,
    })
};
