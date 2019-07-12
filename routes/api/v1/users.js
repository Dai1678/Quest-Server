'use strict';

const express = require('express');
const router = express.Router();

const services = require('../../../services');
const db = require('../../../models/index');
const passport = require('passport');
const jwtSecret = require('../../../config/jwtConfig');
const jwt = require('jsonwebtoken');

/**
 * @param hospitalId @type string
 * @param page @type int
 * @param limit @type int
 * @returns result @type List<Patient>
 */

router.get('/patient/list', async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const offset = Math.max((page -1) * limit, 0);

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
});

/**
 * @param username @type string
 * @returns patient @type Patient
 */

router.get('/patient', async (req, res, next) => {
    try {
        if (req.query.username) {
            const username = req.query.username;
            const patient = await services.patient.get(username);
            if (!patient) {
                res.status(404).send(`Not found user. Input username is ${username}`);
            }
            res.status(200).json(patient);
        }
    } catch (e) {
        next(e);
    }
})

module.exports = router;
