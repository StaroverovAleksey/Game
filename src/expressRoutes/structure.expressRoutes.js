const {Router} = require('express');
const {validationResult} = require('express-validator');
const formParser = require(`connect-multiparty`);
const fs = require("fs");
const {CELL_SIZE} = require("../utils/constants");
const {promisify} = require('util');
const sizeOf = promisify(require('image-size'));
const {body} = require("express-validator");
const StructureModel = require('../models/Structure.model');
const {firstUpper} = require("../utils/utils");
const {getFileName} = require("../utils/utils");
const router = Router();

const multiparty = formParser();

router.post('/create', multiparty, [
    body('name')
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 14 }).withMessage('length between 3 and 14')
        .trim(),
    body('group')
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 14 }).withMessage('length between 3 and 14')
        .trim(),
    body('description')
        .if(body('description').exists())
        .isString().withMessage('string expected')
        .isLength({ max: 128 }).withMessage('max length 128')
        .trim(),
    body('passability')
        .isBoolean().withMessage('boolean expected')
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (req.files.img && (req.files.img.type === 'image/jpeg' || req.files.img.type === 'image/png')) {

            const dimensions = await sizeOf(req.files.img.path);

            if (dimensions.width !== CELL_SIZE.WIDTH * 3 || dimensions.height !== CELL_SIZE.HEIGHT) {
                errors.errors.push({
                    'msg': "size image 192/64 px expected",
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

        try {
            var repeat = await StructureModel.findOne({name: firstUpper(req.body.name), group: firstUpper(req.body.group)}).exec();
        } catch (e) {}
        if (repeat) {
            errors.errors.push({
                'msg': "name is exist",
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

        const name = firstUpper(req.body.name);
        const group = firstUpper(req.body.group);
        const passability = req.body.passability;
        const description = req.body.description || '';
        const file = await fs.readFileSync(req.files.img.path);
        const pathToDirectory = `./arts/structures`;
        const fileName = `${getFileName()}.${req.files.img.name.split('.').reverse()[0]}`;
        const pathToFile = `${pathToDirectory}/${fileName}`;

        try {
            await fs.statSync(pathToDirectory);
        }
        catch (e) {
            await fs.mkdirSync(pathToDirectory);
        }

        await fs.writeFileSync(pathToFile, file);

        const structure = new StructureModel({
            name, group, fileName, passability, description
        });
        const saveStructure = await structure.save();

        res.status(200).json({fileName, _id: saveStructure._id});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});




router.get('/read', async (req, res) => {
    try {
        const structures = await StructureModel.find().exec();
        res.status(200).json({structures});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
