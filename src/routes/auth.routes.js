const {Router} = require('express');
const {validationResult} = require('express-validator');
const {body} = require("express-validator");
const Character = require('../models/Character');
const User = require('../models/User');
const Map = require('../models/Map');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {START_LOCATION} = require("../utils/constants");
const {START_MAP_ID} = require("../utils/constants");
const {isAuth} = require("../utils/middleware");
const {JWT_SECRET} = require("../utils/constants");
const {JWT_EXPIRES} = require("../utils/constants");
const router = Router();

router.post('/registration', [
    body('email')
        .isString().withMessage('string expected')
        .isEmail().withMessage('email expected')
        .isLength({ min: 3, max: 64 }).withMessage('length between 3 and 64')
        .trim(),
    body('name')
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 16 }).withMessage('length between 3 and 16')
        .trim(),
    body('password')
        .isString().withMessage('string expected')
        .isLength({ min: 6, max: 64 }).withMessage('length between 6 and 64')
        .trim(),
    body('passwordRepeat')
        .isString().withMessage('string expected')
        .isLength({ min: 6, max: 64 }).withMessage('length between 6 and 64')
        .trim(),
], async (req, res) => {
    try {
        const {email, name, password, passwordRepeat} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        if (password !== passwordRepeat ) {
            return res.status(400).json({
                errors: [{
                    'msg': "incorrect password repeat",
                    'param': "passwordRepeat",
                    'location': "body"
                }],
                message: 'bad request'
            });
        }

        const checkEmail = await User.findOne({email});
        if(checkEmail) {
            return res.status(400).json({
                errors: [{
                    'msg': "email is exist",
                    'param': "email",
                    'location': "body"
                }],
                message: 'bad request'
            });
        }

        const checkName = await Character.findOne({name});
        if(checkName) {
            return res.status(400).json({
                errors: [{
                    'msg': "name is exist",
                    'param': "name",
                    'location': "body"
                }],
                message: 'bad request'
            });
        }

        const startMap = await Map.findOne();
        const character = new Character({name, map: startMap.id, direction: 'front', location: START_LOCATION});
        await character.save();

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword, character: character.id});
        await user.save();

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.post('/login', [
    body('email')
        .isString().withMessage('string expected')
        .isEmail().withMessage('email expected')
        .isLength({ min: 3, max: 64 }).withMessage('length between 3 and 64')
        .trim(),
    body('password')
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 64 }).withMessage('length between 3 and 64')
        .trim(),
], async (req, res) => {
    try {
        const {email, password} = req.body;
        const errors = validationResult(req);

        const user = await User.findOne({email});
        if(!user) {
            errors.errors.push({
                'msg': "incorrect email or password",
                'param': "email",
                'location': "body"
            });
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    'msg': "incorrect email or password",
                    'param': "email",
                    'location': "body"
                }],
                message: 'bad request'
            });
        }

        const token = jwt.sign(
            {userId: user.id, accessLevel: user.accessLevel},
            JWT_SECRET,
            {expiresIn: `${JWT_EXPIRES}h`}
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : true
        });
        res.status(200).json({id: user.id});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.get('/refresh-token', isAuth, async (req, res) => {
    try {
        const {userId, accessLevel} = req.user;
        const token = jwt.sign(
            {userId, accessLevel},
            JWT_SECRET,
            {expiresIn: `${JWT_EXPIRES}h`}
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : true
        });
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.get('/check-auth', isAuth, async (req, res) => {
    try {
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
