const {Router} = require('express');
const User = require('../models/User');
const {isAuth} = require("../utils/middleware");
const router = Router();

module.exports = {
    qwerty (event, next) {
        console.log(event);
    }
} ;
