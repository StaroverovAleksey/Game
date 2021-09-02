import config from "../../config.json";
import {array} from "prop-types";
import {ANIMATION_TURN_DOWN, ANIMATION_TURN_LEFT, ANIMATION_TURN_RIGHT, ANIMATION_TURN_UP} from "./animations";

export const isEmpty = (obj) => {
    for (const key in obj) {
        return false;
    }
    return true;
};

export const pathToArt = () => {
    return process.env.NODE_ENV === 'development' ? config.develop.pathToArts : config.production.pathToArts;
};

export const atrUtilsPath = (name) => {
    return `url(${pathToArt()}utils/${name})`;
};

export const atrTerrainsPath = (name) => {
    return `url(${pathToArt()}terrains/${name})`;
};

export const atrCharPath = (name) => {
    return `url(${pathToArt()}character/${name})`;
};

export const atrChar = ({sex, bodyColor, hairType, hairColor}) => {
    return `url(${pathToArt()}character/${sex}/hair/${hairType}/${hairColor}.png), url(${pathToArt()}character/${sex}/body/${bodyColor}.png)`;
};

export const throttle = (func, ms) => {

    let isThrottled = false, savedArgs, savedThis;

    function wrapper() {

        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
}

export const getTileCollage = (cell) => {
    if (!cell || !cell.terrains || !cell.terrains.length === 0) {
        return '';
    }
    return cell.terrains
        .map(({fileName}) => atrTerrainsPath(fileName))
        .reverse()
        .join(', ');
};

export const delExt = (value) => {
    const splitValue = value.split('.');
    return splitValue.slice(0, splitValue.length - 1).join('.');
}

export const getExt = (value) => {
    return value.split('.').slice(-1).join('.');
}

export const randomElem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};
