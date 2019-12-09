'use strict';

const express = require('express');
const router = express.Router();

const db = require('../../../models/index');
const services = require('../../../services');
const boom = require('@hapi/boom');

// GET List
router.get('/', async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const offset = Math.max((page - 1) * limit, 0);

    //query check
    let where = {};

    try {
        const result = await services.patient.list({ limit, offset, where });
        res.json(result);
    } catch (e) {
        console.log(e);
        next(boom.badImplementation('エラーが発生しました'));
    }
});

// POST Create
router.post('/', (req, res, next) => {
    try {
        const createPatient = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            firstNameReading: req.body.firstNameReading,
            lastNameReading: req.body.lastNameReading,
            gender: req.body.gender,
            ageRange: req.body.ageRange,
            questionnaires: []
        };
        db.patient.create(createPatient)
        .then(() => {
            console.log('user created in db');
            res.status(200).send(createPatient);
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
            const patientId = req.params.id;
            const patient = await services.patient.get(patientId);
            if (!patient) {
                return next(boom.notFound('ユーザーが見つかりませんでした'));
            } else {
                res.status(200).json(patient);
            }
        } else {
            return next(boom.badRequest('無効なアクセスパラメータです'));
        }
    } catch (e) {
        console.log(e);
        next(boom.badImplementation('エラーが発生しました'));
    }
})

// TODO PUT

// TODO DELETE

module.exports = router;
