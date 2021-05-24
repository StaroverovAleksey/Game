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
    if (!cell || !cell.terrains || !cell.terrains.length === 0) {
        return atrUtilsPath('emptyTile.png');
    }
    return cell.terrains
        .map(({fileName}) => atrTerrainsPath(fileName))
        .reverse()
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
