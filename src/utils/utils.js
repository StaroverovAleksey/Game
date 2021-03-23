module.exports = {
    getFileName () {
        const ascii_1 = new Array(58-48).fill('').map((value, index) => index + 48);
        const ascii_3 = new Array(123-97).fill('').map((value, index) => index + 97);
        const codesASCII = [].concat(ascii_1, ascii_3);

        const randomCodesASCII = new Array(16).fill('').map(
            () => codesASCII[Math.round(Math.random() * (codesASCII.length - 1))]
        );
        return String.fromCharCode(...randomCodesASCII);
    }
}
