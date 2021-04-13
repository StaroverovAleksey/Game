const {Router} = require('express');
const {validationResult} = require('express-validator');
const Map = require('../models/Maps');
const Terrain = require('../models/Terrains');
const {query} = require("express-validator");
const {body} = require("express-validator");
const router = Router();

router.post('/create', [
    body('terrain_id')
        .isString().withMessage('string expected')
        .trim(),
    body('map_id')
        .isString().withMessage('string expected')
        .trim(),
    body('cells')
        .isArray().withMessage('array of objects expected')
        .notEmpty().withMessage('should not be empty'),
    body('cells.*.x')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    body('cells.*.y')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
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

        try {
            var terrain = await Terrain.findOne({ _id: req.body.terrain_id }).exec();
        } catch (e) {}
        if (!terrain) {
            return res.status(400).json({
                errors: [{
                    'msg': "terrain's _id is not exist",
                    'param': "_id",
                    'location': "body"
                }],
                massage: 'bad request'
            });
        }

        try {
            var map = await Map.findOne({_id: req.body.map_id}).exec();
        } catch (e) {}
        if (!map) {
            return res.status(400).json({
                errors: [{
                    'msg': "map's _id is not exist",
                    'param': "_id",
                    'location': "body"
                }],
                massage: 'bad request'
            });
        }

        for (let i = 0; i < req.body.cells.length; i++) {
            const name = `${req.body.cells[i].x}_${req.body.cells[i].y}`;
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
