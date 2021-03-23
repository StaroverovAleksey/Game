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
        console.log(req.files.img);
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
        const pathToDirectory = `./client/src/assets/images/terrains`;
        const fileName = `${getFileName()}.${req.files.img.name.split('.').reverse()[0]}`;
        const pathToFile = `./client/src/assets/images/terrains/${fileName}`;

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

        console.log(1111);
        const oldData = await Terrain.findOne({ number: req.body.oldNumber }).exec();
        await Terrain.findOneAndUpdate({number: req.body.oldNumber}, req.body).exec();
        console.log(2222);

        if (req.body.sort || req.body.number) {
            const sort = req.body.sort.toString().toUpperCase()[0] + req.body.sort.toString().toLowerCase().slice(1);
            console.log(333, req.body.oldNumber);
            const pathToFileOld = `./client/src/assets/images/terrains/${oldData.sort}/${oldData.number}.jpg`;
            const pathToFile = `./client/src/assets/images/terrains/${sort || oldData.sort}/${req.body.number || oldData.number}.jpg`;
            const pathDir = `./client/src/assets/images/terrains/${sort || oldData.sort}`;
            const pathDirOld = `./client/src/assets/images/terrains/${oldData.sort}`;
            const path = `assets/images/terrains/${sort || oldData.sort}/${req.body.number || oldData.number}.jpg`;
            console.log(pathToFileOld, pathToFile, path);
            await Terrain.findOneAndUpdate({number: req.body.number || req.body.oldNumber}, {path: path}).exec();
            console.log(pathToFileOld, pathToFile);
            try {
                console.log(await fs.statSync(pathToFileOld));
                await fs.mkdirSync(pathDir);
                await fs.renameSync(pathToFileOld, pathToFile);
                await fs.rmdirSync(pathDirOld);
            } catch (e) {
                console.log(e);
            }
            console.log(888);
        }

        console.log(req.body);
        console.log(req.files);
        //const terrains = await Terrain.find().exec();
        res.status(200).json({as: req.body});
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
        const path = `./client/src/assets/images/terrains/${terrainForDelete.sort}/${terrainForDelete.number}.jpg`;
        const pathToDirectory = `./client/src/assets/images/terrains/${terrainForDelete.sort}`;

        await fs.rmSync(path);
        try {
            await fs.rmdirSync(pathToDirectory);
        } catch (e) {
        }

        await Terrain.deleteOne({ number: req.body.number });
        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
