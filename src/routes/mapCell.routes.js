const {Router} = require('express');
const {validationResult} = require('express-validator');
const Map = require('../models/Map');
const Terrain = require('../models/Terrain');
const {isAdmin, isAuth} = require("../utils/middleware");
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
    body('cells')
        .isArray().withMessage('array of strings expected')
        .notEmpty().withMessage('should not be empty'),
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const index = errors.errors.findIndex((value) => value.msg === 'array of strings expected');
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
            const name = req.body.cells[i];
            const cell = map.cells.get(name) || {terrains: []};
            cell.terrains.push(terrain._id);
            map.cells.set(name, cell);
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
            .populate('cells.$*.terrains');
        res.status(200).json(map.cells);
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.delete('/delete', [
    body('_id')
        .isString().withMessage('string expected')
        .trim(),
    body('cells')
        .if(body('cells').exists())
        .isArray().withMessage('array of strings expected')
        .notEmpty().withMessage('should not be empty'),
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
                'msg': "map not found",
                'param': "_id",
                'location': "body"
            });

            return res.status(418).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        if (req.body.cells) {
            req.body.cells.forEach((cell) => map.cells.delete(cell));
        } else {
            map.cells = {}
        }

        await map.save();
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
