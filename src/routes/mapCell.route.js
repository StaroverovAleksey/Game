const {Router} = require('express');
const {validationResult} = require('express-validator');
const Cell = require('../models/MapCell');
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

        /**** Удаляем дубликаты по обеим координатам в массиве, полученном с фронта. Удаляются первые по списку дубликаты.*/
        const valuesForAdd = [];
        for (let i = 0; i < req.body.length; i++) {
            let repeat = false;
            for (let j = i + 1; j < req.body.length; j++) {
                if ( (parseInt(req.body[i].x) === parseInt(req.body[j].x))
                    && (parseInt(req.body[i].y) === parseInt(req.body[j].y)) ) {
                    repeat = true;
                    break;
                }
            }
            !repeat && valuesForAdd.push(req.body[i]);
        }
        /**** Удаляем из БД все объекты, у которых обе координаты совпадают с любым объектом из списка с фронта.
         * Записываем в БД все объекты с фронта.*/
        const valuesExist = await Cell.find().exec();
        for (let i = 0; i < valuesForAdd.length; i++) {
            const x = parseInt(valuesForAdd[i].x);
            const y = parseInt(valuesForAdd[i].y);
            let type = parseInt(valuesForAdd[i].type);

            const repeatIndex = valuesExist.findIndex((value) => value.x === x && value.y === y);
            if (repeatIndex > -1) {
                await Cell.deleteOne({ _id: valuesExist[repeatIndex]._id }).exec();
            }

            const cellType = await Terrain.findOne({ number: type }).exec();
            if (!cellType) {
                return res.status(400).json({
                    errors: [{
                        'msg': "type is not exist",
                        'param': "type",
                        'location': "body"
                    }],
                    massage: 'bad request'
                });
            }
            type = cellType._id;

            const mapCell = new Cell({
                x, y, type
            });
            await mapCell.save();
        }

        res.status(200).json({});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.get('/get', async (req, res) => {
    try {
        const mapCells = await Cell.find().populate('type');
        res.status(200).json({mapCells});
    } catch (error) {
        res.status(500).json({massage: 'server error'});
    }
});

router.delete('/delete-all', async (req, res) => {
    try {
        await Cell.deleteMany();
        res.status(200).json({});
    } catch (error) {
        console.log(error);
        res.status(500).json({massage: 'server error'});
    }
});

module.exports = router;
