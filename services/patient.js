'use strict';

const _ = require('lodash');
const db = require('../models/index');

const get = async (patientId) => {
    const user = await db.patient.findOne({ 
        where: {
            id: patientId
        },
        include: [{
            model: db.questionnaire,
        }]
    });
    return user;
};
exports.get = get;

exports.list = async (params) => {
    const limit = Number(params.limit) || 100;
    const offset = Number(params.offset) || 0;
    const where = params.where || {};

    const res = await db.patient.findAndCountAll({
        offset, limit, where,
        order: [ [ 'updatedAt', 'desc' ] ],
        include: [{
            model: db.questionnaire,
            required: false
        }],
        distinct: true,
    });

    const total = res.count;
    const users = res.rows;

    return { total: total, list: users };
};
