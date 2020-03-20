import LZString from 'lz-string';

export function stringifyAndCompress(obj) {
    return LZString.compressToUTF16(JSON.stringify(obj));
}

export function decompressAndParse(str) {
    console.log(str);
    console.log(LZString.decompressFromUTF16(str));
    console.log(JSON.parse(LZString.decompress(str)));
    return JSON.parse(LZString.decompressFromUTF16(str));
}