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

export const atrCharPath = (name) => {
    return `url(${pathToArt()}character/${name})`;
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
