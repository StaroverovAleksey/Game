const {Router} = require('express');
const {validationResult} = require('express-validator');
const Map = require('../models/Maps');
const Terrain = require('../models/Terrains');
const {query} = require("express-validator");
const {body} = require("express-validator");
const router = Router();

router.post('/create', [
    body()
        .isArray().withMessage('array of objects expected'),
    body('*.x')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    body('*.y')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    body('*.type')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const index = errors.errors.findIndex((value) => value.msg === 'array of objects expected');
            if (index > -1) {
                errors.errors = [errors.errors[0]];
            }
            return res.status(400).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        const terrain = await Terrain.findOne({ number: req.body[0].type }).exec();
        if (!terrain) {
            return res.status(400).json({
                errors: [{
                    'msg': "type is not exist",
                    'param': "type",
                    'location': "body"
                }],
                massage: 'bad request'
            });
        }

        let map = await Map.findOne({name: 'Map number 2'}).exec();
        if (!map) {
            map = await new Map({cells: {}});
        }

        for (let i = 0; i < req.body.length; i++) {
            const name = `${req.body[i].x}_${req.body[i].y}`;
            map.cells.set(name, {terrain: terrain._id});
        }

        await map.save();

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.get('/read', [
    query('_id')
        .isString().withMessage('string expected')
        .trim()
],  async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(418).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        const map = await Map.findOne({_id: req.query._id}).populate('cells.$*.terrain');
        res.status(200).json(map.cells);
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.delete('/delete', [
    body('_id')
        .isString().withMessage('string expected')
        .trim()
],   async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(418).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        const map = await Map.findOne({_id: req.query._id});
        map.cells = {}
        await map.save();
        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
