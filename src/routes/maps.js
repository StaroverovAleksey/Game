const {Router} = require('express');
const {validationResult} = require('express-validator');
const Map = require('../models/Maps');
const Terrain = require('../models/Terrains');
const {body} = require("express-validator");
const router = Router();

router.post('/create', [
    body('name')
        .isString().withMessage('string expected')
        .isLength({ min: 3 }).withMessage('min length expected 3')
        .trim(),
    body('size')
        .isObject().withMessage('object expected'),
    body('size.x')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    body('size.y')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        let repeat = await Map.findOne({name: req.body.name}).exec();
        if (repeat) {
            return res.status(400).json({
                errors: [{
                    'msg': "name is exist",
                    'param': "name",
                    'location': "body"
                }],
                massage: 'bad request'
            });
        }

        const data = {
            name: req.body.name,
            size: {
                x: req.body.size.x,
                y: req.body.size.y,
            },
            cells: {}
        }

        const map = await new Map(data);
        await map.save();

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.get('/read', async (req, res) => {
    try {
        const maps = await Map.find({}, 'name').exec();
        res.status(200).json({maps});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.delete('/delete', [
    body('_id')
        .isString().withMessage('string expected')
        .trim()
], async (req, res) => {
    try {
        await Map.deleteOne({_id: req.body._id});
        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
