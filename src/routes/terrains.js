const {Router} = require('express');
const {validationResult} = require('express-validator');
const formParser = require(`connect-multiparty`);
const fs = require("fs");
const {CELL_SIZE} = require("../utils/constants");
const {promisify} = require('util');
const sizeOf = promisify(require('image-size'));
const {body} = require("express-validator");
const Terrain = require('../models/Terrains');
const {check} = require("express-validator");
const router = Router();

const multiparty = formParser();

router.post('/create', multiparty, [
    check('number')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3'),
    body('name')
        .isString().withMessage('string expected')
        .isLength({ max: 32 }).withMessage('max length expected 32'),
    body('sort')
        .isString().withMessage('string expected')
        .isLength({ max: 32 }).withMessage('max length expected 32'),
    body('passability')
        .isBoolean().withMessage('boolean expected')
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (req.files.img && req.files.img.type === 'image/jpeg') {

            const dimensions = await sizeOf(req.files.img.path);

            if (dimensions.width !== CELL_SIZE.WIDTH || dimensions.height !== CELL_SIZE.HEIGHT) {
                errors.errors.push({
                    'msg': "size image 64/64 px expected",
                    'param': "img",
                    'location': "body"
                });
            }

        } else {
            errors.errors.push({
                'msg': "type file image/jpeg expected",
                'param': "img",
                'location': "body"
            });
        }

        let result = !isNaN(req.body.number) ? await Terrain.findOne({ number: req.body.number }).exec() : null;
        if (result) {
            errors.errors.push({
                'msg': "number is exist",
                'param': "number",
                'location': "body"
            });
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        const number = req.body.number;
        const name = req.body.name;
        const sort = req.body.sort;
        const passability = req.body.passability;
        const file = await fs.readFileSync(req.files.img.path);
        const pathToDirectory = `./client/src/assets/images/terrains/${sort}`;
        const pathToFile = `./client/src/assets/images/terrains/${sort}/${name}.jpg`;
        const path = `assets/images/terrains/${sort}/${name}.jpg`;

        try {
            await fs.statSync(pathToDirectory);
        }
        catch (e) {
            await fs.mkdirSync(pathToDirectory);
        }

        await fs.writeFileSync(pathToFile, file);

        const cellType = new Terrain({
            number, name, sort, path, passability
        });
        await cellType.save();

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.get('/get', async (req, res) => {
    try {
        const terrains = await Terrain.find().exec();
        res.status(200).json({terrains});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
