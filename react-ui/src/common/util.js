import LZString from 'lz-string';

export function stringifyAndCompress(obj) {
    return LZString.compress(JSON.stringify(obj));
}

export function decompressAndParse(str) {
    console.log(str);
    console.log(LZString.decompress(str));
    console.log(JSON.parse(LZString.decompress(str)));
    return JSON.parse(LZString.decompress(str));
}