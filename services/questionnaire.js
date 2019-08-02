'use strict';

const _ = require('lodash');
const db = require('../models/index');

const get = async (questionnaireId) => {
    const result = await db.questionnaire.findOne({
        where: {
            id: questionnaireId,
        }
    })
    return result;
};
exports.get = get;

exports.list = async (params) => {
    const limit = Number(params.limit) || 100;
    const offset = Number(params.offset) || 0;
    const where = params.where || {};

    const res = await db.questionnaire.findAndCountAll({
        offset, limit, where,
        order: [['updatedAt', 'desc']]
    });

    const total = res.count;
    const results = res.rows;

    return { total: total, list: results };
};
