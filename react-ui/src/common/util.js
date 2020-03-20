import LZString from 'lz-string';

export function stringifyAndCompress(obj) {
    return LZString.compressToUTF16(JSON.stringify(obj));
}

export function decompressAndParse(str) {
    return JSON.parse(LZString.decompressFromUTF16(str));
}