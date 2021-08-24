export class Screen {
    constructor() {
        this.canvas = this._getCanvas();
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.context = this.canvas.getContext('2d');

        window.addEventListener('resize', this._resizeHandler);
    }

    _getCanvas = () => {
        return window.document.getElementsByTagName('canvas')[0];
    }

    _resizeHandler = () => {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
    }

}