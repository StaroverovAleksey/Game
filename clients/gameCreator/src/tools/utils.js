import {DELETE_COLLAGE, SECOND_TERRAIN} from "./constants";
import config from "../../config.json";

export const isEmpty = (obj) => {
    for (const key in obj) {
        return false;
    }
    return true;
};

export const pathToArt = () => {
    return process.env.NODE_ENV === 'development' ? config.develop.pathToArts : config.production.pathToArts;
};

export const atrTerrainsPath = (name) => {
    return `url(${pathToArt()}terrains/${name})`;
};

export const atrUtilsPath = (name) => {
    return `url(${pathToArt()}utils/${name})`;
};

export const getTileCollage = (cell) => {
    if (!cell || (!cell.mainTerrain && !cell.secondTerrain)) {
        return atrUtilsPath('emptyTile.png');
    }
    const imgForCollage = ['secondTerrain', 'mainTerrain'];
    return imgForCollage
        .map((imgName) => (cell[imgName] && atrTerrainsPath(cell[imgName].fileName)))
        .filter((value) => value)
        .join(', ');
};

export const getCursorImg = ({ choiceTerrain, mapDataType }) => {
    if (mapDataType === DELETE_COLLAGE) {
        return `${atrUtilsPath('eraser.png')}, pointer`;
    }
    if (choiceTerrain) {
        return mapDataType === SECOND_TERRAIN
            ? `${atrUtilsPath('pencilCursorAdd.png')}, pointer`
            : `${atrUtilsPath('pencilCursor.png')}, pointer`;
    }
};

export const firstUpper = (string) => {
    return string.toString().trim().toUpperCase()[0] + string.toString().trim().toLowerCase().slice(1);
};
