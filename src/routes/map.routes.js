const {Router} = require('express');
const {validationResult} = require('express-validator');
const Map = require('../models/Map');
const {isAdmin} = require("../utils/middleware");
const {trimCells} = require("../utils/utils");
const {firstUpper} = require("../utils/utils");
const {body} = require("express-validator");
const router = Router();

router.post('/create', [
    body('name')
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 14 }).withMessage('length between 3 and 14')
        .trim(),
    body('group')
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 14 }).withMessage('length between 3 and 14')
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

        const repeat = await Map.findOne({name: firstUpper(req.body.name), group: firstUpper(req.body.group)}).exec();
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
            name: firstUpper(req.body.name),
            group: firstUpper(req.body.group),
            size: {
                x: req.body.size.x,
                y: req.body.size.y,
            },
            cells: {}
        }

        const map = await new Map(data);
        const saveMap = await map.save();

        res.status(200).json({_id: saveMap._id});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});





router.get('/read', async (req, res) => {
    try {
        const maps = await Map.find({}, 'name size group').exec();
        res.status(200).json({maps});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});



router.patch('/update', [
    body('name')
        .if(body('name').exists())
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 14 }).withMessage('length between 3 and 14')
        .trim(),
    body('group')
        .if(body('group').exists())
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 14 }).withMessage('length between 3 and 14')
        .trim(),
    body('size')
        .if(body('size').exists())
        .isObject().withMessage('object expected'),
    body('size.x')
        .if(body('size.x').exists())
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    body('size.y')
        .if(body('size.y').exists())
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    body('_id')
        .isString().withMessage('string expected')
        .trim(),
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (req.body.group || req.body.name) {
            try {
                var repeat = await Map.findOne({name: firstUpper(req.body.name), group: firstUpper(req.body.group)}).exec();
            } catch (e) {}
            if (repeat && repeat._id.toString() !== req.body._id.toString()) {
                errors.errors.push({
                    'msg': "name is exist",
                    'param': "name",
                    'location': "body"
                });
            }
        }

        try {
            var oldData = await Map.findById(req.body._id).exec();
        } catch (e) {}
        if (!oldData) {
            errors.errors.push({
                'msg': "map not found",
                'param': "name",
                'location': "body"
            });
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        if (req.body.group) {
            req.body.group = firstUpper(req.body.group);
        }

        if (req.body.name) {
            req.body.name = firstUpper(req.body.name);
        }

        if (req.body.size && !req.body.size.y) {
            req.body.size.y = oldData.size.y;
        }

        if (req.body.size && !req.body.size.x) {
            req.body.size.x = oldData.size.x;
        }

        if (req.body.size) {
            req.body.cells = trimCells(oldData, req.body.size);
        }

        await Map.findByIdAndUpdate(req.body._id, req.body).exec();

        res.status(200).json({});
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
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(418).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        try {
            await Map.deleteOne({_id: req.body._id});
        } catch (e) {
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

        await Map.deleteOne({_id: req.body._id});
        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
