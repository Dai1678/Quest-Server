'use strict';

const express = require('express');
const router = express.Router();

const services = require('../../../services');
const db = require('../../../models/index');
const passport = require('passport');

// GET list
router.get('/', async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(401).send({
                message: info.message
            });
        } else {
            try {
                const page = Number(req.query.page) || 1;
                const limit = Number(req.query.limit) || 100;
                const offset = Math.max((page - 1) * limit, 0);
                const where = {};

                if (req.query.patientId) {
                    where.patientId = req.query.patientId;
                }

                const result = await services.questionnaire.list({ limit, offset, where });
                res.json(result);
            } catch (e) {
                console.log(e);
                next(e);
            }
        }
    })(req, res, next);
});

// CREATE POST
router.post('/', async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(401).send({
                message: info.message
            });
        } else {
            try {
                db.questionnaire.create({
                    id: req.body.id,
                    result: req.body.result,
                    responsibleDoctorId: req.body.responsibleDoctorId,
                    patientId: req.body.patientId,
                }).then(() => {
                    console.log('Created questionnaire in db');
                    res.status(200).send({ message: 'questionnaire created' });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({ message: err });
                });
            } catch (e) {
                console.log(e);
                next(e);
            }
        }
    })(req, res, next);
});

// GET by id
router.get('/:id', async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(401).send({
                message: info.message
            });
        } else {
            try {
                if (req.params.id) {
                    const result = await services.questionnaire.get(req.params.id);
                    res.json(result);
                } else {
                    return next(`Invalid parameter. ${req.body.patientId}`);
                }
            } catch (e) {
                console.log(e);
                next(e);
            }
        }
    })(req, res, next);
});

//TODO PUT

//TODO DELETE

module.exports = router;
