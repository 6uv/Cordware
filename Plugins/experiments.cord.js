var Plugin = require('./plugin');
var CordAPI = require('../API/API');

module.exports = new Plugin({
    Name: "Experiments",
    Author: "Yaekith",
    Description: "Allows you to see the experiments tab in user settings, aka forcing you as a developer locally.",
    Version: 1.0,
    OriginURL: "",
    OnInjection: new function() {
        console.log(CordAPI.Modding.FilterWebpackModule("isDeveloper"));
    }
})