const {DELETE_COLLAGE} = require("./constants");
const {SECOND_TERRAIN} = require("./constants");
const config = require("../../clients/gameCreator/config.json");

module.exports = {
    isEmpty(obj) {
        for (const key in obj) {
            return false;
        }
        return true;
    },

    pathToArt () {
        return process.env.NODE_ENV === 'development' ? config.develop.pathToArts : config.production.pathToArts;
    },

    atrTerrainsPath (name) {
        return `url(${module.exports.pathToArt()}terrains/${name})`;
    },

    atrUtilsPath (name) {
        return `url(${module.exports.pathToArt()}utils/${name})`;
    },

    getTileCollage (cell) {
        if (!cell || (!cell.mainTerrain && !cell.secondTerrain)) {
            return module.exports.atrUtilsPath('emptyTile.png');
        }
        const imgForCollage = ['secondTerrain', 'mainTerrain'];
        return imgForCollage
            .map((imgName) => (cell[imgName] && module.exports.atrTerrainsPath(cell[imgName].fileName)))
            .filter((value) => value)
            .join(', ');
    },

    getCursorImg ({ choiceTerrain, mapDataType }) {
        if (mapDataType === DELETE_COLLAGE) {
            return `${module.exports.atrUtilsPath('eraser.png')}, pointer`;
        }
        if (choiceTerrain) {
            return mapDataType === SECOND_TERRAIN
                ? `${module.exports.atrUtilsPath('pencilCursorAdd.png')}, pointer`
                : `${module.exports.atrUtilsPath('pencilCursor.png')}, pointer`;
        }
    },

    getFileName () {
        const ascii_1 = new Array(58-48).fill('').map((value, index) => index + 48);
        const ascii_3 = new Array(123-97).fill('').map((value, index) => index + 97);
        const codesASCII = [].concat(ascii_1, ascii_3);

        const randomCodesASCII = new Array(16).fill('').map(
            () => codesASCII[Math.round(Math.random() * (codesASCII.length - 1))]
        );
        return String.fromCharCode(...randomCodesASCII);
    },

    firstUpper (string) {
        return string.toString().trim().toUpperCase()[0] + string.toString().trim().toLowerCase().slice(1);
    },

    trimCells ({cells, size: oldSize}, newSize) {
        if (oldSize.x <= newSize.x && oldSize.y <= newSize.y) {
            return cells;
        }

        const arrayX = [];
        const arrayY = [];
        if (oldSize.x > newSize.x) {
            for(let i = oldSize.x; i > newSize.x; i--) {
                arrayX.push(i);
            }
        }

        if (oldSize.y > newSize.y) {
            for(let i = oldSize.y; i > newSize.y; i--) {
                arrayY.push(i);
            }
        }

        for (let cell of cells.keys()) {
            const cellX = cell.split('_')[0];
            const cellY = cell.split('_')[1];
            if (arrayX.includes(parseInt(cellX)) || arrayY.includes(parseInt(cellY))) {
                cells.delete(cell);
            }
        }

        return cells;
    }
}
