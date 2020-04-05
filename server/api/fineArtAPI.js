const axios = require('axios');
const util = require('../common/util');

let instance = null;

class FineArtAPI {
    constructor() {
        this.objectListURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=%22%22";
        this.objectURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

        this.ready = false;

        this.objectList = [];
        axios.get(this.objectListURL).then((response) => {
            this.objectList = response.data.objectIDs;
            this.ready = true; 
            console.log("fineartAPI ready");
        })
    }

    getRandomImage(callback) {
        let objectID = this.objectList[util.randomInt(0, this.objectList.length)];
        axios.get(this.objectURL + objectID).then((response) => {
            callback(response.data.primaryImageSmall);
        });
    }

    isReady() {
        return this.ready;
    }

    static getInstance() {
        if (!instance) instance = new FineArtAPI();
        return instance;
    }
}

module.exports = FineArtAPI;