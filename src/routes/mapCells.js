const {Router} = require('express');
const {validationResult} = require('express-validator');
const Map = require('../models/Maps');
const Terrain = require('../models/Terrains');
const {SECOND_TERRAIN} = require("../utils/constants");
const {MAIN_TERRAIN} = require("../utils/constants");
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
    body('typeTerrain')
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
            var terrain = await Terrain.findById(req.body.terrain_id).exec();
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
            var map = await Map.findById(req.body.map_id).exec();
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

            const {terrains={}} = map.cells.get(name) || {};
            console.log(terrains);
            if (req.body.typeTerrain === MAIN_TERRAIN) {

                terrains[MAIN_TERRAIN] = terrain._id;
            }
            if (req.body.typeTerrain === SECOND_TERRAIN) {
                terrains[SECOND_TERRAIN] = terrain._id;
            }

            //console.log(terrains);
            map.cells.set(name, {terrains});
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

        const map = await Map.findById(req.query._id)
            .populate('cells.$*.terrains.mainTerrain')
            .populate('cells.$*.terrains.secondTerrain');
        console.log(map.cells);
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

        try {
            var map = await Map.findById(req.body._id);
        } catch (e) {}
        if (!map) {
            errors.errors.push({
                'msg': "terrain not found",
                'param': "_id",
                'location': "body"
            });

            return res.status(418).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        map.cells = {}
        await map.save();
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
