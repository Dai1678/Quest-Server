'use strict';

const express = require('express');
const router = express.Router();

const db = require('../../../models/index');
const services = require('../../../services');
const passport = require('passport');

// GET List
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
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 100;
            const offset = Math.max((page - 1) * limit, 0);

            //query check
            const hospitalId = req.query.hospitalId;
            let where = {};
            if (hospitalId) where.hospitalId = hospitalId;

            try {
                const result = await services.patient.list({ limit, offset, where });
                res.json(result);
            } catch (e) {
                next(e);
            }
        }
    })(req, res, next);
});

// POST Create
router.post('/', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(401).send({ message: info.message });
        } else {
            try {
                db.patient.create({
                    id: req.body.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    hospitalId: req.body.hospitalId,
                }).then(() => {
                    console.log('user created in db');
                    res.status(200).send({ message: 'patient user created' });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({ message: `${err}`});
                });
            } catch (e) {
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
                    const patientId = req.params.id;
                    const patient = await services.patient.get(patientId);
                    res.status(200).json(patient);
                }
            } catch (e) {
                next(e);
            }
        }
    })(req, res, next);
})

// TODO PUT

// TODO DELETE

module.exports = router;
