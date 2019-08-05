'use strict';

const express = require('express');
const router = express.Router();

const db = require('../../../models/index');
const passport = require('passport');
const jwtSecret = require('../../../config/jwtConfig');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info != undefined) {
            console.log(info.message);
            res.status(401).send({
                auth: false,
                token: null,
                user: null
            })
        } else {
            req.logIn(user, err => {
                db.doctor.findOne({
                    where: {
                        id: user.id,
                    },
                }).then(user => {
                    const token = jwt.sign({ id: user.id }, jwtSecret.secret);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        user: user
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(401).send({
                        auth: false,
                        token: null,
                        user: null
                    })
                });
            });
        }
    })(req, res, next);
});

// TODO logout

module.exports = router;
