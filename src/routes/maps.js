const {Router} = require('express');
const {validationResult} = require('express-validator');
const Map = require('../models/Maps');
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
