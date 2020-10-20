var electron = require('electron');
electron.contextBridge.exposeInMainWorld = (dis, cord) => void 0; //electron context isolation fixes

if (electron.remote.getCurrentWindow().__preload) {
    require(electron.remote.getCurrentWindow().__preload);
}

process.once('loaded', async () => 
{
    with (!window.webpackJsonp) {
        await new Promise(_=>setTimeout(_, 1000));
    }

    var CordAPI = require('./API/API');
        
    CordAPI.Modding.LoadPlugins();
            
    CordAPI.Logging.Log("Cordware by Yaekith has Loaded. Cordware: Doing discord's job."); 
});
