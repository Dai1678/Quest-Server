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
        }],
        order: [[db.questionnaire, 'updatedAt', 'desc']]
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
        order: [ 
            [ 'updatedAt', 'desc' ] ,
            [ db.questionnaire, 'updatedAt', 'desc' ]
        ],
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

exports.update = async (patientId, data) => {
    const old = await get(patientId);
    if (!old) {
        throw Error('invalid data:' + patientId, 400);
    }
    const update = _.assign(old, data);
    await dbUpsert(update);
    return update;
};

const dbUpsert = async (item) => {
    const transaction = await db.sequelize.transaction();

    try {
        const patient = {
            id: item.id,
            firstName: item.firstName || '',
            lastName: item.lastName || '',
            createdAt: item.createdAt || Date.now(),
            updatedAt: item.updatedAt || Date.now(),
            deletedAt: item.deletedAt || null,
            hospitalId: item.hospitalId
        };
        await db.patient.upsert(patient);

        await transaction.commit();
        return;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};
exports.dbUpsert = dbUpsert;
