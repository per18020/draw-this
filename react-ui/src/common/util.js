import LZString from 'lz-string';

export function stringifyAndCompress(obj) {
    return LZString.compress(JSON.stringify(obj));
}

export function decompressAndParse(string) {
    return JSON.parse(LZString.decompress(string));
}