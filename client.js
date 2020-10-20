function webpackCheck(callback) {
    var Checker = setInterval(async () => {
        if (!window.webpackJsonp || !window.webpackJsonp.push || typeof window.webpackJsonp.push !== 'function') {
            return;
        }

        clearInterval(Checker);
        return callback(true);
    }, 1000);
}

webpackCheck(() => {
    var CordAPI = require('./API/API');
    
    CordAPI.Modding.LoadPlugins();
        
    CordAPI.Logging.Log("Cordware by Yaekith has Loaded. Cordware: Doing discord's job."); 
})