'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config');
const db = {};

console.log(JSON.stringify(config));

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: 'mysql',
  host: config.db.host,
  port: 3309,
  timezone: 'Asia/Tokyo',
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// associations
// hospitals
db.hospital.hasMany(db.patient);
db.hospital.hasMany(db.doctor);

// patients
db.patient.hasMany(db.questionnaire);

db.patient.belongsTo(db.hospital);

// doctors
db.doctor.belongsTo(db.hospital);

// questionnaire
db.questionnaire.belongsTo(db.patient)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
