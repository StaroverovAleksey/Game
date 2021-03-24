const {Router} = require('express');
const {validationResult} = require('express-validator');
const formParser = require(`connect-multiparty`);
const fs = require("fs");
const {CELL_SIZE} = require("../utils/constants");
const {promisify} = require('util');
const sizeOf = promisify(require('image-size'));
const {body} = require("express-validator");
const Terrain = require('../models/Terrains');
const {getFileName} = require("../utils/utils");
const {check} = require("express-validator");
const router = Router();

const multiparty = formParser();

router.post('/create', multiparty, [
    check('number')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    body('name')
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 32 }).withMessage('length between 3 and 32')
        .trim()
        .custom((value) => {
            if (value.split('').some((v) => v === ' ')) {
                throw new Error('space forbidden')
            } else {
                return true;
            }
        }),
    body('sort')
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 32 }).withMessage('length between 3 and 32')
        .trim()
        .custom((value) => {
            if (value.split('').some((v) => v === ' ')) {
                throw new Error('space forbidden')
            } else {
                return true;
            }
        }),
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
        const sort = req.body.sort.toString().toUpperCase()[0] + req.body.sort.toString().toLowerCase().slice(1);
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

        const cellType = new Terrain({
            number, name, sort, fileName, passability
        });
        await cellType.save();

        res.status(200).json({fileName});
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
    check('oldNumber')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    check('number')
        .if(body('number').exists())
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
        .trim(),
    body('name')
        .if(body('name').exists())
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 32 }).withMessage('length between 3 and 32')
        .trim()
        .custom((value) => {
            if (value.split('').some((v) => v === ' ')) {
                throw new Error('space forbidden')
            } else {
                return true;
            }
        }),
    body('sort')
        .if(body('sort').exists())
        .isString().withMessage('string expected')
        .isLength({ min: 3, max: 32 }).withMessage('length between 3 and 32')
        .trim()
        .custom((value) => {
            if (value.split('').some((v) => v === ' ')) {
                throw new Error('space forbidden')
            } else {
                return true;
            }
        }),
    body('passability')
        .if(body('passability').exists())
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
        }

        if (req.body.number) {
            let result = !isNaN(req.body.number) ? await Terrain.findOne({ number: req.body.number }).exec() : null;
            if (result) {
                errors.errors.push({
                    'msg': "number is exist",
                    'param': "number",
                    'location': "body"
                });
            }
        }

        if (req.body.number) {
            let result = !isNaN(req.body.oldNumber) ? await Terrain.findOne({ number: req.body.oldNumber }).exec() : null;
            if (!result) {
                errors.errors.push({
                    'msg': "oldNumber not found",
                    'param': "number",
                    'location': "body"
                });
            }
        }

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'bad request'
            });
        }

        if (req.body.sort) {
            req.body.sort = req.body.sort.toString().toUpperCase()[0] + req.body.sort.toString().toLowerCase().slice(1);
        }

        let fileName;
        if (req.files.img) {
            const oldData = await Terrain.findOne({ number: req.body.oldNumber }).exec();
            const path = `./client/arts/terrains/${oldData.fileName}`;
            await fs.unlinkSync(path);

            fileName = `${getFileName()}.${req.files.img.name.split('.').reverse()[0]}`;
            const pathToFile = `./client/arts/terrains/${fileName}`;
            const file = await fs.readFileSync(req.files.img.path);

            await fs.writeFileSync(pathToFile, file);
            req.body.fileName = fileName;
        }

        await Terrain.findOneAndUpdate({number: req.body.oldNumber}, req.body).exec();

        res.status(200).json(fileName ? {fileName} : {});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});









router.delete('/delete', [
    check('number')
        .isNumeric().withMessage('number expected')
        .isLength({ max: 3 }).withMessage('max length expected 3')
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

        const terrainForDelete = await Terrain.findOne({ number: req.body.number }).exec();
        const path = `./client/arts/terrains/${terrainForDelete.fileName}`;

        console.log(path);
        try {
            await fs.unlinkSync(path);
        } catch (e) {
            console.log(e);
        }


        await Terrain.deleteOne({ number: req.body.number });
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
