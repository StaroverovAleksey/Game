const {Router} = require('express');
const {validationResult} = require('express-validator');
const formParser = require(`connect-multiparty`);
const fs = require("fs");
const {CELL_SIZE} = require("../utils/constants");
const {promisify} = require('util');
const sizeOf = promisify(require('image-size'));
const {body} = require("express-validator");
const Terrain = require('../models/Terrains');
const {firstUpper} = require("../utils/utils");
const {getFileName} = require("../utils/utils");
const {check} = require("express-validator");
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

        try {
            var repeat = await Terrain.findOne({name: firstUpper(req.body.name), group: firstUpper(req.body.group)}).exec();
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
        const file = await fs.readFileSync(req.files.img.path);
        const pathToDirectory = `./client/arts/terrains`;
        const fileName = `${getFileName()}.${req.files.img.name.split('.').reverse()[0]}`;
        const pathToFile = `${pathToDirectory}/${fileName}`;

        try {
            await fs.statSync(pathToDirectory);
        }
        catch (e) {
            await fs.mkdirSync(pathToDirectory);
        }

        await fs.writeFileSync(pathToFile, file);

        const terrain = new Terrain({
            name, group, fileName, passability
        });
        const saveTerrain = await terrain.save();

        res.status(200).json({fileName, _id: saveTerrain._id});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});




router.get('/read', async (req, res) => {
    try {
        const terrains = await Terrain.find().exec();
        res.status(200).json({terrains});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});






router.patch('/update', multiparty, [
    body('name')
        .if(body('name').exists())
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 32 }).withMessage('length between 3 and 32')
        .trim(),
    body('group')
        .if(body('group').exists())
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 32 }).withMessage('length between 3 and 32')
        .trim(),
    body('passability')
        .if(body('passability').exists())
        .isBoolean().withMessage('boolean expected'),
    body('_id')
      .isString().withMessage('string expected')
      .trim(),
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
        }

        if (req.body.group || req.body.name) {
            try {
                var repeat = await Terrain.findOne({name: firstUpper(req.body.name), group: firstUpper(req.body.group)}).exec();
            } catch (e) {}
            if (repeat) {
                errors.errors.push({
                    'msg': "name is exist",
                    'param': "name",
                    'location': "body"
                });
            }
        }

        const oldData = await Terrain.findById(req.body._id ).exec();
        if (!oldData) {
            errors.errors.push({
                'msg': "terrain not found",
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

        let fileName;
        if (req.files.img) {
            const path = `./client/arts/terrains/${oldData.fileName}`;
            await fs.unlinkSync(path);

            fileName = `${getFileName()}.${req.files.img.name.split('.').reverse()[0]}`;
            const pathToFile = `./client/arts/terrains/${fileName}`;
            const file = await fs.readFileSync(req.files.img.path);

            await fs.writeFileSync(pathToFile, file);
            req.body.fileName = fileName;
        }

        await Terrain.findByIdAndUpdate(req.body._id, req.body).exec();

        res.status(200).json(fileName ? {fileName} : {});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});









router.delete('/delete', [
    check('_id')
        .isString().withMessage('string expected')
        .trim(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(418).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        const terrainForDelete = await Terrain.findOne({ _id: req.body._id }).exec();
        const path = `./client/arts/terrains/${terrainForDelete.fileName}`;

        await fs.unlinkSync(path);

        await Terrain.deleteOne({ _id: req.body._id });
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
