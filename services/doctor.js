'use strict';

const _ = require('lodash');
const db = require('../models/index');

const get = async (doctorId) => {
    const user = await db.doctor.findOne({
        where: {
            id: doctorId
        },
    });
    return user;
};
exports.get = get;

exports.list = async (params) => {
    const limit = Number(params.limit) || 100;
    const offset = Number(params.offset) || 0;
    const where = params.where || {};

    const res = await db.doctor.findAndCountAll({
        offset, limit, where,
        order: [['updatedAt', 'desc']],
    });

    const total = res.count;
    const users = res.rows;

    return { total: total, list: users };
};
