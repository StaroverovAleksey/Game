const {Router} = require('express');
const {validationResult} = require('express-validator');
const Map = require('../models/Maps');
const Terrain = require('../models/Terrains');
const {body} = require("express-validator");
const router = Router();

router.post('/create', [
    body()
        .isArray().withMessage('array of objects expected'),
    body('*.x')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3'),
    body('*.y')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3'),
    body('*.type')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
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

        let map = await Map.findOne({}).exec();
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

router.get('/read', async (req, res) => {
    try {
        const map = await Map.find().populate('cells.$*.terrain');
        res.status(200).json(map.length ? map[0].cells : {});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.delete('/delete', async (req, res) => {
    try {
        await Map.deleteMany();
        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
