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
 * @param req.body.firstName @type string
 * @param req.body.lastName @type string
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
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: user.username,
                    hospitalId: req.body.hospitalId,
                };
                db.doctor.findOne({
                    where: {
                        username: data.username,
                    },
                }).then(user => {
                    user.update({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        hospitalId: data.hospitalId,
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
 * @param req.body.firstName @type string
 * @param req.body.lastName @type string
 * @param req.body.hospitalId @type string
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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                hospitalId: req.body.hospitalId,
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
