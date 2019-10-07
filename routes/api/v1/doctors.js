'use strict';

const express = require('express');
const boom = require('@hapi/boom');
const router = express.Router();

const db = require('../../../models/index');
const services = require('../../../services');

// GET List
router.get('/', async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 100;
        const offset = Math.max((page - 1) * limit, 0);

        //query check
        const hospitalId = req.query.hospitalId || 1;
        let where = {};
        if (hospitalId) where.hospitalId = hospitalId;

        const result = await services.doctor.list({ limit, offset, where });
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        next(boom.badImplementation('エラーが発生しました'));
    }
});

// POST Create
router.post('/', (req, res, next) => {
    try {
        const createDoctor = {
            id: req.body.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            firstNameReading: req.body.firstNameReading,
            lastNameReading: req.body.lastNameReading,
            isAdmin: req.body.isAdmin,
            hospitalId: req.body.hospitalId
        }
        db.doctor.create(createDoctor)
        .then(() => {
            console.log('Created doctor in db');
            res.status(200).send(createDoctor);
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
            const doctorId = req.params.id;
            const doctor = await services.doctor.get(doctorId);
            if (!doctor) {
                return next(boom.notFound('ユーザーが見つかりませんでした'));
            } else {
                res.status(200).json(doctor);
            }
        } else {
            return next(boom.badRequest('無効なアクセスパラメータです'));
        }
    } catch (e) {
        console.log(e);
        next(boom.badImplementation('エラーが発生しました'));
    }
});

// TODO PUT

// TODO DELETE

module.exports = router;
