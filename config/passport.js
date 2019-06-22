'use strict';

const jwtSecret = require('./jwtConfig');

const passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    db = require('../models/index'),
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username, password, done) => {
            try {
                db.doctor.findOne({
                    where: {
                        username: username,
                    },
                }).then(user => {
                    if (user != null) {
                        console.log('username already taken');
                        return done(null, false, { message: 'username already taken' });
                    } else {
                        Doctor.create({ username, password }).then(user => {
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
            usernameField: 'username',
            passwordField: 'password',
            session: false,
        },
        (username, password, done) => {
            try {
                db.doctor.findOne({
                    where: {
                        username: username,
                        password: password,
                    },
                }).then(user => {
                    if (user == null) {
                        return done(null, false, { message: 'Invalid username or password' });
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
                    username: jwt_payload.id,
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
