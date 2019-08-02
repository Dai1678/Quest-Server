'use strict';

const express = require('express');
const router = express.Router();

const db = require('../../../models/index');
const passport = require('passport');
const jwtSecret = require('../../../config/jwtConfig');
const jwt = require('jsonwebtoken');

/**
 * @param req.body.username @type string
 * @param req.body.password @type string
 * @returns auth @type boolean
 * @returns token @type string
 * @returns user @type Doctor
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(200).send({
                auth: false,
                token: null,
                message: info.message
            });
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
                        user: user
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(200).send({
                        auth: false,
                        token: null,
                        user: null
                    })
                });
            });
        }
    })(req, res, next);
});

/**
 * @param req.body.username @type string
 * @param req.body.password @type string
 * @param req.body.isAdmin @type boolean
 * @param req.body.hospitalId @type string
 */
router.post('/register/doctor', (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(500).send({
                message: info.message
            });
        } else {
            if (user.isAdmin) {
                db.doctor.create({
                    username: req.body.username,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin,
                    hospitalId: req.body.hospitalId,
                }).then(() => {
                    console.log('Created doctor in db');
                    res.status(200).send({ message: 'doctor user created' });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({ message: 'failed to create doctor user' });
                });
            } else {
                res.status.send(403).send({ message: 'This account can not access'});
            }
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
            res.status(500).send({ message: info.message });
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
                res.status(500).send({ message: 'failed to create patient user' });
            });
        }
    })(req, res, next);
});

module.exports = router;
