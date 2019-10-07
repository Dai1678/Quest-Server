'use strict';

const express = require('express');
const router = express.Router();

const services = require('../../../services');
const db = require('../../../models/index');
const boom = require('@hapi/boom');

// GET list
router.get('/', async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 100;
        const offset = Math.max((page - 1) * limit, 0);
        const where = {};

        if (req.query.patientId) {
            where.patientId = req.query.patientId;
        }

        const result = await services.questionnaire.list({ limit, offset, where });
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        next(boom.badImplementation('エラーが発生しました'));
    }
});

// CREATE POST
router.post('/', async (req, res, next) => {
    try {
        const createQuestionnaire = {
            id: req.body.id,
            result: req.body.result,
            responsibleDoctorId: req.body.responsibleDoctorId,
            patientId: req.body.patientId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        db.questionnaire.create(createQuestionnaire)
        .then(() => {
            console.log('Created questionnaire in db');
            res.status(200).send(createQuestionnaire);
        }).catch(err => {
            console.log(err);
            return next(boom.forbidden('作成に失敗しました もう一度お試しください'));
        });
    } catch (e) {
        console.log(e);
        next(boom.badImplementation('エラーが発生しました'));
    }
});

// GET by id
router.get('/:id', async (req, res, next) => {
    try {
        if (req.params.id) {
            const result = await services.questionnaire.get(req.params.id);
            if (!result) {
                return next(boom.notFound('データが見つかりませんでした'));
            } else {
                res.status(200).json(result);
            }
        } else {
            return next(boom.badRequest('無効なアクセスパラメータです'));
        }
    } catch (e) {
        console.log(e);
        next(boom.badImplementation('エラーが発生しました'));
    }
});

//TODO PUT

//TODO DELETE

module.exports = router;
