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
            try {
                if (user.isAdmin) {
                    const page = Number(req.query.page) || 1;
                    const limit = Number(req.query.limit) || 100;
                    const offset = Math.max((page - 1) * limit, 0);

                    //query check
                    const hospitalId = req.query.hospitalId;
                    let where = {};
                    if (hospitalId) where.hospitalId = hospitalId;

                    try {
                        const result = await services.doctor.list({ limit, offset, where });
                        res.status(200).json(result);
                    } catch (e) {
                        return next(e);
                    }
                } else {
                    res.status.send(403).send({ message: 'This account can not access' });
                }
            } catch (e) {
                next(e);
            }
        }
    })(req, res, next);
});

// POST Create
router.post('/', (req, res, next) => {
    passport.authenticate('create', { session: false }, (err, user, info) => {
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
                db.doctor.create({
                    id: req.body.id,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin,
                    hospitalId: req.body.hospitalId,
                }).then(() => {
                    console.log('Created doctor in db');
                    res.status(200).send({ message: 'doctor user created' });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({ message: `${err}` });
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
                if (user.isAdmin) {
                    if (req.params.id) {
                        const doctorId = req.params.id;
                        const doctor = await services.doctor.get(doctorId);
                        res.status(200).json(doctor);
                    }
                } else {
                    res.status.send(403).send({ message: 'This account can not access' });
                }
            } catch (e) {
                next(e);
            }
        }
    })(req, res, next);
});

// TODO PUT

// TODO DELETE

module.exports = router;