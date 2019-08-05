'use strict';

const jwtSecret = require('../config/jwtConfig');

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    db = require('../models/index'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'create',
    new localStrategy(
        {
            usernameField: 'id',
            passwordField: 'password',
            session: false,
        },
        (id, password, done) => {
            try {
                db.doctor.findOne({
                    where: {
                        id: id,
                    },
                }).then(user => {
                    if (user != null) {
                        console.log('user already created');
                        return done(null, false, { message: 'user already created' });
                    } else {
                        db.doctor.create({ id, password }).then(user => {
                            console.log('user created');
                            return done(null, user);
                        });
                    }
                });
            } catch (error) {
                done(error);
            }
        },
    ),
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'id',
            passwordField: 'password',
            session: false,
        },
        (id, password, done) => {
            try {
                db.doctor.findOne({
                    where: {
                        id: id,
                        password: password,
                    },
                }).then(user => {
                    if (user == null) {
                        return done(null, false, { message: 'Invalid id or password' });
                    } else {
                        console.log('user found. authenticated.');
                        return done(null, user);
                    }
                });
            } catch (error) {
                done(error);
            }
        },
    ),
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
};

passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            db.doctor.findOne({
                where: {
                    id: jwt_payload.id,
                },
            }).then(user => {
                if (user) {
                    console.log('user found in db in passport');
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            });
        } catch (error) {
            done(error);
        }
    }),
);
