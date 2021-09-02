import {delExt, getExt, pathToArt} from "../tools/utils";

export class ImageLoader {
    constructor(artPaths) {
        this.artPaths = artPaths;
        this.images = {};
    }

    load = async () => {
        const promises = [];
        Object.entries(this.artPaths).forEach(([category, imgArray]) => {
            this.images[category] = [];
            imgArray.forEach((src) => {
                if(getExt(src) === 'png' || getExt(src) === 'jpg') {
                    promises.push(this.loadImage(category, src));
                }
            });
        })
        await Promise.all(promises);
        return this.images;
    }

    loadImage = (category, src) => {
        return new Promise((resolve) => {
            const image = new Image();
            this.images[category][delExt(src)] = image;
            image.onload = () => resolve();
            image.src = `${pathToArt()}${category}/${src}`;
        });
    }
}
