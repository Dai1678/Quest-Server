'use strict';

const express = require('express');
const router = express.Router();
const uuid = require('node-uuid');

const db = require('../../../models/index');
const passport = require('passport');
const jwtSecret = require('../../../config/jwtConfig');
const jwt = require('jsonwebtoken');

/**
 * @param req.body.username @type string
 * @param req.body.password @type string
 * @returns
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                db.doctor.findOne({
                    where: {
                        username: user.username,
                    },
                }).then(user => {
                    const token = jwt.sign({ id: user.username }, jwtSecret.secret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        message: 'user found. logged in successfully',
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(200).send({
                        auth: false,
                        token: null,
                        message: 'login failed.'
                    })
                });
            });
        }
    })(req, res, next);
});

/**
 * @param req.body.first_name @type string
 * @param req.body.last_name @type string
 * @param req.body.username @type string
 */
router.post('/register/doctor', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                const data = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: user.username,
                    hospital_id: req.body.hospital_id,
                };
                db.doctor.findOne({
                    where: {
                        username: data.username,
                    },
                }).then(user => {
                    user.update({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        hospital_id: data.hospital_id,
                    })
                    .then(() => {
                        console.log('user created in db');
                        res.status(200).send({ message: 'doctor user created' });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(200).send({ message: 'failed to create doctor user' });
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(200).send({ message: 'failed to create doctor user' });
                });
            });
        }
    })(req, res, next);
});

/**
 * @param req.body.username @type string
 * @param req.body.first_name @type string
 * @param req.body.last_name @type string
 * @param req.body.hospital_id @type string
 */
router.post('/register/patient', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.send(info.message);
        } else {
            db.patient.create({
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                hospital_id: req.body.hospital_id,
            }).then(() => {
                console.log('user created in db');
                res.status(200).send({ message: 'patient user created' });
            }).catch(err => {
                console.log(err);
                res.status(200).send({ message: 'failed to create patient user' });
            });
        }
    })(req, res, next);
});

module.exports = router;
