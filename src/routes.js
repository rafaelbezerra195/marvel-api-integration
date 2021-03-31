const routes = require('express').Router();

const HqController = require('./controllers/HqController');

routes.get('/hq/list', HqController.list);

module.exports = routes;